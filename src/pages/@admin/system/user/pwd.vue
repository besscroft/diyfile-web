<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { User } from '~/api/interface/user'
import { userPasswordUpdate } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const { t } = useI18n()

const pwdForm = reactive<User.UpdatePasswordData>({
  userId: undefined,
  isSelf: false,
  oldPassword: '',
  newPassword: '',
})

const handleSubmit = () => {
  pwdForm.userId = Number(router.currentRoute.value.query.id)
  userPasswordUpdate(pwdForm).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      Message.info(res.message)
      router.push('/@admin/system/user')
    }
  })
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
      <div class="flex flex-row flex-wrap mx-1.5" style="margin-top: 1rem">
        <a-form class="flex-initial mx-auto" :model="pwdForm" :style="{ width: '600px' }" layout="vertical">
          <a-form-item field="oldPassword" :label="t('tip.password')" required>
            <a-input v-model="pwdForm.oldPassword" :placeholder="t('tip.passwordPh')" allow-clear />
          </a-form-item>
          <a-form-item field="newPassword" :label="t('tip.passwordNew')" required>
            <a-input-password v-model="pwdForm.newPassword" :placeholder="t('tip.passwordNewPh')" allow-clear />
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
