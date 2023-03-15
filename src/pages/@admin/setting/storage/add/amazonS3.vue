<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { FormInstance } from '@arco-design/web-vue'
import type { Storage } from '~/api/interface/storage'
import { getAwsRegions, storageAdd } from '~/api/modules/storage'

const { t } = useI18n()
const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref<boolean>(false)
const regionList = ref<Array<String>>()
const addStorageForm = reactive({
  /** 存储名称 */
  name: '',
  /** 存储 key */
  storageKey: '',
  /** 备注 */
  remark: '',
  endpoint: '',
  region: '',
  accessKey: '',
  secretKey: '',
  bucketName: '',
  mount_path: '',
})
const addStorageData = ref<Storage.AddStorageRequestData>({
  /** 存储名称 */
  name: '',
  /** 存储类型 */
  type: 3,
  /** 存储 key */
  storageKey: '',
  /** 备注 */
  remark: '',
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
  endpoint.value.configValue = addStorageForm.endpoint
  region.value.configValue = addStorageForm.region
  accessKey.value.configValue = addStorageForm.accessKey
  secretKey.value.configValue = addStorageForm.secretKey
  bucketName.value.configValue = addStorageForm.bucketName
  mount_path.value.configValue = addStorageForm.mount_path
  list.value.push(endpoint.value)
  list.value.push(region.value)
  list.value.push(accessKey.value)
  list.value.push(secretKey.value)
  list.value.push(bucketName.value)
  list.value.push(mount_path.value)
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

onMounted(() => {
  loading.value = true
  getAwsRegions().then((res) => {
    regionList.value = res.data
    loading.value = false
  }).catch((err) => {
    Message.error(err.message)
    loading.value = false
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
          <a-form ref="formRef" :model="addStorageForm" layout="vertical">
            <a-form-item field="name" :label="t('storage.name')" required>
              <a-input v-model="addStorageForm.name" placeholder="请输入存储名称" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="storageKey" label="storageKey" required>
              <a-input v-model="addStorageForm.storageKey" placeholder="请输入 storageKey" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="endpoint" label="Endpoint" :help="endpoint.description" required>
              <a-textarea v-model="addStorageForm.endpoint" placeholder="请输入Bucket 地域的 Endpoint" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="region" label="Region" :help="region.description" required>
              <a-select
                placeholder="请选择 Bucket 地域的 Region"
                :loading="loading"
                v-model="addStorageForm.region"
                :options="regionList"
              />
            </a-form-item>
            <a-form-item field="accessKey" label="AccessKey" :help="accessKey.description" required>
              <a-textarea v-model="addStorageForm.accessKey" placeholder="请输入 AccessKey" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="secretKey" label="SecretKey" :help="secretKey.description" required>
              <a-textarea v-model="addStorageForm.secretKey" placeholder="请输入 SecretKey" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="bucketName" label="BucketName" :help="bucketName.description" required>
              <a-textarea v-model="addStorageForm.bucketName" placeholder="AWS S3 Bucket 名称" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="mount_path" label="挂载路径" :help="mount_path.description" required>
              <a-textarea v-model="addStorageForm.mount_path" placeholder="请输入挂载路径" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="remark" :label="t('storage.remark')">
              <a-textarea v-model="addStorageForm.remark" placeholder="请输入备注" allow-clear auto-size :max-length="{ length: 200, errorOnly: true }" show-word-limit />
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
