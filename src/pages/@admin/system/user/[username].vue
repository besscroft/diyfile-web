<script setup lang="ts">
import { GetUserInfoByUserName } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const router = useRouter()
const detail = ref({})
const loading = ref<Boolean>(true)

const useDetail = () => {
  loading.value = true
  const username = router.currentRoute.value.params.username
  GetUserInfoByUserName(username).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      detail.value = res.data
    }
    loading.value = false
  })
}

useDetail()
</script>

<template>
  <el-card :body-style="{ padding: '0.25rem' }" class="my-1 h-10" shadow="never">
    <el-page-header class="mt-1" @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-400 mr-2"> {{ t('table.UserInfo') }} </span>
        </div>
      </template>
    </el-page-header>
  </el-card>
  <el-card :body-style="{ padding: '1rem' }" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;" shadow="never">
    <el-skeleton
      v-if="loading"
      :rows="5"
      animated
    />
    <el-descriptions
      v-else
      direction="vertical"
      class="margin-top"
      :column="3"
      border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            用户名
          </div>
        </template>
        {{ detail.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            邮箱
          </div>
        </template>
        {{ detail.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            昵称
          </div>
        </template>
        {{ detail.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            手机
          </div>
        </template>
        {{ detail.telephone }}
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
            最近登录时间
          </div>
        </template>
        {{ detail.loginTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            帐号启用状态
          </div>
        </template>
        <el-tag v-if="detail.status === 1" class="mx-1" effect="dark" round>启用</el-tag>
        <el-tag v-else class="mx-1" effect="dark" type="danger" round>禁用</el-tag>
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
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
