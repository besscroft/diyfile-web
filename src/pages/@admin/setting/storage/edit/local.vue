<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import type { Storage } from '~/api/interface/storage'

const configList = defineProps(['value'])
const emit = defineEmits(['handleInput', 'handleValid'])
const { t } = useI18n()
const formRef = ref<FormInstance>()
const formRules = reactive({
  configValue: [{ required: true, message: '请输入挂载路径', trigger: 'blur' }],
})

const list = ref<Array<Storage.StorageConfig>>([])
const mount_path = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '挂载路径',
  configKey: 'mount_path',
  configValue: '',
  description: '本地存储挂载路径',
})

const handleInput = (formEl: FormInstance) => {
  list.value = []
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
    if (item.configKey === 'mount_path') {
      mount_path.value = item
      if (!item.configValue) {
        emit('handleValid', false)
      }
    }
  }
})
</script>

<template>
  <a-form ref="formRef" :rules="formRules" :model="mount_path" layout="vertical">
    <a-form-item field="configValue" label="挂载路径" :help="mount_path.description" required>
      <a-textarea v-model="mount_path.configValue" @input="handleInput(formRef)" placeholder="请输入挂载路径" allow-clear auto-size show-word-limit
                  @clear="handleInput(formRef)" @change="handleInput(formRef)"
      />
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>
