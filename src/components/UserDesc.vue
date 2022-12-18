<script setup lang="ts">
const props = defineProps(['value'])
const { t } = useI18n()
</script>

<template>
  <a-space direction="vertical" size="large" fill>
    <a-descriptions :data="props" :title="t('table.UserInfo')" layout="inline-vertical" bordered>
      <descriptions-item label="用户名">{{ props.value.username }}</descriptions-item>
      <descriptions-item label="邮箱">{{ props.value.email }}</descriptions-item>
      <descriptions-item label="昵称">{{ props.value.name }}</descriptions-item>
      <descriptions-item label="真实姓名">{{ props.value.realName }}</descriptions-item>
      <descriptions-item label="手机">{{ props.value.telephone }}</descriptions-item>
      <descriptions-item label="生日">{{ props.value.birthday }}</descriptions-item>
      <descriptions-item label="性别">
        <template #default>
          <a-tag v-if="props.value.sex === 1" size="small">男</a-tag>
          <a-tag v-else size="small">女</a-tag>
        </template>
      </descriptions-item>
      <descriptions-item label="创建者">{{ props.value.creator }}</descriptions-item>
      <descriptions-item label="更新者">{{ props.value.updater }}</descriptions-item>
      <descriptions-item label="创建时间">{{ props.value.createTime }}</descriptions-item>
      <descriptions-item label="更新时间">{{ props.value.updateTime }}</descriptions-item>
      <descriptions-item label="帐号启用状态">
        <template #default>
          <a-tag v-if="props.value.status === 1" size="small" color="#168cff">启用</a-tag>
          <a-tag v-else size="small" type="danger" color="#86909c">禁用</a-tag>
        </template>
      </descriptions-item>
      <descriptions-item label="备注">{{ props.value.remark }}</descriptions-item>
    </a-descriptions>
  </a-space>
</template>
