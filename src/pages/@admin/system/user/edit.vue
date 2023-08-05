<script setup lang="ts">
import type { FormInst, FormRules, SelectGroupOption, SelectOption } from 'naive-ui'
import type { User } from '~/api/interface/user'
import { getUserById, userUpdate } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const message = useMessage()
const { t } = useI18n()
const { isMobile } = useDevice()
const formRef = ref<FormInst | null>(null)

const updateUserRuleForm = reactive<User.UpdateUserRequestData>({
  /** 用户id */
  id: undefined,
  /** 头像 */
  avatar: undefined,
  /** 角色 */
  role: undefined,
  /** 邮箱 */
  email: undefined,
  /** 昵称 */
  name: undefined,
  /** 手机号 */
  telephone: undefined,
  /** 备注 */
  remark: undefined,
})

const rules: FormRules = {
  role: [
    { required: true, message: '角色必选！', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '昵称必填！', trigger: 'blur' },
  ],
}

const options = ref<Array<SelectOption | SelectGroupOption>>([
  {
    label: '超级管理员',
    value: 'platform-super-admin',
    disabled: true,
  },
  {
    label: '平台管理员',
    value: 'platform-admin',
  },
  {
    label: '平台运维员',
    value: 'platform-self-provisioner',
  },
  {
    label: '平台观察员',
    value: 'platform-view',
  },
  {
    label: '游客',
    value: 'platform-visitor',
  },
])

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      userUpdate(updateUserRuleForm).then((res) => {
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

onMounted(() => {
  const id = Number(router.currentRoute.value.query.id)
  getUserById(id).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      updateUserRuleForm.id = res.data.id
      updateUserRuleForm.avatar = res.data.avatar
      updateUserRuleForm.role = res.data.role
      updateUserRuleForm.email = res.data.email
      updateUserRuleForm.name = res.data.name
      updateUserRuleForm.telephone = res.data.telephone
      updateUserRuleForm.remark = res.data.remark
    }
  })
})
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
        <n-form ref="formRef" :model="updateUserRuleForm" :rules="rules">
          <n-form-item :label="t('user.role')" path="role" required>
            <n-select v-model:value="updateUserRuleForm.role" :options="options" />
          </n-form-item>
          <n-form-item :label="t('user.avatar')" path="avatar">
            <n-input v-model:value="updateUserRuleForm.avatar" placeholder="头像地址" clearable />
          </n-form-item>
          <n-form-item :label="t('user.name')" path="name" required>
            <n-input v-model:value="updateUserRuleForm.name" placeholder="请输入昵称" clearable />
          </n-form-item>
          <n-form-item :label="t('user.email')" path="email">
            <n-input v-model:value="updateUserRuleForm.email" placeholder="请输入邮箱" clearable />
          </n-form-item>
          <n-form-item :label="t('user.telephone')" path="telephone">
            <n-input-group-label>+86</n-input-group-label>
            <n-input v-model:value="updateUserRuleForm.telephone" placeholder="请输入手机号" clearable />
          </n-form-item>
          <n-form-item :label="t('storage.remark')" path="remark">
            <n-input v-model:value="updateUserRuleForm.remark" type="textarea" placeholder="请输入备注" maxlength="160" show-count />
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
