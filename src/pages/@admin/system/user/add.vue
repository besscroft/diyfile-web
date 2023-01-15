<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { User } from '~/api/interface/user'
import { userAdd } from '~/api/modules/user'

const router = useRouter()
const { t } = useI18n()
const emailTipData = ref()

const addUserRuleForm = reactive<User.AddUserRequestData>({
  /** 用户名 */
  username: undefined,
  /** 密码 */
  password: undefined,
  /** 头像 */
  avatar: undefined,
  /** 角色 */
  role: undefined,
  /** 邮箱 */
  email: undefined,
  /** 昵称 */
  name: undefined,
  /** 手机号 */
  telephone: undefined,
  /** 备注 */
  remark: undefined,
})

const handleSubmit = () => {
  userAdd(addUserRuleForm).then((res) => {
    if (res.code === 200) {
      Message.info(res.message)
      router.push('/@admin/system/user')
    }
  })
}

const handleEmailSearch = (value: string) => {
  if (value) {
    emailTipData.value = [
      value.concat('@qq.com'),
      value.concat('@163.com'),
      value.concat('@foxmail.com'),
      value.concat('@gmail.com'),
      value.concat('@outlook.com'),
    ]
  }
}
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
    <a-card hoverable :style="{ height: '100%', padding: '0.25rem' }" :title="t('tip.cardTitle')">
      <template #extra>
        <a-space>
          <a-button type="primary" @click="handleSubmit">{{ t('button.submit') }}</a-button>
        </a-space>
      </template>
      <icon-arrow-left @click="router.back()" class="cursor-pointer"/>
      <br/>
      <a-row>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6"></a-col>
        <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-form :model="addUserRuleForm" layout="vertical">
            <a-form-item field="username" :label="t('user.username')" required>
              <a-input v-model="addUserRuleForm.username" placeholder="请输入存储名称" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="password" :label="t('user.password')" required>
              <a-input-password v-model="addUserRuleForm.password" placeholder="请输入密码" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="avatar" :label="t('user.avatar')">
              <a-input v-model="addUserRuleForm.avatar" placeholder="头像地址" allow-clear />
            </a-form-item>
            <a-form-item field="role" :label="t('user.role')" required>
              <a-select v-model="addUserRuleForm.role" :placeholder="t('tip.rolePh')" allow-clear>
                <a-option value="platform-super-admin" disabled>超级管理员</a-option>
                <a-option value="platform-admin">平台管理员</a-option>
                <a-option value="platform-self-provisioner">平台运维员</a-option>
                <a-option value="platform-view">平台观察员</a-option>
                <a-option value="platform-visitor">游客</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="email" :label="t('user.email')">
              <a-auto-complete :data="emailTipData" v-model="addUserRuleForm.email" @search="handleEmailSearch" placeholder="请输入邮箱" />
            </a-form-item>
            <a-form-item field="name" :label="t('user.name')">
              <a-input v-model="addUserRuleForm.name" placeholder="请输入昵称" ::max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="telephone" :label="t('user.telephone')">
              <a-input v-model="addUserRuleForm.telephone" placeholder="请输入手机号" :max-length="{ length: 11, errorOnly: true }" show-word-limit allow-clear>
                <template #prepend>
                  +86
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="remark" :label="t('user.remark')">
              <a-textarea v-model="addUserRuleForm.remark" placeholder="请输入备注" allow-clear auto-size :max-length="{ length: 200, errorOnly: true }" show-word-limit />
            </a-form-item>
          </a-form>
          <!-- TODO 表单校验 -->
        </a-col>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6"></a-col>
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
