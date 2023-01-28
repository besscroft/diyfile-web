<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { getFileItemByKey } from '~/api/modules/file'
import useDevice from '~/hooks/device'

const { isMobile } = useDevice()
const { t } = useI18n()
const user = useUserStore()
const router = useRouter()
const storageKey = ref()
const dataList = ref()
const loading = ref<boolean>(false)

const handleItemByKey = (storageKey: string, folderPath: string) => {
  loading.value = true
  getFileItemByKey(storageKey, folderPath).then((res) => {
    if (res.code === 200) {
      dataList.value = res.data
      loading.value = false
    }
  })
}

const handleShare = () => {
  Message.info('还没写！')
}

onBeforeMount(() => {
  const key = router.currentRoute.value.params.all[0]
  storageKey.value = key
  const path = router.currentRoute.value.path.match(/od(\S*)/)
  if (path) {
    handleItemByKey(key, path[1])
  } else {
    handleItemByKey(key, '/')
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
      <a-col :xs="1" :sm="2" :md="2" :lg="3" :xl="4" :xxl="4">
      </a-col>
      <a-col :xs="22" :sm="20" :md="20" :lg="18" :xl="16" :xxl="16">
        <a-tag color="gray">
          <template #icon>
            <icon-branch />
          </template>
          {{ t('home.fileTips') }}
        </a-tag>
        <a-card :bordered="false" :style="{ width: '100%' }">
          <a-table v-if="isMobile" :data="dataList" style="margin-top: 12px" :loading="loading">
            <template #columns>
              <a-table-column title="文件名">
                <template #cell="{ record }">
                  {{ record.name }}
                </template>
              </a-table-column>
              <a-table-column title="操作">
                <template #cell="{ record }">
                  <a-space :size="4">
                    <a-button v-if="record.type === 'file'" type="primary">
                      <template #icon>
                        <a className="cursor-pointer rounded px-1.5 py-1 hover:bg-gray-300 dark:hover:bg-gray-600" :href="record.url">
                          <icon-download />
                        </a>
                      </template>
                    </a-button>
                    <a-button type="primary">
                      <template #icon>
                        <icon-share-alt @click="handleShare" />
                      </template>
                    </a-button>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
          <a-table v-else :data="dataList" style="margin-top: 30px" :loading="loading">
            <template #columns>
              <a-table-column title="文件名">
                <template #cell="{ record }">
                  {{ record.name }}
                </template>
              </a-table-column>
              <a-table-column title="最后修改时间" data-index="lastModifiedDateTime"></a-table-column>
              <a-table-column title="文件大小">
                <template #cell="{ record }">
                  {{ (record.size / 1000 / 1000).toFixed(2) }} MB
                </template>
              </a-table-column>
              <a-table-column title="操作">
                <template #cell="{ record }">
                  <a-space :size="4">
                    <a-button v-if="record.type === 'file'" type="primary">
                      <template #icon>
                        <a className="cursor-pointer rounded px-1.5 py-1 hover:bg-gray-300 dark:hover:bg-gray-600" :href="record.url">
                          <icon-download />
                        </a>
                      </template>
                    </a-button>
                    <a-button v-else type="primary">
                      <template #icon>
                        <icon-share-alt @click="handleShare" />
                      </template>
                    </a-button>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </a-card>
      </a-col>
      <a-col :xs="1" :sm="2" :md="2" :lg="3" :xl="4" :xxl="4">

      </a-col>
    </a-row>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
