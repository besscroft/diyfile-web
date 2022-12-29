<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { User } from '~/api/interface/user'
import { userAdd } from '~/api/modules/user'

const router = useRouter()
const { t } = useI18n()

const addUserRuleForm = reactive<User.AddUserRequestData>({
  /** 用户名 */
  username: undefined,
  /** 密码 */
  password: undefined,
  /** 头像 */
  avatar: undefined,
  /** 邮箱 */
  email: undefined,
  /** 昵称 */
  name: undefined,
  /** 真实姓名 */
  realName: undefined,
  /** 手机号 */
  telephone: undefined,
  /** 生日 */
  birthday: new Date(),
  /** 性别：1->男；2->女；3->未知 */
  sex: 1,
  /** 备注 */
  remark: undefined,
})

const handleSubmit = () => {
  userAdd(addUserRuleForm).then((res) => {
    if (res.code === 200) {
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
      <icon-arrow-left @click="router.back()"/>
      <br/>
      <a-row>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6"></a-col>
        <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-form :model="addUserRuleForm" layout="vertical">
            <a-form-item field="username" :label="t('user.username')" required>
              <a-input v-model="addUserRuleForm.username" placeholder="请输入用户名" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="password" :label="t('user.password')" required>
              <a-input-password v-model="addUserRuleForm.password" placeholder="请输入密码" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="avatar" :label="t('user.avatar')">
              <a-input v-model="addUserRuleForm.avatar" placeholder="头像地址，后面改成上传图片" allow-clear />
            </a-form-item>
            <a-form-item field="email" :label="t('user.email')">
              <a-input v-model="addUserRuleForm.email" placeholder="请输入邮箱" allow-clear />
            </a-form-item>
            <a-form-item field="name" :label="t('user.name')">
              <a-input v-model="addUserRuleForm.name" placeholder="请输入昵称" ::max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="realName" :label="t('user.realName')">
              <a-input v-model="addUserRuleForm.realName" placeholder="请输入真实姓名" allow-clear />
            </a-form-item>
            <a-form-item field="telephone" :label="t('user.telephone')">
              <a-input v-model="addUserRuleForm.telephone" placeholder="请输入手机号" :max-length="{ length: 11, errorOnly: true }" show-word-limit allow-clear>
                <template #prepend>
                  +86
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="birthday" :label="t('user.birthday')">
              <a-date-picker v-model="addUserRuleForm.birthday" placeholder="请选择生日"/>
            </a-form-item>
            <a-form-item field="sex" :label="t('user.sex')">
              <a-radio-group v-model="addUserRuleForm.sex" value="number">
                <a-radio value="1">男</a-radio>
                <a-radio value="2">女</a-radio>
                <a-radio value="3">未知</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item field="remark" :label="t('user.remark')">
              <a-textarea v-model="addUserRuleForm.remark" placeholder="请输入备注" allow-clear auto-size :max-length="{ length: 200, errorOnly: true }" show-word-limit />
            </a-form-item>
          </a-form>
          <!-- TODO 表单校验 -->
        </a-col>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6"></a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
