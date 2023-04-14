<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { Storage } from '~/api/interface/storage'
import { storageInfo, storageUpdate } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const router = useRouter()
const message = useMessage()
const ruleFormRef = ref<FormInstance>()
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

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '存储名称不能为空！', trigger: 'blur' },
    { max: 20, message: '存储名称长度不能大于 20', trigger: 'blur' },
  ],
  client_id: [
    { required: true, message: '客户端 ID 不能为空！', trigger: 'blur' },
  ],
  client_secret: [
    { required: true, message: '客户端机密不能为空！', trigger: 'blur' },
  ],
  refresh_token: [
    { required: true, message: '刷新令牌不能为空！', trigger: 'blur' },
  ],
  redirect_uri: [
    { required: true, message: '重定向 URI 不能为空！', trigger: 'blur' },
  ],
  mount_path: [
    { required: true, message: '挂载路径不能为空！', trigger: 'blur' },
  ],
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

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      updateStorageData.value.id = updateStorageForm.id
      updateStorageData.value.name = updateStorageForm.name
      updateStorageData.value.storageKey = updateStorageForm.storageKey
      updateStorageData.value.enable = updateStorageForm.enable
      updateStorageData.value.remark = updateStorageForm.remark
      handleFormData()
      storageUpdate(updateStorageData.value).then((res) => {
        if (res.code === ResultEnum.SUCCESS) {
          message.success(res.message)
          router.push('/@admin/setting/storage')
        }
      }).catch((err) => {
        message.error(err.message)
      })
    } else {
      return false
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
  <n-card content-style="padding: 0;" class="my-0.5">
    <n-page-header :title="t('tip.cardTitle')" class="mx-0.5"  @back="router.back()">
      <template #extra>
        <div class="flex items-center">
          <v-btn icon="done" variant="text" size="x-small" @click="handleSubmit(ruleFormRef)" />
        </div>
      </template>
    </n-page-header>
  </n-card>
  <n-card content-style="padding: 0.5rem;" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <el-row :gutter="10">
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
      <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
        <el-form
          ref="ruleFormRef"
          label-position="top"
          :model="updateStorageForm"
          :rules="rules"
        >
          <el-form-item :label="t('storage.name')" prop="name" required>
            <el-input v-model="updateStorageForm.name" placeholder="请输入存储名称" maxlength="20" show-word-limit type="text" clearable />
          </el-form-item>
          <el-form-item label="storageKey">
            <el-input v-model="updateStorageForm.storageKey" disabled />
          </el-form-item>
          <el-form-item label="客户端ID" prop="client_id" required>
            <el-input v-model="updateStorageForm.client_id" placeholder="请输入客户端ID" clearable />
            <p class="text-xs">{{ client_id.description }}</p>
          </el-form-item>
          <el-form-item label="客户端机密" prop="client_secret" required>
            <el-input v-model="updateStorageForm.client_secret" placeholder="请输入客户端机密" clearable />
            <p class="text-xs">{{ client_secret.description }}</p>
          </el-form-item>
          <el-form-item label="刷新令牌" prop="refresh_token" required>
            <el-input v-model="updateStorageForm.refresh_token" placeholder="请输入刷新令牌" clearable />
            <p class="text-xs">{{ refresh_token.description }}</p>
          </el-form-item>
          <el-form-item label="重定向 URI" prop="redirect_uri" required>
            <el-input v-model="updateStorageForm.redirect_uri" placeholder="请输入重定向 URI" clearable />
            <p class="text-xs">{{ redirect_uri.description }}</p>
          </el-form-item>
          <el-form-item label="挂载路径" prop="mount_path" required>
            <el-input v-model="updateStorageForm.mount_path" placeholder="请输入挂载路径" clearable />
            <p class="text-xs">{{ mount_path.description }}</p>
          </el-form-item>
          <el-form-item label="代理地址">
            <el-input v-model="updateStorageForm.proxy_url" placeholder="请输入代理地址" clearable />
            <p class="text-xs">{{ proxy_url.description }}</p>
          </el-form-item>
          <el-form-item :label="t('storage.remark')">
            <el-input v-model="updateStorageForm.remark" placeholder="请输入备注" maxlength="200" show-word-limit type="textarea" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
    </el-row>
  </n-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
