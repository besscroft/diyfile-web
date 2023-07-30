<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { userPasswordUpdate } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'
import type { User } from '~/api/interface/user'

const router = useRouter()
const message = useMessage()
const { t } = useI18n()
const { isMobile } = useDevice()
const formRef = ref<FormInst | null>(null)

const pwdForm = reactive<User.UpdatePasswordData>({
  userId: undefined,
  isSelf: false,
  oldPassword: '',
  newPassword: '',
})

const rules: FormRules = {
  oldPassword: [
    { required: true, message: '旧密码必填！', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '新密码必填！', trigger: 'blur' },
  ],
}

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      pwdForm.userId = Number(router.currentRoute.value.query.id)
      userPasswordUpdate(pwdForm).then((res) => {
        if (res.code === ResultEnum.SUCCESS) {
          message.success(res.message)
          router.push('/@admin/system/user')
        }
      })
    } else {
      console.log(errors)
      message.error('请检查您的内容！')
    }
  })
}
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
    <div>
      <n-icon size="22" @click="handleSubmit" class="cursor-pointer mr-0.25rem">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
          <path d="M13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z" fill="currentColor"></path>
        </svg>
      </n-icon>
    </div>
  </div>
  <div content-style="padding: 0;" h-full w-full mt-1 of-auto onscroll style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-grid cols="5" item-responsive responsive="screen">
      <n-grid-item offset="0 m:1 l:1" span="5 m:3 l:3">
        <n-form ref="formRef" :model="pwdForm" :rules="rules">
          <n-form-item :label="t('tip.password')" path="oldPassword" required>
            <n-input
              v-model:value="pwdForm.oldPassword"
              type="password"
              show-password-on="click"
              placeholder="请输入密码"
              show-count
              :maxlength="20"
            />
          </n-form-item>
          <n-form-item :label="t('tip.passwordNew')" path="newPassword" required>
            <n-input
              v-model:value="pwdForm.newPassword"
              type="password"
              show-password-on="click"
              placeholder="请输入密码"
              show-count
              :maxlength="20"
            />
          </n-form-item>
        </n-form>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
