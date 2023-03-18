<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { FormInstance } from '@arco-design/web-vue'
import type { Storage } from '~/api/interface/storage'
import { storageAdd } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const router = useRouter()
const formRef = ref<FormInstance>()
const addStorageForm = reactive({
  /** 存储名称 */
  name: '',
  /** 存储 key */
  storageKey: '',
  /** 备注 */
  remark: '',
  client_id: '',
  client_secret: '',
  refresh_token: '',
  redirect_uri: '',
  mount_path: '',
  proxy_url: '',
})
const addStorageData = ref<Storage.AddStorageRequestData>({
  /** 存储名称 */
  name: '',
  /** 存储类型 */
  type: 1,
  /** 存储 key */
  storageKey: '',
  /** 备注 */
  remark: '',
  configList: [],
})

const list = ref<Array<Storage.StorageConfig>>([])
const client_id = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '客户端ID',
  configKey: 'client_id',
  configValue: '',
  description: 'OneDrive 客户端ID',
})
const client_secret = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '客户端机密',
  configKey: 'client_secret',
  configValue: '',
  description: 'OneDrive 客户端机密',
})
const refresh_token = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '刷新令牌',
  configKey: 'refresh_token',
  configValue: '',
  description: 'OneDrive 刷新令牌',
})
const redirect_uri = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '重定向 URI',
  configKey: 'redirect_uri',
  configValue: '',
  description: 'OneDrive 重定向 URI',
})
const mount_path = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '挂载路径',
  configKey: 'mount_path',
  configValue: '',
  description: 'OneDrive 挂载路径',
})
const proxy_url = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '代理地址',
  configKey: 'proxy_url',
  configValue: '',
  description: 'Cloudflare 代理地址',
})

const handleFormData = () => {
  list.value = []
  client_id.value.configValue = addStorageForm.client_id
  client_secret.value.configValue = addStorageForm.client_secret
  refresh_token.value.configValue = addStorageForm.refresh_token
  redirect_uri.value.configValue = addStorageForm.redirect_uri
  mount_path.value.configValue = addStorageForm.mount_path
  proxy_url.value.configValue = addStorageForm.proxy_url
  list.value.push(client_id.value)
  list.value.push(client_secret.value)
  list.value.push(refresh_token.value)
  list.value.push(redirect_uri.value)
  list.value.push(mount_path.value)
  list.value.push(proxy_url.value)
  addStorageData.value.configList = list.value
}

const handleSubmit = (formEl: FormInstance) => {
  formEl.validate((valid) => {
    if ((!valid)) {
      addStorageData.value.name = addStorageForm.name
      addStorageData.value.storageKey = addStorageForm.storageKey
      addStorageData.value.remark = addStorageForm.remark
      handleFormData()
      storageAdd(addStorageData.value).then((res) => {
        if (res.code === ResultEnum.SUCCESS) {
          Message.info(res.message)
          router.push('/@admin/setting/storage')
        }
      }).catch((err) => {
        Message.error(err.message)
      })
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
          <a-button type="primary" @click="handleSubmit(formRef)">{{ t('button.submit') }}</a-button>
        </a-space>
      </template>
      <GoBack />
      <br>
      <a-row>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
        <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-form ref="formRef" :model="addStorageForm" layout="vertical">
            <a-form-item field="name" :label="t('storage.name')" required>
              <a-input v-model="addStorageForm.name" placeholder="请输入存储名称" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="storageKey" label="storageKey" required>
              <a-input v-model="addStorageForm.storageKey" placeholder="请输入 storageKey" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="client_id" label="客户端ID" :help="client_id.description" required>
              <a-textarea v-model="addStorageForm.client_id" placeholder="请输入客户端ID" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="client_secret" label="客户端机密" :help="client_secret.description" required>
              <a-textarea v-model="addStorageForm.client_secret" placeholder="请输入客户端机密" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="refresh_token" label="刷新令牌" :help="refresh_token.description" required>
              <a-textarea v-model="addStorageForm.refresh_token" placeholder="请输入刷新令牌" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="redirect_uri" label="重定向 URI" :help="redirect_uri.description" required>
              <a-textarea v-model="addStorageForm.redirect_uri" placeholder="请输入重定向 URI" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="mount_path" label="挂载路径" :help="mount_path.description" required>
              <a-textarea v-model="addStorageForm.mount_path" placeholder="请输入挂载路径" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="proxy_url" label="代理地址" :help="proxy_url.description">
              <a-textarea v-model="addStorageForm.proxy_url" placeholder="请输入代理地址" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="remark" :label="t('storage.remark')">
              <a-textarea v-model="addStorageForm.remark" placeholder="请输入备注" allow-clear auto-size :max-length="{ length: 200, errorOnly: true }" show-word-limit />
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
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
