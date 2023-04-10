<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { userPasswordUpdate } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'
import type { User } from '~/api/interface/user'

const router = useRouter()
const snackbar = useSnackbarStore()
const { t } = useI18n()
const ruleFormRef = ref<FormInstance>()

const pwdForm = reactive<User.UpdatePasswordData>({
  userId: undefined,
  isSelf: false,
  oldPassword: '',
  newPassword: '',
})

const rules = reactive<FormRules>({
  oldPassword: [
    { required: true, message: '旧密码必填！', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '新密码必填！', trigger: 'blur' },
  ],
})

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      pwdForm.userId = Number(router.currentRoute.value.query.id)
      userPasswordUpdate(pwdForm).then((res) => {
        if (res.code === ResultEnum.SUCCESS) {
          snackbar.success(res.message)
          router.push('/@admin/system/user')
        }
      })
    } else {
      return false
    }
  })
}
</script>

<template>
  <el-card :body-style="{ padding: '0.25rem' }" class="my-1 h-10" shadow="never">
    <el-page-header @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-400 mr-2"> {{ t('tip.cardTitle') }} </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <v-btn icon="done" variant="text" size="x-small" @click="handleSubmit(ruleFormRef)" />
        </div>
      </template>
    </el-page-header>
  </el-card>
  <el-card :body-style="{ padding: '1rem' }" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;" shadow="never">
    <el-row>
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
      <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
        <el-form
          ref="ruleFormRef"
          label-position="top"
          :rules="rules"
          :model="pwdForm"
          style="max-width: 460px"
        >
          <el-form-item :label="t('tip.password')" prop="oldPassword" required>
            <el-input v-model="pwdForm.oldPassword" placeholder="请输入旧密码" show-password type="password" maxlength="20" clearable />
          </el-form-item>
          <el-form-item :label="t('tip.passwordNew')" prop="newPassword" required>
            <el-input v-model="pwdForm.newPassword" placeholder="请输入新密码" show-password type="password" maxlength="20" clearable />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
    </el-row>
  </el-card>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
