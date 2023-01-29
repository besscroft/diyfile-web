<script setup lang="ts">
import { getDefaultStorage } from '~/api/modules/file'
import useDevice from '~/hooks/device'

const { isMobile } = useDevice()
const { t } = useI18n()
const user = useUserStore()
const router = useRouter()
const dataList = ref()
const loading = ref<boolean>(true)
const routes = ref<Array<any>>([
  {
    path: '/',
    label: 'Home',
  },
])

onBeforeMount(() => {
  getDefaultStorage().then((res) => {
    if (res.code === 200) {
      router.push({ path: `/${res.data.storageKey}` })
    }
  })
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
        <a-tag color="gray">
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
          <a-table v-else-if="isMobile && !loading" :data="dataList" style="margin-top: 8px" :loading="loading">
            <template #columns>
              <a-table-column title="文件名">
              </a-table-column>
              <a-table-column title="操作">
              </a-table-column>
            </template>
          </a-table>
          <a-table v-else-if="!isMobile && !loading" style="margin-top: 10px" :loading="loading">
            <template #columns>
              <a-table-column title="文件名">
              </a-table-column>
              <a-table-column title="最后修改时间" data-index="lastModifiedDateTime"></a-table-column>
              <a-table-column title="文件大小">
              </a-table-column>
              <a-table-column title="操作">
              </a-table-column>
            </template>
          </a-table>
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
