<script setup lang="ts">
import type { DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownRenderOption } from 'naive-ui'
import { deleteFile, getFileInfo, getFileItemByKey, getUploadUrl } from '~/api/modules/file'
import { getEnableStorage, storageInfoByStorageKey } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'
import type { Storage } from '~/types/storage'
import {
  isAudio,
  isImage,
  isMarkdown,
  isPDF,
  isText,
  isVideo,
} from '~/utils/FileUtil'
import { uploadOneDrive } from '~/utils/uploadFileUtil'
import FileDataTable from '~/components/FileDataTable.vue'

const { text, copy, copied } = useClipboard()
const { isMobile } = useDevice()
const { t } = useI18n()
const showDropdownRef = ref(false)
const message = useMessage()
const router = useRouter()
const storageKey = ref()
const dataList = ref()
const fileInfo = ref()
const loading = ref<boolean>(true)
const uploadView = ref<boolean>(false)
const storageList = ref()
const storageInfo = ref<Storage>()
const showModal = ref<boolean>(false)
// 面包屑路由
const routes = ref<Array<any>>([
  {
    href: '/',
    title: 'Home',
  },
])

const tableOptions = ref<Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>>([])

/** 选择框发生变化 */
const handleSelectChange = (value: string) => {
  if (value !== storageKey.value) {
    storageKey.value = value
    fileInfo.value = null
    dataList.value = []
    uploadView.value = false
    router.push(`/${value}`)
  }
}

/** 下拉菜单处理 */
const handleTableSelect = (key: string) => {
  showDropdownRef.value = false
  if (key === 'upload') {
    uploadView.value = true
    return
  }
  handleSelectChange(key)
}

/** 下拉菜单数组处理 */
const handleTableOption = (info: Storage, storages: any, path: string) => {
  tableOptions.value = []
  if (path !== '/' && !path.startsWith('/@')) {
    if (info.type === 1) {
      tableOptions.value.push({
        label: '上传',
        key: 'upload',
      })
      tableOptions.value.push({
        type: 'divider',
        key: 'd1',
      })
    }
    for (const resKey in storages) {
      tableOptions.value.push({
        label: storages[resKey].name,
        key: storages[resKey].storageKey,
      })
    }
  }
}

/** 获取所有可用存储并处理 */
const handleEnableStorage = (info: Storage | any, path: string) => {
  getEnableStorage().then((res) => {
    if (res.code === ResultEnum.SUCCESS && Array.isArray(res.data)) {
      // 下拉菜单内容
      handleTableOption(info, res.data, path)
      storageList.value = res.data
    }
  })
}

/** 自定义上传请求 */
const onRequestUpload = (option: any) => {
  const { file } = option
  const fileItem = file.file
  const fullPath = router.currentRoute.value.fullPath
  let uri = ''
  if (`/${storageKey.value}` !== fullPath) {
    uri = `${fullPath.slice(`/${storageKey.value}`.length, fullPath.length)}/${encodeURIComponent(fileItem.name)}`
  } else {
    uri = `/${encodeURIComponent(fileItem.name)}`
  }
  getUploadUrl(storageKey.value, uri).then((res) => {
    if (res.code === ResultEnum.SUCCESS && typeof res.data == 'string') {
      uploadOneDrive(fileItem, res.data, option)
    }
  })
}

/** 获取文件列表 */
const handleItemByKey = (storageKey: string | any, folderPath: string | any) => {
  loading.value = true
  getFileItemByKey(storageKey, folderPath).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      fileInfo.value = null
      dataList.value = res.data
    }
    loading.value = false
  }).catch((err) => {
    console.log(err)
    loading.value = false
  })
}

/** 文件夹点击事件 */
const handleFolder = (path: string) => {
  const currentPath = router.currentRoute.value.path
  const uri = `${currentPath}/${encodeURIComponent(path)}`
  router.push({ path: uri })
}

/** 文件分享事件 */
const handleShare = (url: string) => {
  copy(url)
  if (copied) {
    message.success(t('button.copyOk'))
  }
}

/** 处理文件路由 */
const handleFile = (key: string | any, uri: string | any, fileName: string) => {
  loading.value = true
  getFileInfo(key, uri, fileName).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      loading.value = false
      fileInfo.value = res.data
    }
  }).catch((err) => {
    loading.value = false
    console.log(err)
  })
}

/** 文件点击事件 */
const clickFile = (name: string) => {
  const path = router.currentRoute.value.path.toString()
  const uri = `${path.slice(`/${storageKey.value}`.length, path.length)}/${name}`
  handleFile(storageKey.value, uri, decodeURIComponent(name))
  showModal.value = true
}

/** 处理文件夹路由 */
const handleRouter = (path: string) => {
  const key = router.currentRoute.value.params.storageKey
  storageKey.value = key
  const uri = path.slice(`/${storageKey.value}`.length, path.length)
  if (uri) {
    handleItemByKey(key, uri)
  } else {
    handleItemByKey(key, '/')
  }
}

