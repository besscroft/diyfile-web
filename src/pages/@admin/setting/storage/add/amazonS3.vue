<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { Storage } from '~/api/interface/storage'
import { getAwsRegions, storageAdd } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const loading = ref<boolean>(false)
const regionList = ref<Array<string>>()
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

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '存储名称不能为空！', trigger: 'blur' },
    { max: 20, message: '存储名称长度不能大于 20', trigger: 'blur' },
  ],
  storageKey: [
    { required: true, message: '存储 key 不能为空！', trigger: 'blur' },
    { max: 20, message: '存储 key长度不能大于 20', trigger: 'blur' },
  ],
  endpoint: [
    { required: true, message: 'Endpoint 不能为空！', trigger: 'blur' },
  ],
  region: [
    { required: true, message: 'Region 不能为空！', trigger: 'blur' },
  ],
  accessKey: [
    { required: true, message: 'AccessKey 不能为空！', trigger: 'blur' },
  ],
  secretKey: [
    { required: true, message: 'SecretKey 不能为空！', trigger: 'blur' },
  ],
  bucketName: [
    { required: true, message: 'BucketName 不能为空！', trigger: 'blur' },
  ],
  mount_path: [
    { required: true, message: '挂载路径不能为空！', trigger: 'blur' },
  ],
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

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      addStorageData.value.name = addStorageForm.name
      addStorageData.value.storageKey = addStorageForm.storageKey
      addStorageData.value.remark = addStorageForm.remark
      handleFormData()
      storageAdd(addStorageData.value).then((res) => {
        if (res.code === ResultEnum.SUCCESS) {
          ElMessage.info(res.message)
          router.push('/@admin/setting/storage')
        }
      }).catch((err) => {
        ElMessage.error(err.message)
      })
    } else {
      return false
    }
  })
}

onMounted(() => {
  loading.value = true
  getAwsRegions().then((res) => {
    if (res.code === ResultEnum.SUCCESS && Array.isArray(res.data)) {
      regionList.value = res.data
    }
    loading.value = false
  }).catch((err) => {
    ElMessage.error(err.message)
    loading.value = false
  })
})
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
    <el-row :gutter="10">
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
      <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
        <el-form
          ref="ruleFormRef"
          label-position="top"
          :model="addStorageForm"
          :rules="rules"
        >
          <el-form-item :label="t('storage.name')" prop="name" required>
            <el-input v-model="addStorageForm.name" placeholder="请输入存储名称" maxlength="20" show-word-limit type="text" clearable />
          </el-form-item>
          <el-form-item label="storageKey" prop="storageKey" required>
            <el-input v-model="addStorageForm.storageKey" placeholder="请输入 storageKey" maxlength="20" show-word-limit type="text" clearable />
          </el-form-item>
          <el-form-item label="BucketName" prop="bucketName" required>
            <el-input v-model="addStorageForm.bucketName" placeholder="AWS S3 Bucket 名称" clearable />
            <p class="text-xs">{{ bucketName.description }}</p>
          </el-form-item>
          <el-form-item label="Endpoint" prop="endpoint" required>
            <el-input v-model="addStorageForm.endpoint" placeholder="请输入Bucket 地域的 Endpoint" clearable />
            <p class="text-xs">{{ endpoint.description }}</p>
          </el-form-item>
          <el-form-item label="Region" prop="region" required>
            <el-input v-model="addStorageForm.region" placeholder="请输入Bucket 地域的 Region" clearable />
            <p class="text-xs">{{ region.description }}</p>
          </el-form-item>
          <el-form-item label="AccessKey" prop="accessKey" required>
            <el-input v-model="addStorageForm.accessKey" placeholder="请输入 AccessKey" clearable />
            <p class="text-xs">{{ accessKey.description }}</p>
          </el-form-item>
          <el-form-item label="SecretKey" prop="secretKey" required>
            <el-input v-model="addStorageForm.secretKey" placeholder="请输入 SecretKey" clearable />
            <p class="text-xs">{{ secretKey.description }}</p>
          </el-form-item>
          <el-form-item label="挂载路径" prop="mount_path" required>
            <el-input v-model="addStorageForm.mount_path" placeholder="请输入挂载路径" clearable />
            <p class="text-xs">{{ mount_path.description }}</p>
          </el-form-item>
          <el-form-item :label="t('storage.remark')">
            <el-input v-model="addStorageForm.remark" placeholder="请输入备注" maxlength="200" show-word-limit type="textarea" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
    </el-row>
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
