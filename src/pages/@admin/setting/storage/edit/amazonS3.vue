<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { FormInstance } from '@arco-design/web-vue'
import type { Storage } from '~/api/interface/storage'
import { storageInfo, storageUpdate } from '~/api/modules/storage'

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
  endpoint: '',
  region: '',
  accessKey: '',
  secretKey: '',
  bucketName: '',
  mount_path: '',
})
const updateStorageData = ref<Storage.UpdateStorageRequestData>({
  /** 存储id */
  id: undefined,
  /** 存储名称 */
  name: '',
  /** 存储类型 */
  type: 2,
  /** 存储 key */
  storageKey: '',
  /** 备注 */
  remark: '',
  enable: undefined,
  configList: [],
})

const list = ref<Array<Storage.StorageConfig>>([])
const endpoint = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'Endpoint',
  configKey: 'endpoint',
  configValue: '',
  description: '填写Bucket所在地域对应的Endpoint。',
})
const region = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'Region',
  configKey: 'region',
  configValue: '',
  description: '填写Bucket所在地域对应的Region。',
})
const accessKey = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'AccessKey',
  configKey: 'accessKey',
  configValue: '',
  description: 'AWS 账号 AccessKey',
})
const secretKey = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'SecretKey',
  configKey: 'secretKey',
  configValue: '',
  description: 'AWS 账号 SecretKey',
})
const bucketName = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'BucketName',
  configKey: 'bucketName',
  configValue: '',
  description: 'AWS S3 Bucket 名称',
})
const mount_path = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '挂载路径',
  configKey: 'mount_path',
  configValue: '',
  description: 'AWS S3 挂载路径',
})

const handleFormData = () => {
  list.value = []
  endpoint.value.configValue = updateStorageForm.endpoint
  region.value.configValue = updateStorageForm.region
  accessKey.value.configValue = updateStorageForm.accessKey
  secretKey.value.configValue = updateStorageForm.secretKey
  bucketName.value.configValue = updateStorageForm.bucketName
  mount_path.value.configValue = updateStorageForm.mount_path
  list.value.push(endpoint.value)
  list.value.push(region.value)
  list.value.push(accessKey.value)
  list.value.push(secretKey.value)
  list.value.push(bucketName.value)
  list.value.push(mount_path.value)
  updateStorageData.value.configList = list.value
}

const handleSubmit = (formEl: FormInstance) => {
  Message.info('开发中！')
  formEl.validate((valid) => {
    if ((!valid)) {
      updateStorageData.value.name = updateStorageForm.name
      updateStorageData.value.storageKey = updateStorageForm.storageKey
      updateStorageData.value.remark = updateStorageForm.remark
      handleFormData()
      storageUpdate(updateStorageData.value).then((res) => {
        if (res.code === 200) {
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
    if (res.code === 200) {
      updateStorageForm.id = res.data.id
      updateStorageForm.name = res.data.name
      updateStorageForm.storageKey = res.data.storageKey
      updateStorageForm.remark = res.data.remark
      updateStorageForm.enable = res.data.enable
      const configList = res.data.configList
      for (const item of configList) {
        if (item.configKey === 'mount_path') {
          updateStorageForm.mount_path = item.configValue
          mount_path.value = item
        } else if (item.configKey === 'endpoint') {
          updateStorageForm.endpoint = item.configValue
          endpoint.value = item
        } else if (item.configKey === 'accessKey') {
          updateStorageForm.accessKey = item.configValue
          accessKey.value = item
        } else if (item.configKey === 'secretKey') {
          updateStorageForm.secretKey = item.configValue
          secretKey.value = item
        } else if (item.configKey === 'bucketName') {
          updateStorageForm.bucketName = item.configValue
          bucketName.value = item
        } else if (item.configKey === 'region') {
          updateStorageForm.region = item.configValue
          region.value = item
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
            <a-form-item field="endpoint" label="Endpoint" :help="endpoint.description" required>
              <a-textarea v-model="updateStorageForm.endpoint" placeholder="请输入Bucket 地域的 Endpoint" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="region" label="Region" :help="region.description" required>
              <a-textarea v-model="updateStorageForm.region" placeholder="请输入Bucket 地域的 Region" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="accessKey" label="AccessKey" :help="accessKey.description" required>
              <a-textarea v-model="updateStorageForm.accessKey" placeholder="请输入 AccessKey" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="secretKey" label="SecretKey" :help="secretKey.description" required>
              <a-textarea v-model="updateStorageForm.secretKey" placeholder="请输入 SecretKey" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="bucketName" label="BucketName" :help="bucketName.description" required>
              <a-textarea v-model="updateStorageForm.bucketName" placeholder="AWS S3 Bucket 名称" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="mount_path" label="挂载路径" :help="mount_path.description" required>
              <a-textarea v-model="updateStorageForm.mount_path" placeholder="请输入挂载路径" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="remark" :label="t('storage.remark')">
              <a-textarea v-model="updateStorageForm.remark" placeholder="请输入备注" allow-clear auto-size :max-length="{ length: 200, errorOnly: true }" show-word-limit />
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
      </a-row>
      切勿以纯文本、代码存储库或代码形式存储访问密钥。
      不再需要时请禁用或删除访问密钥。
      启用最低权限。
      定期轮换访问密钥。
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