/** 删除文件 */
const handleDelete = (option: any) => {
  let url
  if (option.path === '/') {
    // 如果 path 为 / 则不需要拼接多余的 /
    url = `/${encodeURIComponent(option.name)}`
  } else {
    url = `${option.path}/${encodeURIComponent(option.name)}`
  }
  deleteFile(storageKey.value, url).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
      handleRouter(router.currentRoute.value.path.toString())
    }
  })
}

/** 路由变化 */
const handleRouterChange = (key: any, uri: any) => {
  if (uri) {
    routes.value = []
    routes.value.push({
      href: `/${key}`,
      title: 'Home',
    })
    const item = router.currentRoute.value.params.path.length
    for (let i = 0; i < item; i++) {
      let currentPath = `/${key}`
      for (let j = 0; j < i + 1; j++) {
        currentPath += `/${router.currentRoute.value.params.path[j]}`
      }
      routes.value.push({
        href: decodeURIComponent(currentPath),
        title: decodeURIComponent(router.currentRoute.value.params.path[i]),
      })
    }
  } else {
    routes.value = []
    routes.value.push({
      href: `/${key}`,
      title: 'Home',
    })
  }
}

/** 路由监听处理 */
watch(() => {
  return router.currentRoute.value.path
}, async (path) => {
  const key = router.currentRoute.value.params.storageKey
  if (path !== '/' && !path.startsWith('/@')) {
    handleRouterChange(key, path)
    handleRouter(path)
    if (storageInfo.value) {
      handleTableOption(storageInfo.value, storageList.value, path)
    } else {
      const { data } = await storageInfoByStorageKey(key.toString())
      storageInfo.value = data
      handleTableOption(data, storageList.value, path)
    }
  }
})

/** 第一次进来 */
onMounted(async () => {
  const path = router.currentRoute.value.params.path
  const key = router.currentRoute.value.params.storageKey
  const fullPath = router.currentRoute.value.path
  const { data } = await storageInfoByStorageKey(key.toString())
  storageInfo.value = data
  handleEnableStorage(data, fullPath)
  try {
    // 文件夹路由
    handleRouterChange(key, path)
    handleRouter(fullPath.toString())
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div flex justify-center items-center mxa :style="isMobile ? { width: '100%', height: '22px' } : { width: '66%', height: '22px' }">
    <n-scrollbar
      x-scrollable
      style="height: 28px"
    >
      <Breadcrumb :routes="routes" @handleRouterChange="handleRouterChange" @handleRouter="handleRouter" />
    </n-scrollbar>
    <n-dropdown :options="tableOptions || undefined" @select="handleTableSelect">
      <n-icon size="16" class="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z" fill="currentColor" />
        </svg>
      </n-icon>
    </n-dropdown>
  </div>
  <n-upload
    v-if="!loading && uploadView"
    multiple
    directory-dnd
    :custom-request="onRequestUpload"
    :on-finish="({ file }) => { message.success(`上传 ${file.name} 成功！`) }"
    :on-error="({ file }) => { message.error(`上传 ${file.name} 失败！`) }"
    :max="5"
    :style="isMobile ? { width: '100%' } : { width: '66%' }"
    mxa
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M11 18l1.41 1.41L15 16.83V29h2V16.83l2.59 2.58L21 18l-5-5l-5 5z" fill="currentColor"></path><path d="M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22z" fill="currentColor"></path></svg>
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        点击或者拖动文件到该区域来上传
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
      </n-p>
    </n-upload-dragger>
  </n-upload>
  <div v-if="loading" flex justify-center mt-7>
    <n-spin size="medium" />
  </div>
  <FileDataTable
    v-else
    :value="dataList"
    :style="isMobile ? { width: '100%' } : { width: '66%' }"
    mxa
    @handleFolder="handleFolder"
    @clickFile="clickFile"
    @handleDelete="handleDelete"
    @handleShare="handleShare"
  />
  <n-modal
    v-if="!loading"
    :style="isMobile ? { width: '100%' } : { width: '72%' }"
    class="h-4/5 max-h-full"
    bg-white
    title="预览"
    preset="dialog"
    :mask-closable="false"
    v-model:show="showModal"
    transform-origin="center"
    of-y-auto
  >
    <!-- 文件预览 -->
    <div >
      <VideoPreview v-if="fileInfo && isVideo(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
      <AudioPreview v-else-if="fileInfo && isAudio(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
      <ImagePreview v-else-if="fileInfo && isImage(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
      <MarkdownPreview v-else-if="fileInfo && isMarkdown(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
      <TextPreview v-else-if="fileInfo && isText(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
      <PDFPreview v-else-if="fileInfo && isPDF(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
      <OtherPreview v-else :fileInfo="fileInfo" :storageInfo="storageInfo" />
    </div>
  </n-modal>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
