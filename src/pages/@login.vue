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

            <span
              class="absolute inset-y-0 right-0 grid place-content-center px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
            预览账号：view/666666
          </div>
        </div>

        <button
          @click="handleSubmit"
          class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
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
