<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { User } from '~/api/interface/user'
import { userAdd } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const { t } = useI18n()
const ruleFormRef = ref<FormInstance>()

const addUserRuleForm = reactive<User.AddUserRequestData>({
  /** 用户名 */
  username: undefined,
  /** 密码 */
  password: undefined,
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

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '用户名不能为空！', trigger: 'blur' },
    { min: 6, max: 20, message: '用户名长度在 6~20 之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空！', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6~20 之间', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '角色必选！', trigger: 'blur' },
  ],
})

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      userAdd(addUserRuleForm).then((res) => {
        if (res.code === ResultEnum.SUCCESS) {
          ElMessage.info(res.message)
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
  <el-card :body-style="{ padding: '0.25rem' }" class="my-1" shadow="never">
    <el-page-header @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-400 mr-2"> {{ t('tip.cardTitle') }} </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button type="primary" class="ml-2" @click="handleSubmit(ruleFormRef)">{{ t('button.submit') }}</el-button>
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
          :model="addUserRuleForm"
          style="max-width: 460px"
        >
          <el-form-item :label="t('user.username')" prop="username" required>
            <el-input v-model="addUserRuleForm.username" placeholder="请输入用户名称" maxlength="20" clearable />
          </el-form-item>
          <el-form-item :label="t('user.password')" prop="password" required>
            <el-input v-model="addUserRuleForm.password" placeholder="请输入密码" maxlength="20" type="password" show-password clearable />
          </el-form-item>
          <el-form-item :label="t('user.avatar')">
            <el-input v-model="addUserRuleForm.avatar" placeholder="头像地址" clearable />
          </el-form-item>
          <el-form-item :label="t('user.role')" prop="role" required>
            <el-select v-model="addUserRuleForm.role" class="w-full" :placeholder="t('tip.rolePh')" clearable>
              <el-option label="超级管理员" value="platform-super-admin" disabled />
              <el-option label="平台管理员" value="platform-admin" />
              <el-option label="平台运维员" value="platform-self-provisioner" />
              <el-option label="平台观察员" value="platform-view" />
              <el-option label="游客" value="platform-visitor" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('user.name')">
            <el-input v-model="addUserRuleForm.name" placeholder="请输入昵称" maxlength="20" clearable />
          </el-form-item>
          <el-form-item :label="t('user.email')">
            <el-input v-model="addUserRuleForm.email" placeholder="请输入邮箱" clearable />
          </el-form-item>
          <el-form-item :label="t('user.telephone')">
            <el-input v-model="addUserRuleForm.telephone" placeholder="请输入手机号" clearable>
              <template #prepend>+86</template>
            </el-input>
          </el-form-item>
          <el-form-item :label="t('user.remark')">
            <el-input
              v-model="addUserRuleForm.remark"
              maxlength="200"
              placeholder="请输入备注"
              show-word-limit
              type="textarea"
            />
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
