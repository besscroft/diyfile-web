<script setup lang="ts">
// 表单参数
import type { Storage } from '~/api/interface/storage'

const props = defineProps(['value'])
const emit = defineEmits(['handleInput'])
const { t } = useI18n()

const list = ref<Array<Storage.StorageConfig>>([])
const client_secret = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '客户端机密',
  config_key: 'client_secret',
  config_value: '',
  description: 'OneDrive 客户端机密',
})

const handleInput = () => {
  list.value = []
  list.value.push(client_secret.value)
  emit('handleInput', list.value)
}
</script>

<template>
  <a-form-item field="client_secret" label="客户端机密">
    <a-textarea v-model="client_secret.config_value" @input="handleInput" placeholder="请输入客户端机密" allow-clear auto-size :max-length="{ length: 200, errorOnly: true }" show-word-limit />
  </a-form-item>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
