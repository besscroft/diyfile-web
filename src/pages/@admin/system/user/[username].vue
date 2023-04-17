<script setup lang="ts">
import { GetUserInfoByUserName } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const router = useRouter()
const { isMobile } = useDevice()
const detail = ref({})
const loading = ref<boolean>(true)

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
  <n-card content-style="padding: 0;" class="my-0.5">
    <n-page-header :title="t('table.UserInfo')" class="mx-0.5" @back="router.back()" />
  </n-card>
  <n-card content-style="padding: 0.5rem;" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-skeleton v-if="loading" text :repeat="3" :sharp="false" size="medium" />
    <n-descriptions v-else label-placement="top" bordered :column="isMobile ? 2 : 4">
      <n-descriptions-item label="用户名">
        {{ detail.username }}
      </n-descriptions-item>
      <n-descriptions-item label="邮箱">
        {{ detail.email }}
      </n-descriptions-item>
      <n-descriptions-item label="昵称">
        {{ detail.name }}
      </n-descriptions-item>
      <n-descriptions-item label="手机">
        {{ detail.telephone }}
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
      <n-descriptions-item label="最近登录时间">
        {{ detail.loginTime }}
      </n-descriptions-item>
      <n-descriptions-item label="帐号启用状态">
        <n-tag v-if="detail.status === 1" type="info" :bordered="false"> 启用 </n-tag>
        <n-tag v-else type="error" :bordered="false"> 禁用 </n-tag>
      </n-descriptions-item>
      <n-descriptions-item label="备注" :span="3">
        {{ detail.remark }}
      </n-descriptions-item>
    </n-descriptions>
  </n-card>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
