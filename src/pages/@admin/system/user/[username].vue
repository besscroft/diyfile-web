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
  <div flex grid justify-start justify-center items-center h-8>
    <div mr-auto>
      <n-icon size="22" @click="router.back()" class="cursor-pointer ml-0.25rem">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
          <path d="M26 4h2v24h-2z" fill="currentColor"></path>
          <path d="M11.414 20.586L7.828 17H22v-2H7.828l3.586-3.586L10 10l-6 6l6 6l1.414-1.414z" fill="currentColor"></path>
        </svg>
      </n-icon>
    </div>
    <p text-base font-medium mr-0.25rem>{{ t('table.UserInfo') }}</p>
  </div>
  <div content-style="padding: 0;" h-full w-full mt-1 of-auto onscroll style="height: calc(100% - 4rem); -ms-overflow-style: none;">
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
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
