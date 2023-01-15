<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { storageAdd } from '~/api/modules/storage'
import type { Storage } from '~/api/interface/storage'
import Local from '~/pages/@admin/setting/storage/add/local.vue'
import OneDrive from '~/pages/@admin/setting/storage/add/oneDrive.vue'

const router = useRouter()
const { t } = useI18n()

const addStorageForm = reactive<Storage.AddStorageRequestData>({
  /** 存储名称 */
  name: '',
  /** 存储类型 */
  type: undefined,
  /** 备注 */
  remark: '',
  configList: [],
})

const handleInput = (list: Array<Storage.StorageConfig>) => {
  addStorageForm.configList = []
  addStorageForm.configList = list
}

const handleChange = () => {
  addStorageForm.configList = []
}

const handleSubmit = () => {
  storageAdd(addStorageForm).then((res) => {
    if (res.code === 200) {
      Message.info(res.message)
      router.push('/@admin/setting/storage')
    }
  })
}
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
          <a-button type="primary" @click="handleSubmit">{{ t('button.submit') }}</a-button>
        </a-space>
      </template>
      <icon-arrow-left @click="router.back()"/>
      <br/>
      <a-row>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6"></a-col>
        <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-form :model="addStorageForm" layout="vertical">
            <a-form-item field="name" :label="t('storage.name')" required>
              <a-input v-model="addStorageForm.name" placeholder="请输入存储名称" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="type" :label="t('storage.type')" required>
              <a-select v-model="addStorageForm.type" placeholder="请选择存储类型" @change="handleChange" allow-clear>
                <a-option :value="0">本地存储</a-option>
                <a-option :value="1">OneDrive</a-option>
                <a-option :value="99" disabled>更多存储支持中</a-option>
              </a-select>
            </a-form-item>
            <Local v-if="addStorageForm.type === 0" @handleInput="handleInput" />
            <OneDrive v-if="addStorageForm.type === 1" @handleInput="handleInput" />
            <a-form-item field="remark" :label="t('storage.remark')">
              <a-textarea v-model="addStorageForm.remark" placeholder="请输入备注" allow-clear auto-size :max-length="{ length: 200, errorOnly: true }" show-word-limit />
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
