<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import { storageInfo, storageUpdate } from '~/api/modules/storage'
import type { Storage } from '~/api/interface/storage'
import Local from '~/pages/@admin/setting/storage/edit/local.vue'
import OneDrive from '~/pages/@admin/setting/storage/edit/oneDrive.vue'

const router = useRouter()
const { t } = useI18n()
const formRef = ref<FormInstance>()
const formRules = reactive({
  name: [{ required: true, message: '请输入存储名称', trigger: 'blur' }],
})
const validate = ref<boolean>(false)

const updateStorageForm = reactive<Storage.UpdateStorageRequestData>({
  /** 存储id */
  id: undefined,
  /** 存储名称 */
  name: '',
  /** 存储类型 */
  type: '',
  /** 备注 */
  remark: '',
  enable: undefined,
  configList: [],
})

const handleInput = (list: Array<Storage.StorageConfig>) => {
  updateStorageForm.configList = []
  updateStorageForm.configList = list
}

const handleValid = (flag: boolean) => {
  validate.value = flag
}

const handleSubmit = (formEl: FormInstance) => {
  formEl.validate((valid) => {
    if ((!valid && validate.value)) {
      storageUpdate(updateStorageForm).then((res) => {
        if (res.code === 200) {
          Message.info(res.message)
          router.push('/@admin/setting/storage')
        }
      })
    }
  })
}

onMounted(() => {
  const id = Number(router.currentRoute.value.query.id)
  storageInfo(id).then((res) => {
    if (res.code === 200) {
      updateStorageForm.id = res.data.id
      updateStorageForm.name = res.data.name
      updateStorageForm.type = res.data.type
      updateStorageForm.remark = res.data.remark
      updateStorageForm.enable = res.data.enable
      updateStorageForm.configList = res.data.configList
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
    <a-card hoverable :style="{ height: '100%' }" :title="t('tip.cardTitle')">
      <template #extra>
        <a-space>
          <a-button type="primary" html-type="submit" @click="handleSubmit(formRef)">{{ t('button.submit') }}</a-button>
        </a-space>
      </template>
      <icon-arrow-left @click="router.back()" class="cursor-pointer"/>
      <br/>
      <a-row>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6"></a-col>
        <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-form ref="formRef" :rules="formRules" :model="updateStorageForm" layout="vertical">
            <a-form-item field="name" :label="t('storage.name')" required>
              <a-input v-model="updateStorageForm.name" placeholder="请输入存储名称" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="type" :label="t('storage.type')">
              <a-select v-model="updateStorageForm.type" placeholder="请选择存储类型" disabled>
                <a-option :value="0">本地存储</a-option>
                <a-option :value="1">OneDrive</a-option>
              </a-select>
            </a-form-item>
            <Local v-if="updateStorageForm.type === 0" @handleInput="handleInput" @handleValid="handleValid" :value="updateStorageForm.configList" />
            <OneDrive v-if="updateStorageForm.type === 1" @handleInput="handleInput" @handleValid="handleValid" :value="updateStorageForm.configList" />
            <a-form-item field="remark" :label="t('storage.remark')">
              <a-textarea v-model="updateStorageForm.remark" placeholder="请输入备注" allow-clear auto-size :max-length="{ length: 200, errorOnly: true }" show-word-limit />
            </a-form-item>
          </a-form>
          <!-- TODO 表单校验 -->
        </a-col>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6"></a-col>
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
