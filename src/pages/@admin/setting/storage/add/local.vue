<script setup lang="ts">
import type { Storage } from '~/api/interface/storage'

const emit = defineEmits(['handleInput'])
const { t } = useI18n()

const list = ref<Array<Storage.StorageConfig>>([])
const mount_path = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '挂载路径',
  configKey: 'mount_path',
  configValue: '',
  description: '本地存储挂载路径',
})

const handleInput = () => {
  list.value = []
  list.value.push(mount_path.value)
  emit('handleInput', list.value)
}
</script>

<template>
  <a-form :model="mount_path" layout="vertical">
    <a-form-item field="configValue" label="挂载路径" :help="mount_path.description" required>
      <a-textarea v-model="mount_path.configValue" @input="handleInput" placeholder="请输入挂载路径" allow-clear auto-size show-word-limit />
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
