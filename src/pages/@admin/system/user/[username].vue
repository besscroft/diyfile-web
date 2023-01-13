<script setup lang="ts">
import { GetUserInfoByUserName } from '~/api/modules/user'

const { t } = useI18n()
const router = useRouter()
const detail = ref({})
const loading = ref<Boolean>(true)

const useDetail = () => {
  loading.value = true
  const username = router.currentRoute.value.params.username
  GetUserInfoByUserName(username).then((res) => {
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
      padding: '0.25rem',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ height: '100%' }"  :title="t('table.UserInfo')">
      <icon-arrow-left @click="router.back()"/> {{ t('button.back') }}
      <br />
      <a-space v-if="loading" direction="vertical" size="large" :style="{ width: '100%' }">
        <a-skeleton animation="animation">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-line :rows="5" />
          </a-space>
        </a-skeleton>
      </a-space>
      <a-space v-else direction="vertical" size="large" fill>
        <a-descriptions :data="detail" layout="inline-vertical" bordered>
          <descriptions-item label="用户名">{{ detail.username }}</descriptions-item>
          <descriptions-item label="邮箱">{{ detail.email }}</descriptions-item>
          <descriptions-item label="昵称">{{ detail.name }}</descriptions-item>
          <descriptions-item label="手机">{{ detail.telephone }}</descriptions-item>
          <descriptions-item label="创建者">{{ detail.creator }}</descriptions-item>
          <descriptions-item label="更新者">{{ detail.updater }}</descriptions-item>
          <descriptions-item label="创建时间">{{ detail.createTime }}</descriptions-item>
          <descriptions-item label="更新时间">{{ detail.updateTime }}</descriptions-item>
          <descriptions-item label="最近登录时间">{{ detail.loginTime }}</descriptions-item>
          <descriptions-item label="帐号启用状态">
            <template #default>
              <a-tag v-if="detail.status === 1" size="small" color="#168cff">启用</a-tag>
              <a-tag v-else size="small" type="danger" color="#86909c">禁用</a-tag>
            </template>
          </descriptions-item>
          <descriptions-item label="备注">{{ detail.remark }}</descriptions-item>
        </a-descriptions>
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
