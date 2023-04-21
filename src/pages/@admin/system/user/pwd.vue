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
  <n-card content-style="padding: 0;" class="my-0.5">
    <n-page-header :title="t('menu.index')" class="mx-0.5" @back="router.back()">
      <template #extra>
        <div class="flex items-center">
          <v-btn icon="done" variant="text" size="x-small" @click="handleSubmit" />
        </div>
      </template>
    </n-page-header>
  </n-card>
  <n-card content-style="padding: 0.5rem;" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
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
  </n-card>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
