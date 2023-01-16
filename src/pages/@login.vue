<script setup lang="ts">
import { Notification } from '@arco-design/web-vue'
import type { Login } from '~/api/interface'
import { getInfo, loginApi } from '~/api/modules/user'

const { t } = useI18n()
const router = useRouter()
const user = useUserStore()

const loginForm = reactive<Login.ReqLoginForm>({
  username: '',
  password: '',
  isRememberMe: true,
})

const handleSubmit = () => {
  loginApi(loginForm).then(async (res) => {
    if (res.code === 200) {
      const token = res.data.tokenValue
      user.setUserName('')
      user.setAvatar('')
      user.setToken(token)
      Notification.success({
        title: 'Success',
        content: '登录成功!',
        closable: true,
        duration: 2000,
      })
      await getInfo().then((res) => {
        if (res.code !== 200) {
          window.location.href = '/@login'
        }
        user.setUserName(res.data.userName)
        user.setAvatar(res.data.avatar)
      })
      window.location.href = '/'
    }
  })
}
</script>

<template>
  <div class="flex flex-row flex-wrap mx-1.5" style="margin-top: 6rem">
    <a-form class="flex-initial mx-auto" :model="loginForm" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="username" :label="t('tip.account')">
        <a-input v-model="loginForm.username" :placeholder="t('tip.accountPh')" allow-clear />
      </a-form-item>
      <a-form-item field="password" :label="t('tip.password')">
        <a-input-password v-model="loginForm.password" :placeholder="t('tip.passwordPh')" allow-clear />
      </a-form-item>
      <a-form-item field="isRememberMe">
        <a-checkbox v-model="loginForm.isRememberMe">
          {{ t('tip.isRememberMe') }}
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        账号/密码：xanadu/666666
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">{{ t('button.login') }}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
