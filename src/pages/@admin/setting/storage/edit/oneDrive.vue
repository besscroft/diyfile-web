<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import type { Storage } from '~/api/interface/storage'

const configList = defineProps(['value'])
const emit = defineEmits(['handleInput', 'handleValid'])
const { t } = useI18n()
const clientIdFormRef = ref<FormInstance>()
const clientSecretFormRef = ref<FormInstance>()
const refreshTokenFormRef = ref<FormInstance>()
const redirectUriFormRef = ref<FormInstance>()
const mountPathFormRef = ref<FormInstance>()

const list = ref<Array<Storage.StorageConfig>>([])
const client_id = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '客户端ID',
  configKey: 'client_id',
  configValue: '',
  description: 'OneDrive 客户端ID',
})
const clientIdFormRules = reactive({
  configValue: [{ required: true, message: '请输入客户端ID', trigger: 'blur' }],
})

const client_secret = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '客户端机密',
  configKey: 'client_secret',
  configValue: '',
  description: 'OneDrive 客户端机密',
})
const clientSecretFormRules = reactive({
  configValue: [{ required: true, message: '请输入客户端机密', trigger: 'blur' }],
})

const refresh_token = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '刷新令牌',
  configKey: 'refresh_token',
  configValue: '',
  description: 'OneDrive 刷新令牌',
})
const refreshTokenFormRules = reactive({
  configValue: [{ required: true, message: '请输入刷新令牌', trigger: 'blur' }],
})

const redirect_uri = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '重定向 URI',
  configKey: 'redirect_uri',
  configValue: '',
  description: 'OneDrive 重定向 URI',
})
const redirectUriFormRules = reactive({
  configValue: [{ required: true, message: '请输入重定向 URI', trigger: 'blur' }],
})

const mount_path = ref({
  id: undefined,
  storageId: undefined,
  name: '挂载路径',
  configKey: 'mount_path',
  configValue: '',
  description: 'OneDrive 挂载路径',
})
const mountPathFormRules = reactive({
  configValue: [{ required: true, message: '请输入挂载路径', trigger: 'blur' }],
})

const handleInput = (formEl: FormInstance) => {
  list.value = []
  list.value.push(client_id.value)
  list.value.push(client_secret.value)
  list.value.push(refresh_token.value)
  list.value.push(redirect_uri.value)
  list.value.push(mount_path.value)
  emit('handleInput', list.value)
  formEl.validate((valid) => {
    if (!valid) {
      emit('handleValid', true)
    } else {
      emit('handleValid', false)
    }
  })
}

onBeforeMount(() => {
  emit('handleValid', true)
  for (const item of configList.value) {
    if (item.configKey === 'client_id') {
      client_id.value = item
      if (!item.configValue) {
        emit('handleValid', false)
      }
    } else if (item.configKey === 'client_secret') {
      client_secret.value = item
      if (!item.configValue) {
        emit('handleValid', false)
      }
    } else if (item.configKey === 'refresh_token') {
      refresh_token.value = item
      if (!item.configValue) {
        emit('handleValid', false)
      }
    } else if (item.configKey === 'redirect_uri') {
      redirect_uri.value = item
      if (!item.configValue) {
        emit('handleValid', false)
      }
    } else if (item.configKey === 'mount_path') {
      mount_path.value = item
      if (!item.configValue) {
        emit('handleValid', false)
      }
    }
  }
})
</script>

<template>
  <a-form ref="clientIdFormRef" :model="client_id" :rules="clientIdFormRules" layout="vertical">
    <a-form-item field="configValue" label="客户端ID" :help="client_id.description" required>
      <a-textarea v-model="client_id.configValue" @input="handleInput(clientIdFormRef)" placeholder="请输入客户端ID" allow-clear auto-size show-word-limit
                  @clear="handleInput(clientIdFormRef)" @change="handleInput(clientIdFormRef)"/>
    </a-form-item>
  </a-form>
  <a-form ref="clientSecretFormRef" :model="client_secret" :rules="clientSecretFormRules" layout="vertical">
    <a-form-item field="configValue" label="客户端机密" :help="client_secret.description" required>
      <a-textarea v-model="client_secret.configValue" @input="handleInput(clientSecretFormRef)" placeholder="请输入客户端机密" allow-clear auto-size show-word-limit
                  @clear="handleInput(clientSecretFormRef)" @change="handleInput(clientSecretFormRef)"/>
    </a-form-item>
  </a-form>
  <a-form ref="refreshTokenFormRef" :model="refresh_token" :rules="refreshTokenFormRules" layout="vertical">
    <a-form-item field="configValue" label="刷新令牌" :help="refresh_token.description" required>
      <a-textarea v-model="refresh_token.configValue" @input="handleInput(refreshTokenFormRef)" placeholder="请输入刷新令牌" allow-clear auto-size show-word-limit
                  @clear="handleInput(refreshTokenFormRef)" @change="handleInput(refreshTokenFormRef)"/>
    </a-form-item>
  </a-form>
  <a-form ref="redirectUriFormRef" :model="redirect_uri" :rules="redirectUriFormRules" layout="vertical">
    <a-form-item field="configValue" label="重定向 URI" :help="redirect_uri.description" required>
      <a-textarea v-model="redirect_uri.configValue" @input="handleInput(redirectUriFormRef)" placeholder="请输入重定向 URI" allow-clear auto-size show-word-limit
                  @clear="handleInput(redirectUriFormRef)" @change="handleInput(redirectUriFormRef)"/>
    </a-form-item>
  </a-form>
  <a-form ref="mountPathFormRef" :model="mount_path" :rules="mountPathFormRules" layout="vertical">
    <a-form-item field="configValue" label="挂载路径" :help="mount_path.description" required>
      <a-textarea v-model="mount_path.configValue" @input="handleInput(mountPathFormRef)" placeholder="请输入挂载路径" allow-clear auto-size show-word-limit
                  @clear="handleInput(mountPathFormRef)" @change="handleInput(mountPathFormRef)"/>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>
