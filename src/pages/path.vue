<script setup lang="ts">
import type { DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownRenderOption } from 'naive-ui'
import { deleteFile, getFileInfo, getFileItemByKey, getUploadUrl } from '~/api/modules/file'
import { getEnableStorage, storageInfoByStorageKey } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'
import type { Storage } from '~/types/storage'
import {
  getFileName,
  isAudio,
  isFile,
  isFileByRawExtension,
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
    dataList.value = null
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

/** 获取存储信息 */
const getStorageInfo = (key: string): any => {
  if (!storageInfo.value || storageInfo.value?.storageKey !== key) {
    storageInfoByStorageKey(key).then((res) => {
      storageInfo.value = res.data
      return res.data
    })
  }
  return undefined
}

/** 下拉菜单数组处理 */
const handleTableOption = (info: Storage, storages: any, path: string) => {
  tableOptions.value = []
  if (path !== '/' && !path.startsWith('/@')) {
    const params = path.slice(((path.lastIndexOf('/') - 1) >>> 0) + 2)
    if (params && params.includes('.') && isFile(params)) {
      console.log('文件')
    } else {
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
const handleEnableStorage = (info: Storage, path: string) => {
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

/** 文件点击事件 */
const clickFile = (name: string) => {
  const path = router.currentRoute.value.path.toString()
  router.push(`${path}/${encodeURIComponent(name)}`)
}

/** 处理文件路由 */
const handleFile = (key: string | any, uri: string | any, fileName: string) => {
  loading.value = true
  getFileInfo(key, uri, fileName).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      dataList.value = null
      fileInfo.value = res.data
    }
    loading.value = false
  }).catch((err) => {
    console.log(err)
    dataList.value = null
    loading.value = false
  })
}

/** 处理文件夹路由 */
const handleRouter = () => {
  const key = router.currentRoute.value.params.storageKey
  getStorageInfo(key.toString())
  storageKey.value = key
  const path = router.currentRoute.value.path.toString()
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
      handleRouter()
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

watch(() => {
  return router.currentRoute.value.path
}, (path) => {
  handleTableOption(storageInfo.value, storageList.value, path)
})

/** 路由监听处理 */
watch(() => {
  return router.currentRoute.value.path
}, async (path) => {
  const key = router.currentRoute.value.params.storageKey
  if (path !== '/' && !path.startsWith('/@')) {
    const params = path.slice(((path.lastIndexOf('/') - 1) >>> 0) + 2)
    if (params && params.includes('.') && isFile(params)) {
      // 包含 . 的可能是文件
      handleRouterChange(key, path)
      handleFile(key, path.slice(`/${key}`.length, path.length), getFileName(path))
    } else {
      // 不包含 . 的可能是文件夹
      handleRouterChange(key, path)
      handleRouter()
    }
  }
})

/** 第一次进来 */
onMounted(() => {
  const path = router.currentRoute.value.params.path
  const key = router.currentRoute.value.params.storageKey
  const fullPath = router.currentRoute.value.path
  handleEnableStorage(getStorageInfo(key.toString()), fullPath)
  try {
    const uri = fullPath.slice(`/${key}`.length, fullPath.length)
    const params = uri.slice(((uri.lastIndexOf('.') - 1) >>> 0) + 2)
    if (params.length > 0 && uri.includes('.') && isFileByRawExtension(params)) {
      const fileName = fullPath.substring(fullPath.lastIndexOf('/') + 1)
      // 可能是文件
      handleRouterChange(key, path)
      handleFile(key, uri, fileName)
    } else {
      // 可能是文件夹
      handleRouterChange(key, path)
      handleRouter()
    }
  } catch (e) {
    handleRouterChange(key, path)
    handleRouter()
  }
})
</script>

<template>
  <div class="flex justify-center items-center mx-auto" :style="isMobile ? { width: '100%', height: '22px' } : { width: '66%', height: '22px' }">
    <n-icon size="16">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
        <path d="M24 10l-1.414 1.414L26.172 15H11.899A5.014 5.014 0 0 0 8 11.101V2H6v9.101A5 5 0 0 0 6 20.9V30h2v-9.101A5.014 5.014 0 0 0 11.899 17h14.273l-3.586 3.586L24 22l6-6zM7 19a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z" fill="currentColor"></path>
      </svg>
    </n-icon>
    <n-scrollbar
      x-scrollable
      style="height: 28px"
    >
      <n-breadcrumb>
        <n-breadcrumb-item v-for="item in routes" :key="item" :href="item.href">
          {{ item.title }}
        </n-breadcrumb-item>
      </n-breadcrumb>
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
    class="mx-auto"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon />
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
  <div v-if="loading" class="flex justify-center mt-7">
    <n-spin size="medium" />
  </div>
  <FileDataTable
    v-else-if="!loading && !fileInfo && dataList"
    :value="dataList"
    :style="isMobile ? { width: '100%' } : { width: '66%' }"
    class="mx-auto"
    @handleFolder="handleFolder"
    @clickFile="clickFile"
    @handleDelete="handleDelete"
    @handleShare="handleShare"
  />
  <v-card v-else class="mx-auto" :style="isMobile ? { width: '100%' } : { width: '66%' }">
    <!-- 文件预览 -->
    <VideoPreview v-if="!loading && fileInfo && isVideo(fileInfo.name)" class="m-4" :file-info="fileInfo" :storage-info="storageInfo" />
    <AudioPreview v-else-if="!loading && fileInfo && isAudio(fileInfo.name)" class="m-4" :file-info="fileInfo" :storage-info="storageInfo" />
    <ImagePreview v-else-if="!loading && fileInfo && isImage(fileInfo.name)" class="m-4" :file-info="fileInfo" :storage-info="storageInfo" />
    <MarkdownPreview v-else-if="!loading && fileInfo && isMarkdown(fileInfo.name)" class="m-4" :file-info="fileInfo" :storage-info="storageInfo" />
    <TextPreview v-else-if="!loading && fileInfo && isText(fileInfo.name)" class="m-4" :file-info="fileInfo" :storage-info="storageInfo" />
    <PDFPreview v-else-if="!loading && fileInfo && isPDF(fileInfo.name)" class="m-4" :file-info="fileInfo" :storage-info="storageInfo" />
    <OtherPreview v-else-if="!loading && fileInfo" :file-info="fileInfo" class="m-4" :storage-info="storageInfo" />
    <n-result v-else-if="!fileInfo && !dataList" status="404" title="什么都没有呢！请登录后进入后台进行配置！" description="生活总归带点荒谬" />
    <n-result v-else status="500" title="Oops！发生了意外情况，也许是网络不稳定、格式不支持或者出现了 Bug~" description="生活总归带点荒谬" />
  </v-card>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
