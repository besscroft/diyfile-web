<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { storagePage } from '~/api/modules/storage'
import useDevice from '~/hooks/device'

const router = useRouter()
const { t } = useI18n()
const { isMobile } = useDevice()
const dataList = ref<Array<Object>>([])
const loading = ref<Boolean>(true)
const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
  },
})

const handleStoragePage = () => {
  loading.value = true
  storagePage(data.queryParam).then((res) => {
    if (res.code === 200) {
      dataList.value = res.data.list
    }
    loading.value = false
  })
}

const handleStorageUpdate = () => {
  Message.warning('还没写!')
}

const handleStorageDelete = () => {
  Message.warning('还没写!')
}

handleStoragePage()
</script>

<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '0.25rem',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ height: '100%' }" :title="t('menu.setting.storage')">
      <a-space v-if="loading" direction="vertical" size="large" :style="{ width: '100%' }">
        <a-skeleton animation="animation">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-line v-if="!isMobile" :rows="10" />
            <a-skeleton-shape size="large" :key="index" v-for="index in 10" />
          </a-space>
        </a-skeleton>
      </a-space>
      <a-row v-else :gutter="[12, 10]">
        <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :key="item.id" v-for="item in dataList">
          <a-card :style="{ height: '300px' }" :title="item.name" hoverable>
            <template #extra>
              <a-dropdown>
                <a-button type="primary">{{ t('table.Optional') }}</a-button>
                <template #content>
                  <a-doption @click="router.push({ path: `/@admin/setting/storage/${encodeURIComponent(item.id)}`, params: { id: item.id } })">{{ t('button.detail') }}</a-doption>
                  <a-doption @click="router.push({ path: '/@admin/setting/storage/edit', query: { id: item.id } })">{{ t('button.edit') }}</a-doption>
                  <a-doption @click="handleStorageDelete">{{ t('button.delete') }}</a-doption>
                </template>
              </a-dropdown>
            </template>
            <template #cover>
              <div
                :style="{
                  height: '180px',
                  overflow: 'hidden',
                }"
              >
                <icon-storage :style="{ 'margin-top': '12px', 'height': '36px', 'width': '100%' }" />
                <a-typography-paragraph>
                  {{ item.remark }}
                </a-typography-paragraph>
              </div>
            </template>
            <a-card-meta >
              <template #avatar>
                <div
                  :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
                >
                  <a-space>
                    <a-tag v-if="item.type === 0" color="cyan">本地存储</a-tag>
                    <a-tag v-else-if="item.type === 1" color="cyan">OneDrive</a-tag>
                    <a-tag v-if="item.enable === 1" color="green">启用</a-tag>
                    <a-tag v-else color="gray">禁用</a-tag>
                  </a-space>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <a-card
            hoverable
            :style="{ height: '300px' }"
            class="flex items-center justify-center"
            @click="router.push('/@admin/setting/storage/add')"
          >
            <a-result>
              <template #icon>
                <icon-plus style="font-size: 20px" />
              </template>
            </a-result>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
