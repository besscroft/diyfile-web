<script setup lang="ts">
import { GetUserInfoByUserName } from '~/api/modules/user'

const { t } = useI18n()
const router = useRouter()
const detail = ref({})

const useDetail = () => {
  const username = router.currentRoute.value.params.username
  GetUserInfoByUserName(username).then((res) => {
    if (res.code === 200) {
      detail.value = res.data
    }
  })
}

useDetail()
</script>

<template>
  <div
    class="layout-demo" :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '12px',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ height: '100%' }">
      <icon-arrow-left @click="router.back()"/>
      <a-space direction="vertical" size="large" fill>
        <a-descriptions :data="detail" :title="t('table.UserInfo')" layout="inline-vertical" bordered>
          <descriptions-item label="用户名">{{ detail.username }}</descriptions-item>
          <descriptions-item label="邮箱">{{ detail.email }}</descriptions-item>
          <descriptions-item label="昵称">{{ detail.name }}</descriptions-item>
          <descriptions-item label="真实姓名">{{ detail.realName }}</descriptions-item>
          <descriptions-item label="手机">{{ detail.telephone }}</descriptions-item>
          <descriptions-item label="生日">{{ detail.birthday }}</descriptions-item>
          <descriptions-item label="性别">
            <template #default>
              <a-tag v-if="detail.sex === 1" size="small">男</a-tag>
              <a-tag v-else size="small">女</a-tag>
            </template>
          </descriptions-item>
          <descriptions-item label="创建者">{{ detail.creator }}</descriptions-item>
          <descriptions-item label="更新者">{{ detail.updater }}</descriptions-item>
          <descriptions-item label="创建时间">{{ detail.createTime }}</descriptions-item>
          <descriptions-item label="更新时间">{{ detail.updateTime }}</descriptions-item>
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
