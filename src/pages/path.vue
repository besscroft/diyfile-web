<script setup lang="ts">
import { ArrowDown, Check, MostlyCloudy } from '@element-plus/icons-vue'
import { deleteFile, getFileInfo, getFileItemByKey, getUploadUrl } from '~/api/modules/file'
import { getEnableStorage, storageInfoByStorageKey } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'
import type { Storage } from '~/types/storage'
import { download } from '~/utils/ButtonUtil'
import { getFileName, isAudio, isImage, isMarkdown, isPDF, isText, isVideo } from '~/utils/FileUtil'
import { uploadOneDrive } from '~/utils/uploadFileUtil'

const { text, copy, copied } = useClipboard()
const { isMobile } = useDevice()
const { t } = useI18n()
const user = useUserStore()
const snackbar = useSnackbarStore()
const router = useRouter()
const storageKey = ref()
const dataList = ref()
const fileInfo = ref()
const loading = ref<boolean>(true)
const uploadView = ref<boolean>(false)
const storageList = ref()
const storageName = ref<string>()
const storageInfo = ref<Storage>()
// 面包屑路由
const routes = ref<Array<any>>([
  {
    href: '/',
    title: 'Home',
  },
])

/** 获取存储信息 */
const getStorageInfo = (key: string) => {
  if (!storageInfo.value || storageInfo.value?.storageKey !== key) {
    storageInfoByStorageKey(key).then((res) => {
      if (res.code === ResultEnum.SUCCESS) {
        storageInfo.value = res.data
      }
    })
  }
}

/** 获取所有可用存储并处理 */
const handleEnableStorage = () => {
  getEnableStorage().then((res) => {
    if (res.code === ResultEnum.SUCCESS && Array.isArray(res.data)) {
      for (const resKey in res.data) {
        if (res.data[resKey].storageKey === storageKey.value) {
          storageName.value = res.data[resKey].name
        }
      }
      storageList.value = res.data
    }
  })
}

/** 选择框发生变化 */
const handleSelectChange = (name: string, value: string) => {
  if (value !== storageKey.value) {
    storageKey.value = value
    fileInfo.value = null
    dataList.value = null
    uploadView.value = false
    storageName.value = name
    router.push(`/${value}`)
  }
}

/** 自定义上传请求 */
const onRequestUpload = (option: any) => {
  const { fileItem } = option
  const fullPath = router.currentRoute.value.fullPath
  let uri = ''
  if (`/${storageKey.value}` !== fullPath) {
    uri = `${fullPath.slice(`/${storageKey.value}`.length, fullPath.length)}/${encodeURIComponent(fileItem.name)}`
  } else {
    uri = `/${encodeURIComponent(fileItem.name)}`
  }
  getUploadUrl(storageKey.value, uri).then((res) => {
    if (res.code === ResultEnum.SUCCESS && typeof res.data == 'string') {
      uploadOneDrive(fileItem.file, res.data, option)
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
    snackbar.setType('blue')
    snackbar.setText(t('button.copyOk'))
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
      snackbar.setType('blue')
      snackbar.setText(res.message)
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
  getStorageInfo(key.toString())
  handleEnableStorage()
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
  <nav
    :style="isMobile ? { 'width': '100%', 'overflow-x': 'hidden !important' } : { 'width': '66%', 'overflow-x': 'hidden !important' }"
    className="flex flex-row items-center mx-auto justify-between -mt-3"
  >
    <div class="flex no-scrollbar inline-flex items-center overflow-x-scroll">
      <v-icon start icon="share" />
      <v-chip
        variant="text"
        label
        :style="isDark ? { 'overflow-x': 'auto', 'scrollbar-width': 'none', '-ms-overflow-style': 'none', 'background': '#16161A !important' } : { 'overflow-x': 'auto', 'scrollbar-width': 'none', '-ms-overflow-style': 'none', 'background': '#FFFFFF !important' }"
        class="-ml-1"
      >
        <v-breadcrumbs
          class="mx-auto text-sm"
          :items="routes"
          density="compact"
        />
      </v-chip>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-icon class="mr-1 el-icon--right"><ArrowDown /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="!loading && storageInfo.type === 1">上传</el-dropdown-item>
          <el-dropdown-item
            v-for="(item, index) in storageList"
            :key="item.name"
            :icon="storageKey === item.storageKey ? Check : MostlyCloudy"
            :divided="index === 0 && !loading && storageInfo.type === 1"
            @click="handleSelectChange(item.name, item.storageKey)"
          >
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </nav>
  <el-skeleton
    v-if="loading"
    :rows="5"
    animated
    :style="isMobile ? { 'width': '100%', 'overflow-x': 'hidden !important' } : { 'width': '66%', 'overflow-x': 'hidden !important' }"
    class="mx-auto"
  />
  <el-table
    v-else-if="!loading && !fileInfo && dataList"
    v-loading="loading"
    :data="dataList"
    :style="isMobile ? { 'width': '100%', 'overflow-x': 'hidden !important' } : { 'width': '66%', 'overflow-x': 'hidden !important' }"
    height="97%"
    class="mx-auto"
    stripe
  >
    <el-table-column
      :label="t('table.index.fileName')"
    >
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <v-icon v-if="scope.row.type !== 'file'" icon="folder" />
          <v-icon v-else-if="isImage(scope.row.name)" icon="image" />
          <v-icon v-else-if="isVideo(scope.row.name)" icon="video_library" />
          <v-icon v-else-if="isAudio(scope.row.name)" icon="music_note" />
          <v-icon v-else-if="isPDF(scope.row.name)" icon="picture_as_pdf" />
          <v-icon v-else icon="description" />
          <span
            class="cursor-pointer"
            style="margin-left: 10px"
            @click="() => { scope.row.type !== 'file' ? handleFolder(scope.row.name) : clickFile(scope.row.name) }"
          >
            {{ scope.row.name }}
          </span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      v-if="!isMobile"
      prop="lastModifiedDateTime"
      :label="t('table.index.time')"
      width="160"
    />
    <el-table-column
      v-if="!isMobile"
      :label="t('table.index.fileSize')"
      width="120"
    >
      <template #default="scope">
        <span style="margin-left: 10px">{{ (scope.row.size / 1000 / 1000).toFixed(2) }} MB</span>
      </template>
    </el-table-column>
    <el-table-column
      v-if="!isMobile"
      :label="t('table.Optional')"
      align="right"
      width="100"
    >
      <template #default="scope">
        <v-icon v-if="scope.row.type === 'file'" class="cursor-pointer" icon="download" @click="download(scope.row.url)" />
        <v-icon v-if="scope.row.type === 'file'" class="cursor-pointer" icon="content_copy" @click="handleShare(scope.row.url)" />
        <el-popconfirm
          v-if="scope.row.type === 'file'"
          title="确定要删除吗？"
          :onConfirm="() => handleDelete(scope.row)"
        >
          <template #reference>
            <v-icon class="cursor-pointer" icon="delete" />
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
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
