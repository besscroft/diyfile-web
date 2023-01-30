<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { getFileInfo, getFileItemByKey } from '~/api/modules/file'

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
const handleItemByKey = (storageKey: string, folderPath: string) => {
  loading.value = true
  getFileItemByKey(storageKey, folderPath).then((res) => {
    if (res.code === 200) {
      fileInfo.value = null
      dataList.value = res.data
      loading.value = false
    }
  })
}

/** 文件夹点击事件 */
const handleFolder = (path: string) => {
  const currentPath = router.currentRoute.value.path
  const uri = `${currentPath}/${encodeURIComponent(path)}`
  router.push({ path: uri })
}

/** 文件分享事件 */
const handleShare = (name: string) => {
  Message.info('还没写！')
}

/** 文件点击事件 */
const clickFile = (name: string) => {
  const path = router.currentRoute.value.path.toString()
  router.push(`${path}/${encodeURIComponent(name)}`)
}

/** 处理文件路由 */
const handleFile = (key: string, uri: string | any) => {
  loading.value = true
  getFileInfo(key, uri).then((res) => {
    if (res.code === 200) {
      dataList.value = null
      fileInfo.value = res.data
      loading.value = false
    }
  })
}

/** 处理文件夹路由 */
const handleRouter = () => {
  const key = router.currentRoute.value.params.all[0]
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
const handleRouterChange = (uri: any) => {
  const key = router.currentRoute.value.params.all[0]
  if (uri) {
    routes.value = []
    routes.value.push({
      path: `/${key}`,
      label: 'Home',
    })
    const item = router.currentRoute.value.params.all.length - 1
    for (let i = 0; i < item; i++) {
      let currentPath = '/od'
      for (let j = 0; j < i + 1; j++) {
        currentPath += `/${router.currentRoute.value.params.all[j + 1]}`
      }
      routes.value.push({
        path: decodeURIComponent(currentPath),
        label: decodeURIComponent(router.currentRoute.value.params.all[i + 1]),
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
  const key = router.currentRoute.value.params.all[0]
  if (path !== '/' && !path.startsWith('/@')) {
    const params = router.currentRoute.value.params
    const uri = path.match(new RegExp(`/${storageKey.value}(\S*)/`))
    if (params.all[params.all.length - 1].includes('.')) {
      // 包含 . 的可能是文件
      handleRouterChange(path)
      handleFile(storageKey.value, path.slice(`/${key}`.length, path.length))
    } else {
      // 不包含 . 的可能是文件夹
      handleRouterChange(path)
      handleRouter()
    }
  }
})

/** 第一次进来 */
onMounted(() => {
  const params = router.currentRoute.value.params
  const path = router.currentRoute.value.path.toString()
  const key = router.currentRoute.value.params.all[0]
  const uri = path.slice(`/${key}`.length, path.length)
  if (params.all[params.all.length - 1].includes('.')) {
    // 包含 . 的可能是文件
    handleRouterChange(uri)
    handleFile(key, uri)
  } else {
    // 不包含 . 的可能是文件夹
    handleRouterChange(uri)
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
      <a-col :xs="1" :sm="2" :md="2" :lg="3" :xl="4" :xxl="4"></a-col>
      <a-col :xs="22" :sm="20" :md="20" :lg="18" :xl="16" :xxl="16">
        <a-tag color="gray" :style="{ 'overflow-x': 'auto', 'width': '100%' }">
          <template #icon>
            <icon-branch />
          </template>
          <a-breadcrumb :routes="routes" :max-count="3">
            <template #item-render="{ route }">
              <a-link @click="router.push(route.path)">
                {{route.label}}
              </a-link>
            </template>
          </a-breadcrumb>
        </a-tag>
        <a-card :bordered="false" :style="{ width: '100%' }">
          <a-skeleton v-if="loading" :animation="true">
            <a-space direction="vertical" :style="{ width: '100%' }" size="large">
              <a-skeleton-line :rows="10" />
            </a-space>
          </a-skeleton>
          <!-- 移动端列表 -->
          <a-table v-else-if="isMobile && !loading && !fileInfo && dataList" :data="dataList" style="margin-top: 8px">
            <template #columns>
              <a-table-column :title="t('table.index.fileName')">
                <template #cell="{ record }">
                  <a-button type="text" v-if="record.type !== 'file'" @click="handleFolder(record.name)" size="mini">
                    <template #icon>
                      <icon-folder />
                    </template>
                    <!-- Use the default slot to avoid extra spaces -->
                    <template #default>{{ record.name.length > 18 ? `${record.name.substring(0, 18)}...` : record.name }}</template>
                  </a-button>
                  <a-button type="text" v-else @click="clickFile(record.name)" size="mini">
                    <!-- Use the default slot to avoid extra spaces -->
                    <template #default>{{ record.name.length > 15 ? `${record.name.substring(0, 15)}...` : record.name }}</template>
                  </a-button>
                </template>
              </a-table-column>
              <a-table-column :title="t('table.Optional')" fixed="right">
                <template #cell="{ record }">
                  <a-space :size="4">
                    <a-button v-if="record.type === 'file'" type="outline" size="mini">
                      <template #icon>
                        <a className="cursor-pointer rounded px-1.5 py-1 hover:bg-gray-300 dark:hover:bg-gray-600" :href="record.url">
                          <icon-download />
                        </a>
                      </template>
                    </a-button>
                    <a-button type="outline" size="mini">
                      <template #icon>
                        <icon-share-alt @click="handleShare" />
                      </template>
                    </a-button>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
          <!-- PC 端列表 -->
          <a-table v-else-if="!isMobile && !loading && !fileInfo && dataList" :data="dataList" style="margin-top: 10px">
            <template #columns>
              <a-table-column :title="t('table.index.fileName')">
                <template #cell="{ record }">
                  <a-button type="text" v-if="record.type !== 'file'" @click="handleFolder(record.name)">
                    <template #icon>
                      <icon-folder />
                    </template>
                    <!-- Use the default slot to avoid extra spaces -->
                    <template #default>{{ record.name }}</template>
                  </a-button>
                  <a-button type="text" v-else @click="clickFile(record.name)">
                    <!-- Use the default slot to avoid extra spaces -->
                    <template #default>{{ record.name }}</template>
                  </a-button>
                </template>
              </a-table-column>
              <a-table-column :title="t('table.index.time')" data-index="lastModifiedDateTime"></a-table-column>
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
                    <a-button v-else type="outline" size="small">
                      <template #icon>
                        <icon-share-alt @click="handleShare" />
                      </template>
                    </a-button>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
          <!-- 文件预览 -->
          <a-alert v-else-if="!loading && fileInfo.type === 'file'">这儿正在开发对文件的预览、下载、分享等处理！</a-alert>
        </a-card>
      </a-col>
      <a-col :xs="1" :sm="2" :md="2" :lg="3" :xl="4" :xxl="4"></a-col>
    </a-row>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
