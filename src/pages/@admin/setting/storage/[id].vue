<script setup lang="ts">
import { storageInfo } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const router = useRouter()
const detail = ref({})
const loading = ref<Boolean>(true)

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
  <n-card content-style="padding: 0;" class="my-0.5">
    <n-page-header :title="t('table.StorageInfo')" class="mx-0.5" @back="router.back()">
    </n-page-header>
  </n-card>
  <n-card content-style="padding: 0.5rem;" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <el-skeleton
      v-if="loading"
      :rows="5"
      animated
    />
    <el-descriptions
      velse
      direction="vertical"
      class="margin-top"
      :column="3"
      border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            存储名称
          </div>
        </template>
        {{ detail.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            存储类型
          </div>
        </template>
        <el-tag v-if="detail.type === 0" class="mx-1" effect="dark" round>本地存储</el-tag>
        <el-tag v-if="detail.type === 1" class="mx-1" effect="dark" round>OneDrive</el-tag>
        <el-tag v-if="detail.type === 2" class="mx-1" effect="dark" round>阿里云 OSS</el-tag>
        <el-tag v-if="detail.type === 3" class="mx-1" effect="dark" round>Amazon S3</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            存储 Key
          </div>
        </template>
        {{ detail.storageKey }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            存储启用状态
          </div>
        </template>
        <el-tag v-if="detail.enable === 1" class="mx-1" effect="dark" round>启用</el-tag>
        <el-tag v-else class="mx-1" effect="dark" type="danger" round>禁用</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            创建者
          </div>
        </template>
        {{ detail.creator }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            更新者
          </div>
        </template>
        {{ detail.updater }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            创建时间
          </div>
        </template>
        {{ detail.createTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            更新时间
          </div>
        </template>
        {{ detail.updateTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            备注
          </div>
        </template>
        {{ detail.remark }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      v-if="detail"
      class="margin-top"
      :column="1"
      title="配置列表"
      border
    >
      <el-descriptions-item v-for="item in detail.configList" :key="item.id">
        <template #label>
          <div class="cell-item">
            {{ item.name }}
          </div>
        </template>
        {{ item.configValue }}
      </el-descriptions-item>
    </el-descriptions>
  </n-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
