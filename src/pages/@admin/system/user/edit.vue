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
    <n-grid x-gap="12" :cols="isMobile ? 1 : 3">
      <n-gi :offset="isMobile ? 0 : 1">
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
      </n-gi>
    </n-grid>
  </n-card>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
