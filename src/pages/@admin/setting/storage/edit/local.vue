<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import type { Storage } from '~/api/interface/storage'
import { storageInfo, storageUpdate } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const router = useRouter()
const { isMobile } = useDevice()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
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
  domain: '',
  mount_path: '',
})
const updateStorageData = ref<Storage.UpdateStorageRequestData>({
  /** 存储id */
  id: undefined,
  /** 存储名称 */
  name: '',
  /** 存储 key */
  storageKey: '',
  /** 存储类型 */
  type: 0,
  /** 备注 */
  remark: '',
  enable: undefined,
  configList: [],
})

const rules: FormRules = {
  name: [
    { required: true, message: '存储名称不能为空！', trigger: 'blur' },
    { max: 20, message: '存储名称长度不能大于 20', trigger: 'blur' },
  ],
  mount_path: [
    { required: true, message: '挂载路径不能为空！', trigger: 'blur' },
  ],
}

const list = ref<Array<Storage.StorageConfig>>([])
const domain = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '代理域名',
  configKey: 'domain',
  configValue: '',
  description: '本地存储访问代理域名',
})
const mount_path = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '挂载路径',
  configKey: 'mount_path',
  configValue: '',
  description: '本地存储挂载路径',
})

const handleFormData = () => {
  list.value = []
  domain.value.configValue = updateStorageForm.domain
  mount_path.value.configValue = updateStorageForm.mount_path
  list.value.push(domain.value)
  list.value.push(mount_path.value)
  updateStorageData.value.configList = list.value
}

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
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
      console.log(errors)
      message.error('请检查您的内容！')
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
        if (item.configKey === 'domain') {
          updateStorageForm.domain = item.configValue
          domain.value = item
        }
        if (item.configKey === 'mount_path') {
          updateStorageForm.mount_path = item.configValue
          mount_path.value = item
        }
      }
    }
  })
})
</script>

<template>
  <div flex grid justify-start justify-center items-center h-8>
    <div mr-auto>
      <n-icon size="22" @click="router.back()" class="cursor-pointer ml-0.25rem">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
          <path d="M26 4h2v24h-2z" fill="currentColor"></path>
          <path d="M11.414 20.586L7.828 17H22v-2H7.828l3.586-3.586L10 10l-6 6l6 6l1.414-1.414z" fill="currentColor"></path>
        </svg>
      </n-icon>
    </div>
    <div>
      <n-icon size="22" @click="handleSubmit" class="cursor-pointer mr-0.25rem">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
          <path d="M13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z" fill="currentColor"></path>
        </svg>
      </n-icon>
    </div>
  </div>
  <div content-style="padding: 0;" h-full w-full mt-1 of-auto onscroll style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-grid cols="5" item-responsive responsive="screen">
      <n-grid-item offset="0 m:1 l:1" span="5 m:3 l:3">
        <n-form ref="formRef" :model="updateStorageForm" :rules="rules">
          <n-form-item :label="t('storage.name')" path="name" required>
            <n-input v-model:value="updateStorageForm.name" placeholder="请输入存储名称" clearable show-count :maxlength="20" />
          </n-form-item>
          <n-form-item label="storageKey" path="storageKey" required>
            <n-input v-model:value="updateStorageForm.storageKey" disabled />
          </n-form-item>
          <n-form-item label="代理域名" path="domain">
            <n-input v-model:value="updateStorageForm.domain" :placeholder="domain.description" clearable />
          </n-form-item>
          <n-form-item label="挂载路径" path="mount_path" required>
            <n-input v-model:value="updateStorageForm.mount_path" :placeholder="mount_path.description" clearable />
          </n-form-item>
          <n-form-item :label="t('storage.remark')" path="remark">
            <n-input v-model:value="updateStorageForm.remark" type="textarea" placeholder="请输入备注" maxlength="160" show-count />
          </n-form-item>
        </n-form>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
