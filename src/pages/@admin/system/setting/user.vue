<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { User } from '~/api/interface/user'
import { userPasswordUpdate } from '~/api/modules/user'

const pwd = ref<string>()
const pwdForm = reactive<User.UpdatePasswordData>({
  userId: undefined,
  isSelf: true,
  oldPassword: '',
  newPassword: '',
})

const handleUpdatePwd = () => {
  pwdForm.newPassword = pwd.value
  userPasswordUpdate(pwdForm).then((res) => {
    if (res.code === 200) {
      Message.info(res.message)
    }
  })
}
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
    }"
  >
    <a-card :bordered="false" hoverable :style="{ height: '100%' }">
      <a-form layout="vertical">
        <a-form-item label="请输入新密码...">
          <a-input-search v-model="pwd" search-button>
            <template #prefix>
              <icon-public />
            </template>
            <template #button-icon>
              <a-popconfirm content="确定要更新吗?" type="warning" :onOk="handleUpdatePwd">
                <icon-edit />
              </a-popconfirm>
            </template>
          </a-input-search>
        </a-form-item>
        更多设置，敬请期待！
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
