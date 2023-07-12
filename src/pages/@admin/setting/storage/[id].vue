<script setup lang="ts">
import { storageInfo } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const router = useRouter()
const { isMobile } = useDevice()
const detail = ref({})
const loading = ref<boolean>(true)

const useDetail = () => {
  loading.value = true
  const id = parseInt(router.currentRoute.value.params.id.toString())
  storageInfo(id).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      detail.value = res.data
    }
    loading.value = false
  })
}

useDetail()
</script>

<template>
  <n-card content-style="padding: 0;" my0.5>
    <n-page-header :title="t('table.StorageInfo')" mx0.5 @back="router.back()" />
  </n-card>
  <n-card content-style="padding: 0.5rem;" of-auto onscroll class="box-card" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-skeleton v-if="loading" text :repeat="3" :sharp="false" size="medium" />
    <n-descriptions v-else label-placement="top" bordered :column="isMobile ? 2 : 4">
      <n-descriptions-item label="存储名称">
        {{ detail.name }}
      </n-descriptions-item>
      <n-descriptions-item label="存储类型">
        <n-tag v-if="detail.type === 0" type="info" :bordered="false"> 本地存储 </n-tag>
        <n-tag v-if="detail.type === 1" type="info" :bordered="false"> OneDrive </n-tag>
        <n-tag v-if="detail.type === 2" type="info" :bordered="false"> 阿里云 OSS </n-tag>
        <n-tag v-if="detail.type === 3" type="info" :bordered="false"> Amazon S3 </n-tag>
      </n-descriptions-item>
      <n-descriptions-item label="存储 Key">
        {{ detail.storageKey }}
      </n-descriptions-item>
      <n-descriptions-item label="存储启用状态">
        <n-tag v-if="detail.enable === 1" type="info" :bordered="false"> 启用 </n-tag>
        <n-tag v-else type="error" :bordered="false"> 禁用 </n-tag>
      </n-descriptions-item>
      <n-descriptions-item label="创建者">
        {{ detail.creator }}
      </n-descriptions-item>
      <n-descriptions-item label="更新者">
        {{ detail.updater }}
      </n-descriptions-item>
      <n-descriptions-item label="创建时间">
        {{ detail.createTime }}
      </n-descriptions-item>
      <n-descriptions-item label="更新时间">
        {{ detail.updateTime }}
      </n-descriptions-item>
      <n-descriptions-item label="存储默认值状态">
        <n-tag v-if="detail.defaultStatus === 1" type="info" :bordered="false"> 默认 </n-tag>
        <n-tag v-else type="error" :bordered="false"> 非默认 </n-tag>
      </n-descriptions-item>
      <n-descriptions-item label="备注" :span="3">
        {{ detail.remark }}
      </n-descriptions-item>
    </n-descriptions>
    <n-divider title-placement="left">
      配置列表
    </n-divider>
    <n-descriptions bordered label-placement="left" :column="1">
      <n-descriptions-item v-for="item in detail.configList" :key="item.id" :label="item.name">
        {{ item.configValue }}
      </n-descriptions-item>
    </n-descriptions>
  </n-card>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
