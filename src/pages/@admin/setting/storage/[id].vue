<script setup lang="ts">
import { storageInfo } from '~/api/modules/storage'

const { t } = useI18n()
const router = useRouter()
const detail = ref({})
const loading = ref<Boolean>(true)

const useDetail = () => {
  loading.value = true
  const id = parseInt(router.currentRoute.value.params.id.toString())
  storageInfo(id).then((res) => {
    if (res.code === 200) {
      detail.value = res.data
    }
    loading.value = false
  })
}

useDetail()
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
    <a-card hoverable :style="{ height: '100%' }">
      <icon-arrow-left @click="router.back()"/>
      <br/>
      <a-progress :percent="0.5" :style="{ width: '50%' }">
        <template v-slot:text="scope" >
          存储详情开发进度 {{ scope.percent * 100 }}%
        </template>
      </a-progress>
      <a-space v-if="loading" direction="vertical" size="large" :style="{ width: '100%' }">
        <a-skeleton animation="animation">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-line :rows="5" />
          </a-space>
        </a-skeleton>
      </a-space>
      <a-space v-else direction="vertical" size="large" fill>
        <a-descriptions :data="detail" :title="t('table.UserInfo')" layout="inline-vertical" bordered>
          <descriptions-item label="存储名称">{{ detail.name }}</descriptions-item>
          <descriptions-item label="存储类型">
            <template #default>
              <a-tag v-if="detail.type === 0" size="small">本地存储</a-tag>
              <a-tag v-if="detail.type === 1" size="small">OneDrive</a-tag>
            </template>
          </descriptions-item>
          <descriptions-item label="存储启用状态">
            <template #default>
              <a-tag v-if="detail.enable === 1" size="small">启用</a-tag>
              <a-tag v-else size="small">禁用</a-tag>
            </template>
          </descriptions-item>
          <descriptions-item label="创建者">{{ detail.creator }}</descriptions-item>
          <descriptions-item label="更新者">{{ detail.updater }}</descriptions-item>
          <descriptions-item label="创建时间">{{ detail.createTime }}</descriptions-item>
          <descriptions-item label="更新时间">{{ detail.updateTime }}</descriptions-item>
          <descriptions-item label="备注">{{ detail.remark }}</descriptions-item>
          <!-- TODO 配置列表展示 -->
        </a-descriptions>
        配置列表展示还在开发中...
      </a-space>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
