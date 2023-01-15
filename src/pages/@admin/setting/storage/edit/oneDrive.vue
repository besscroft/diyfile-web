<script setup lang="ts">
import type { Storage } from '~/api/interface/storage'

const configList = defineProps(['value'])
const emit = defineEmits(['handleInput'])
const { t } = useI18n()

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

const handleInput = () => {
  list.value = []
  list.value.push(client_id.value)
  list.value.push(client_secret.value)
  list.value.push(refresh_token.value)
  list.value.push(redirect_uri.value)
  list.value.push(mount_path.value)
  emit('handleInput', list.value)
}

onBeforeMount(() => {
  for (const item of configList.value) {
    if (item.configKey === 'client_id') {
      client_id.value = item
    } else if (item.configKey === 'client_secret') {
      client_secret.value = item
    } else if (item.configKey === 'refresh_token') {
      refresh_token.value = item
    } else if (item.configKey === 'redirect_uri') {
      redirect_uri.value = item
    } else if (item.configKey === 'mount_path') {
      mount_path.value = item
    }
  }
})
</script>

<template>
  <a-form :model="client_id" layout="vertical">
    <a-form-item field="configValue" label="客户端ID" :help="client_id.description" required>
      <a-textarea v-model="client_id.configValue" @input="handleInput" placeholder="请输入客户端ID" allow-clear auto-size show-word-limit />
    </a-form-item>
  </a-form>
  <a-form :model="client_secret" layout="vertical">
    <a-form-item field="configValue" label="客户端机密" :help="client_secret.description" required>
      <a-textarea v-model="client_secret.configValue" @input="handleInput" placeholder="请输入客户端机密" allow-clear auto-size show-word-limit />
    </a-form-item>
  </a-form>
  <a-form :model="refresh_token" layout="vertical">
    <a-form-item field="configValue" label="刷新令牌" :help="refresh_token.description" required>
      <a-textarea v-model="refresh_token.configValue" @input="handleInput" placeholder="请输入刷新令牌" allow-clear auto-size show-word-limit />
    </a-form-item>
  </a-form>
  <a-form :model="redirect_uri" layout="vertical">
    <a-form-item field="configValue" label="重定向 URI" :help="redirect_uri.description" required>
      <a-textarea v-model="redirect_uri.configValue" @input="handleInput" placeholder="请输入重定向 URI" allow-clear auto-size show-word-limit />
    </a-form-item>
  </a-form>
  <a-form :model="mount_path" layout="vertical">
    <a-form-item field="configValue" label="挂载路径" :help="mount_path.description" required>
      <a-textarea v-model="mount_path.configValue" @input="handleInput" placeholder="请输入挂载路径" allow-clear auto-size show-word-limit />
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>
