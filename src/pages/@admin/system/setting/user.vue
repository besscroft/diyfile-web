<script setup lang="ts">
import type { User } from '~/api/interface/user'
import { userPasswordUpdate } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const message = useMessage()
const oldPwd = ref<string>()
const pwd = ref<string>()
const pwdForm = reactive<User.UpdatePasswordData>({
  userId: undefined,
  isSelf: true,
  oldPassword: '',
  newPassword: '',
})

const handleUpdatePwd = () => {
  pwdForm.oldPassword = oldPwd.value
  pwdForm.newPassword = pwd.value
  userPasswordUpdate(pwdForm).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      oldPwd.value = ''
      pwd.value = ''
      message.success(res.message)
    }
  })
}
</script>

<template>
  <div class="h-full mx-2 mt-2">
    旧密码
    <n-input-group>
      <n-input v-model:value="oldPwd" />
    </n-input-group>
    新密码
    <n-input-group>
      <n-input v-model:value="pwd" />
      <n-button quaternary @click="handleUpdatePwd">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
              <path d="M13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z" fill="currentColor"></path>
            </svg>
          </n-icon>
        </template>
      </n-button>
    </n-input-group>
  </div>
</template>
