<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { deleteFile, getFileInfo, getFileItemByKey, getUploadUrl } from '~/api/modules/file'
import { getEnableStorage, storageInfoByStorageKey } from '~/api/modules/storage'
import type { Storage } from '~/types/storage'
import { download } from '~/utils/ButtonUtil'
import { getFileName, isAudio, isImage, isMarkdown, isPDF, isText, isVideo } from '~/utils/FileUtil'
import { uploadOneDrive } from '~/utils/uploadFileUtil'

const { text, copy, copied } = useClipboard()
const { isMobile } = useDevice()
const { t } = useI18n()
const user = useUserStore()
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
    path: '/',
    label: 'Home',
  },
])

/** 获取存储信息 */
const getStorageInfo = (key: string) => {
  if (!storageInfo.value || storageInfo.value?.storageKey !== key) {
    storageInfoByStorageKey(key).then((res) => {
      if (res.code === 200) {
        storageInfo.value = res.data
      }
    })
  }
}

/** 获取所有可用存储并处理 */
const handleEnableStorage = () => {
  getEnableStorage().then((res) => {
    if (res.code === 200) {
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
    if (res.code === 200 && typeof res.data == 'string') {
      uploadOneDrive(fileItem.file, res.data, option)
    }
  })
}

/** 获取文件列表 */
const handleItemByKey = (storageKey: string | any, folderPath: string | any) => {
  loading.value = true
  getFileItemByKey(storageKey, folderPath).then((res) => {
    if (res.code === 200) {
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
    Message.info(t('button.copyOk'))
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
    if (res.code === 200) {
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
    if (res.code === 200) {
      Message.success(res.message)
      handleRouter()
    }
  })
}

/** 路由变化 */
const handleRouterChange = (key: any, uri: any) => {
  if (uri) {
    routes.value = []
    routes.value.push({
      path: `/${key}`,
      label: 'Home',
    })
    const item = router.currentRoute.value.params.path.length
    for (let i = 0; i < item; i++) {
      let currentPath = `/${key}`
      for (let j = 0; j < i + 1; j++) {
        currentPath += `/${router.currentRoute.value.params.path[j]}`
      }
      routes.value.push({
        path: decodeURIComponent(currentPath),
        label: decodeURIComponent(router.currentRoute.value.params.path[i]),
      })
    }
  } else {
    routes.value = []
    routes.value.push({
      path: `/${key}`,
      label: 'Home',
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
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '12px',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-col :xs="1" :sm="2" :md="2" :lg="3" :xl="4" :xxl="4" />
      <a-col :xs="22" :sm="20" :md="20" :lg="18" :xl="16" :xxl="16">
        <nav className="mb-4 flex items-center justify-between pl-1">
          <a-tag id="breadcrumb-scrollbar" color="gray" :style="{ 'overflow-x': 'auto', 'width': '100%', 'scrollbar-width': 'none', '-ms-overflow-style': 'none' }">
            <template #icon>
              <icon-branch />
            </template>
            <a-breadcrumb :routes="routes" :max-count="3" class="no-scrollbar inline-flex items-center gap-1 overflow-x-scroll text-sm text-gray-600 dark:text-gray-300 md:gap-3">
              <template #item-render="{ route }">
                <a-link @click="router.push(route.path)">
                  {{ route.label }}
                </a-link>
              </template>
            </a-breadcrumb>
          </a-tag>
          <a-dropdown>
            <icon-down class="cursor-pointer mx-0.5" />
            <template #content>
              <a-dgroup v-if="!loading && storageInfo.type === 1" title="操作">
                <a-doption @click="uploadView = true">
                  <template #icon>
                    <icon-upload />
                  </template>
                  <template #default>
                    上传
                  </template>
                </a-doption>
              </a-dgroup>
              <a-dgroup v-if="!loading && storageList" title="驱动列表">
                <a-doption v-for="item in storageList" :key="item.name" @click="handleSelectChange(item.name, item.storageKey)">
                  <template #icon>
                    <icon-check v-if="storageKey === item.storageKey" />
                    <icon-cloud v-else />
                  </template>
                  {{ item.name }}
                </a-doption>
              </a-dgroup>
            </template>
          </a-dropdown>
        </nav>
        <a-card :bordered="false" :style="{ width: '100%' }">
          <a-upload
            v-if="!loading && uploadView"
            :auto-upload="false"
            :show-remove-button="false"
            :show-cancel-button="false"
            :show-retry-button="true"
            :show-preview-button="true"
            :show-link="true"
            :custom-request="(option) => onRequestUpload(option)"
            draggable
            @success="() => { Message.success('上传成功！') }"
          />
          <a-spin v-if="loading" :size="32" class="flex justify-center">
            <template #icon>
              <icon-sync />
            </template>
          </a-spin>
          <!-- 移动端列表 -->
          <a-table
            v-else-if="isMobile && !loading && !fileInfo && dataList"
            :data="dataList"
            :scrollbar="false"
            :pagination="false"
            :bordered="false"
          >
            <template #columns>
              <a-table-column :title="t('table.index.fileName')" ellipsis>
                <template #cell="{ record }">
                  <icon-folder v-if="record.type !== 'file'" />
                  <icon-file-image v-else-if="isImage(record.name)" />
                  <icon-file-video v-else-if="isVideo(record.name)" />
                  <icon-file-audio v-else-if="isAudio(record.name)" />
                  <icon-file-pdf v-else-if="isPDF(record.name)" />
                  <icon-file v-else />
                  <span class="cursor-pointer" @click="() => { record.type !== 'file' ? handleFolder(record.name) : clickFile(record.name) }">{{ record.name }}</span>
                </template>
              </a-table-column>
            </template>
          </a-table>
          <!-- PC 端列表 -->
          <a-table
            v-else-if="!isMobile && !loading && !fileInfo && dataList"
            :data="dataList"
            :scrollbar="false"
            :pagination="false"
            :bordered="false"
          >
            <template #columns>
              <a-table-column :title="t('table.index.fileName')">
                <template #cell="{ record }">
                  <icon-folder v-if="record.type !== 'file'" />
                  <icon-file-image v-else-if="isImage(record.name)" />
                  <icon-file-video v-else-if="isVideo(record.name)" />
                  <icon-file-audio v-else-if="isAudio(record.name)" />
                  <icon-file-pdf v-else-if="isPDF(record.name)" />
                  <icon-file v-else />
                  <span class="cursor-pointer" @click="() => { record.type !== 'file' ? handleFolder(record.name) : clickFile(record.name) }">{{ record.name }}</span>
                </template>
              </a-table-column>
              <a-table-column :title="t('table.index.time')" data-index="lastModifiedDateTime" />
              <a-table-column :title="t('table.index.fileSize')">
                <template #cell="{ record }">
                  {{ (record.size / 1000 / 1000).toFixed(2) }} MB
                </template>
              </a-table-column>
              <a-table-column :title="t('table.Optional')" fixed="right">
                <template #cell="{ record }">
                  <a-space :size="4">
                    <icon-download v-if="record.type === 'file'" class="cursor-pointer" @click="download(record.url)" />
                    <icon-copy v-if="record.type === 'file'" class="cursor-pointer" @click="handleShare(record.url)" />
                    <a-popconfirm content="确定要删除吗?" type="warning" :onOk="() => handleDelete(record)">
                      <icon-delete v-if="record.type === 'file'" class="cursor-pointer" />
                    </a-popconfirm>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
          <!-- 文件预览 -->
          <!-- 视频预览 -->
          <VideoPreview v-else-if="!loading && fileInfo && isVideo(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
          <ImagePreview v-else-if="!loading && fileInfo && isImage(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
          <AudioPreview v-else-if="!loading && fileInfo && isAudio(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
          <MarkdownPreview v-else-if="!loading && fileInfo && isMarkdown(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
          <TextPreview v-else-if="!loading && fileInfo && isText(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
          <PDFPreview v-else-if="!loading && fileInfo && isPDF(fileInfo.name)" :fileInfo="fileInfo" :storageInfo="storageInfo" />
          <OtherPreview v-else-if="!loading && fileInfo" :fileInfo="fileInfo" :storageInfo="storageInfo" />
          <a-empty v-else-if="!fileInfo && !dataList">
            什么都没有呢！请登录后进入后台进行配置！
          </a-empty>
          <a-alert v-else>
            Oops！发生了意外情况，也许是网络不稳定、格式不支持或者出现了 Bug~
          </a-alert>
        </a-card>
      </a-col>
      <a-col :xs="1" :sm="2" :md="2" :lg="3" :xl="4" :xxl="4" />
    </a-row>
  </div>
</template>

<style scoped>
#breadcrumb-scrollbar ::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
