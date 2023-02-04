<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { getFileInfo, getFileItemByKey } from '~/api/modules/file'
import { isAudio, isImage, isMarkdown, isPDF, isText, isVideo } from '~/utils/FileUtil'

const { text, copy, copied } = useClipboard()
const { isMobile } = useDevice()
const { t } = useI18n()
const user = useUserStore()
const router = useRouter()
const storageKey = ref()
const dataList = ref()
const fileInfo = ref()
const loading = ref<boolean>(true)
// 面包屑路由
const routes = ref<Array<any>>([
  {
    path: '/',
    label: 'Home',
  },
])

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
const handleFile = (key: string | any, uri: string | any) => {
  loading.value = true
  getFileInfo(key, uri).then((res) => {
    if (res.code === 200) {
      dataList.value = null
      fileInfo.value = res.data
    }
    loading.value = false
  }).catch((err) => {
    console.log(err)
    loading.value = false
  })
}

/** 处理文件夹路由 */
const handleRouter = () => {
  const key = router.currentRoute.value.params.storageKey
  storageKey.value = key
  const path = router.currentRoute.value.path.toString()
  const uri = path.slice(`/${storageKey.value}`.length, path.length)
  if (uri) {
    handleItemByKey(key, uri)
  } else {
    handleItemByKey(key, '/')
  }
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
      let currentPath = '/od'
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
  const key = storageKey.value
  if (path !== '/' && !path.startsWith('/@')) {
    const params = path.slice(((path.lastIndexOf('/') - 1) >>> 0) + 2)
    if (params && params.includes('.')) {
      // 包含 . 的可能是文件
      handleRouterChange(key, path)
      handleFile(storageKey.value, path.slice(`/${key}`.length, path.length))
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
  try {
    const fullPath = router.currentRoute.value.path
    const uri = fullPath.slice(`/${key}`.length, fullPath.length)
    if (path.length > 0 && path[path.length - 1].includes('.')) {
      // 包含 . 的可能是文件
      handleRouterChange(key, path)
      handleFile(key, uri)
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
        <a-card :bordered="false" :style="{ width: '100%' }">
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
            style="margin-top: 8px"
            @row-click="(record) => { record.type !== 'file' ? handleFolder(record.name) : clickFile(record.name) }"
          >
            <template #columns>
              <a-table-column :title="t('table.index.fileName')" ellipsis>
                <template #cell="{ record }">
                  <icon-folder v-if="record.type !== 'file'" /> {{ record.name }}
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
            style="margin-top: 10px"
            @row-click="(record) => { record.type !== 'file' ? handleFolder(record.name) : clickFile(record.name) }"
          >
            <template #columns>
              <a-table-column :title="t('table.index.fileName')">
                <template #cell="{ record }">
                  <icon-folder v-if="record.type !== 'file'" /> {{ record.name }}
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
                    <a-button v-if="record.type === 'file'" type="outline" size="small">
                      <template #icon>
                        <a className="cursor-pointer rounded px-1.5 py-1 hover:bg-gray-300 dark:hover:bg-gray-600" :href="record.url">
                          <icon-download />
                        </a>
                      </template>
                    </a-button>
                    <a-button v-if="record.type === 'file'" type="outline" size="small">
                      <template #icon>
                        <icon-share-alt @click="handleShare(record.url)" />
                      </template>
                    </a-button>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
          <!-- 文件预览 -->
          <!-- 视频预览 -->
          <VideoPreview v-else-if="!loading && fileInfo && isVideo(fileInfo.name)" :value="fileInfo" />
          <ImagePreview v-else-if="!loading && fileInfo && isImage(fileInfo.name)" :value="fileInfo" />
          <AudioPreview v-else-if="!loading && fileInfo && isAudio(fileInfo.name)" :value="fileInfo" />
          <MarkdownPreview v-else-if="!loading && fileInfo && isMarkdown(fileInfo.name)" :value="fileInfo" />
          <TextPreview v-else-if="!loading && fileInfo && isText(fileInfo.name)" :value="fileInfo" />
          <PDFPreview v-else-if="!loading && fileInfo && isPDF(fileInfo.name)" :value="fileInfo" />
          <OtherPreview v-else-if="!loading && fileInfo" :value="fileInfo" />
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
