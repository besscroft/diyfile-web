<script setup lang="ts">
import type { Login } from '~/api/interface'
import { getInfo, loginApi } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const user = useUserStore()
const message = useMessage()

const loginForm = reactive<Login.ReqLoginForm>({
  username: '',
  password: '',
})

const handleSubmit = () => {
  loginApi(loginForm).then(async (res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
      const token = res.data.tokenValue
      user.setUserName('')
      user.setAvatar('')
      user.setToken(token)
      localStorage.setItem('diyfile-token', token)
      await getInfo().then((res) => {
        if (res.code !== ResultEnum.SUCCESS) {
          window.location.href = '/@login'
        }
        user.setUserName(res.data.userName)
        user.setAvatar(res.data.avatar)
        user.setRoleCode(res.data.role)
      })
      window.location.href = '/'
    }
  }).catch((err) => {
    console.log(err)
    message.error(err.message)
  })
}
</script>

<template>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg">
      <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
        DiyFile
      </h1>

      <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
        Made with ❤ by Bess Croft.
      </p>

      <div
        class="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
      >
        <p class="text-center text-lg font-medium">欢迎登录</p>

        <div>
          <label for="email" class="sr-only">Email</label>

          <div class="relative">
            <input
              v-model="loginForm.username"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter email"
            />
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>

          <div class="relative">
            <input
              v-model="loginForm.password"
              type="password"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
            />
            预览账号：view/666666
          </div>
        </div>

        <button
          class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          @click="handleSubmit"
        >
          {{ t('button.login') }}
        </button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
