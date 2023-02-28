<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { Login } from '~/api/interface'
import { getInfo, loginApi } from '~/api/modules/user'

const { t } = useI18n()
const router = useRouter()
const user = useUserStore()
const { isMobile } = useDevice()

const loginForm = reactive<Login.ReqLoginForm>({
  username: '',
  password: '',
})

const handleSubmit = () => {
  loginApi(loginForm).then(async (res) => {
    if (res.code === 200) {
      const token = res.data.tokenValue
      user.setUserName('')
      user.setAvatar('')
      user.setToken(token)
      localStorage.setItem('diyfile-token', token)
      Message.success('登录成功!')
      await getInfo().then((res) => {
        if (res.code !== 200) {
          window.location.href = '/@login'
        }
        user.setUserName(res.data.userName)
        user.setAvatar(res.data.avatar)
        user.setRoleCode(res.data.role)
      })
      window.location.href = '/'
    }
  }).catch((err) => {
    Message.error(err.message)
  })
}
</script>

<template>
  <div class="flex flex-row flex-wrap mx-1.5" style="margin-top: 6rem">
    <a-form class="flex-initial mx-auto" :model="loginForm" :style="{ width: '600px' }">
      <a-form-item field="username" :label="t('tip.account')">
        <a-input v-model="loginForm.username" :placeholder="t('tip.accountPh')" allow-clear />
      </a-form-item>
      <a-form-item field="password" :label="t('tip.password')">
        <a-input-password v-model="loginForm.password" :placeholder="t('tip.passwordPh')" allow-clear />
      </a-form-item>
      <a-form-item>
        观察员账号/密码：view/666666
      </a-form-item>
      <a-form-item>
        <button type="button" class="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="handleSubmit">{{ t('button.login') }}</button>
      </a-form-item>
    </a-form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
