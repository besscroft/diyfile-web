<script setup lang="ts">
import type { DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownRenderOption } from 'naive-ui'
import { deleteFile, getFileInfo, getFileItemByKey, getUploadUrl } from '~/api/modules/file'
import { getEnableStorage, storageInfoByStorageKey } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'
import type { Storage } from '~/types/storage'
import { getFileName, isAudio, isImage, isMarkdown, isPDF, isText, isVideo } from '~/utils/FileUtil'
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
const handleTableOption = (info: Storage, storages: any) => {
  tableOptions.value = []
  tableOptions.value.push({
    label: '上传',
    key: 'upload',
  })
  tableOptions.value.push({
    type: 'divider',
    key: 'd1',
  })
  for (const resKey in storages) {
    tableOptions.value.push({
      label: storages[resKey].name,
      key: storages[resKey].storageKey,
    })
  }
}

/** 获取所有可用存储并处理 */
const handleEnableStorage = (info: Storage) => {
  getEnableStorage().then((res) => {
    if (res.code === ResultEnum.SUCCESS && Array.isArray(res.data)) {
      // 下拉菜单内容
      handleTableOption(info, res.data)
      storageList.value = res.data
    }
  })
}

/** 自定义上传请求 */
const onRequestUpload = (option: any) => {
  const fileItem = option.file
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

/** 路由监听处理 */
watch(() => {
  return router.currentRoute.value.path
}, (path) => {
  const key = router.currentRoute.value.params.storageKey
  if (path !== '/' && !path.startsWith('/@')) {
    const params = path.slice(((path.lastIndexOf('/') - 1) >>> 0) + 2)
    if (params && params.includes('.')) {
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
  handleEnableStorage(getStorageInfo(key.toString()))
  try {
    const fullPath = router.currentRoute.value.path
    const uri = fullPath.slice(`/${key}`.length, fullPath.length)
    if (path.length > 0 && path[path.length - 1].includes('.')) {
      const fileName = fullPath.substring(fullPath.lastIndexOf('/') + 1)
      // 包含 . 的可能是文件
      handleRouterChange(key, path)
      handleFile(key, uri, fileName)
    } else {
      // 不包含 . 的可能是文件夹
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
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
        <path d="M17 11h3a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v1H9.01V5a2 2 0 0 0-2-2H4c-1.1 0-2 .9-2 2v4a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V8h2v7.01c0 1.65 1.34 2.99 2.99 2.99H15v1a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v1h-1.01c-.54 0-.99-.45-.99-.99V8h2v1c0 1.1.9 2 2 2z" fill="currentColor"></path>
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
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z" fill="currentColor"></path>
        </svg>
      </n-icon>
    </n-dropdown>
  </div>
  <el-upload
    v-if="!loading && uploadView"
    drag
    :http-request="(option) => onRequestUpload(option)"
    multiple
    :style="isMobile ? { 'width': '100%', 'overflow-x': 'hidden !important' } : { 'width': '66%', 'overflow-x': 'hidden !important' }"
    class="mx-auto"
  >
    <v-icon icon="cloud_upload" size="x-large" />
    <div class="el-upload__text">
      请选择文件上传，或拖拽文件到此处！
    </div>
  </el-upload>
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
    <VideoPreview v-if="!loading && fileInfo && isVideo(fileInfo.name)" class="m-4" :fileInfo="fileInfo" :storageInfo="storageInfo" />
    <AudioPreview v-else-if="!loading && fileInfo && isAudio(fileInfo.name)" class="m-4" :fileInfo="fileInfo" :storageInfo="storageInfo" />
    <ImagePreview v-else-if="!loading && fileInfo && isImage(fileInfo.name)" class="m-4" :fileInfo="fileInfo" :storageInfo="storageInfo" />
    <MarkdownPreview v-else-if="!loading && fileInfo && isMarkdown(fileInfo.name)" class="m-4" :fileInfo="fileInfo" :storageInfo="storageInfo" />
    <TextPreview v-else-if="!loading && fileInfo && isText(fileInfo.name)" class="m-4" :fileInfo="fileInfo" :storageInfo="storageInfo" />
    <PDFPreview v-else-if="!loading && fileInfo && isPDF(fileInfo.name)" class="m-4" :fileInfo="fileInfo" :storageInfo="storageInfo" />
    <OtherPreview v-else-if="!loading && fileInfo" :fileInfo="fileInfo" class="m-4" :storageInfo="storageInfo" />
    <p v-else-if="!fileInfo && !dataList">什么都没有呢！请登录后进入后台进行配置！</p>
    <p v-else>Oops！发生了意外情况，也许是网络不稳定、格式不支持或者出现了 Bug~</p>
  </v-card>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
