<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { FormInstance } from '@arco-design/web-vue'
import type { Storage } from '~/api/interface/storage'
import { storageInfo, storageUpdate } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const router = useRouter()
const formRef = ref<FormInstance>()
const updateStorageForm = reactive({
  /** 存储id */
  id: undefined,
  /** 存储名称 */
  name: '',
  /** 存储 key */
  storageKey: '',
  /** 备注 */
  remark: '',
  enable: undefined,
  client_id: '',
  client_secret: '',
  refresh_token: '',
  redirect_uri: '',
  mount_path: '',
  proxy_url: '',
})
const updateStorageData = ref<Storage.UpdateStorageRequestData>({
  /** 存储id */
  id: undefined,
  /** 存储名称 */
  name: '',
  /** 存储 key */
  storageKey: '',
  /** 存储类型 */
  type: 1,
  /** 备注 */
  remark: '',
  enable: undefined,
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
const mount_path = ref({
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
  client_id.value.configValue = updateStorageForm.client_id
  client_secret.value.configValue = updateStorageForm.client_secret
  refresh_token.value.configValue = updateStorageForm.refresh_token
  redirect_uri.value.configValue = updateStorageForm.redirect_uri
  mount_path.value.configValue = updateStorageForm.mount_path
  proxy_url.value.configValue = updateStorageForm.proxy_url
  list.value.push(client_id.value)
  list.value.push(client_secret.value)
  list.value.push(refresh_token.value)
  list.value.push(redirect_uri.value)
  list.value.push(mount_path.value)
  list.value.push(proxy_url.value)
  updateStorageData.value.configList = list.value
}

const handleSubmit = (formEl: FormInstance) => {
  formEl.validate((valid) => {
    if ((!valid)) {
      updateStorageData.value.id = updateStorageForm.id
      updateStorageData.value.name = updateStorageForm.name
      updateStorageData.value.storageKey = updateStorageForm.storageKey
      updateStorageData.value.enable = updateStorageForm.enable
      updateStorageData.value.remark = updateStorageForm.remark
      handleFormData()
      storageUpdate(updateStorageData.value).then((res) => {
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

onBeforeMount(() => {
  const id = Number(router.currentRoute.value.query.id)
  storageInfo(id).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      updateStorageForm.id = res.data.id
      updateStorageForm.name = res.data.name
      updateStorageForm.storageKey = res.data.storageKey
      updateStorageForm.remark = res.data.remark
      updateStorageForm.enable = res.data.enable
      const configList = res.data.configList
      for (const item of configList) {
        if (item.configKey === 'client_id') {
          updateStorageForm.client_id = item.configValue
          client_id.value = item
        } else if (item.configKey === 'client_secret') {
          updateStorageForm.client_secret = item.configValue
          client_secret.value = item
        } else if (item.configKey === 'refresh_token') {
          updateStorageForm.refresh_token = item.configValue
          refresh_token.value = item
        } else if (item.configKey === 'redirect_uri') {
          updateStorageForm.redirect_uri = item.configValue
          redirect_uri.value = item
        } else if (item.configKey === 'mount_path') {
          updateStorageForm.mount_path = item.configValue
          mount_path.value = item
        } else if (item.configKey === 'proxy_url') {
          updateStorageForm.proxy_url = item.configValue
          proxy_url.value = item
        }
      }
    }
  })
})
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
          <a-form ref="formRef" :model="updateStorageForm" layout="vertical">
            <a-form-item field="name" :label="t('storage.name')" required>
              <a-input v-model="updateStorageForm.name" placeholder="请输入存储名称" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="storageKey" label="storageKey(不支持修改)" disabled>
              <a-input v-model="updateStorageForm.storageKey" />
            </a-form-item>
            <a-form-item field="client_id" label="客户端ID" :help="client_id.description" required>
              <a-textarea v-model="updateStorageForm.client_id" placeholder="请输入客户端ID" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="client_secret" label="客户端机密" :help="client_secret.description" required>
              <a-textarea v-model="updateStorageForm.client_secret" placeholder="请输入客户端机密" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="refresh_token" label="刷新令牌" :help="refresh_token.description" required>
              <a-textarea v-model="updateStorageForm.refresh_token" placeholder="请输入刷新令牌" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="redirect_uri" label="重定向 URI" :help="redirect_uri.description" required>
              <a-textarea v-model="updateStorageForm.redirect_uri" placeholder="请输入重定向 URI" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="mount_path" label="挂载路径" :help="mount_path.description" required>
              <a-textarea v-model="updateStorageForm.mount_path" placeholder="请输入挂载路径" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="proxy_url" label="代理地址" :help="proxy_url.description">
              <a-textarea v-model="updateStorageForm.proxy_url" placeholder="请输入代理地址" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="remark" :label="t('storage.remark')">
              <a-textarea v-model="updateStorageForm.remark" placeholder="请输入备注" allow-clear auto-size :max-length="{ length: 200, errorOnly: true }" show-word-limit />
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
