<script setup lang="ts">
import type { User } from '~/api/interface/user'
import { userPasswordUpdate } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const snackbar = useSnackbarStore()
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
      snackbar.success(res.message)
    }
  })
}
</script>

<template>
  <div class="h-full mx-2 mt-2">
    <v-text-field
      v-model="oldPwd"
      label="旧密码"
    ></v-text-field>
    <v-text-field
      v-model="pwd"
      class="mt-2"
      label="新密码"
      append-inner-icon="download_done"
      @click:append-inner="handleUpdatePwd"
    ></v-text-field>
  </div>
</template>

<style scoped>

</style>
