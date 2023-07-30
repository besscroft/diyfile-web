<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import type { Storage } from '~/api/interface/storage'
import { storageAdd } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const router = useRouter()
const { isMobile } = useDevice()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const addStorageForm = reactive({
  /** 存储名称 */
  name: '',
  /** 存储 key */
  storageKey: '',
  /** 备注 */
  remark: '',
  endpoint: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucketName: '',
  mount_path: '',
})
const addStorageData = ref<Storage.AddStorageRequestData>({
  /** 存储名称 */
  name: '',
  /** 存储类型 */
  type: 2,
  /** 存储 key */
  storageKey: '',
  /** 备注 */
  remark: '',
  configList: [],
})

const rules: FormRules = {
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
  accessKeyId: [
    { required: true, message: 'AccessKeyId 不能为空！', trigger: 'blur' },
  ],
  accessKeySecret: [
    { required: true, message: 'AccessKeySecret 不能为空！', trigger: 'blur' },
  ],
  bucketName: [
    { required: true, message: 'BucketName 不能为空！', trigger: 'blur' },
  ],
  mount_path: [
    { required: true, message: '挂载路径不能为空！', trigger: 'blur' },
  ],
}

const list = ref<Array<Storage.StorageConfig>>([])
const endpoint = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'Endpoint',
  configKey: 'endpoint',
  configValue: '',
  description: '填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为https://oss-cn-hangzhou.aliyuncs.com。',
})
const accessKeyId = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'AccessKeyId',
  configKey: 'accessKeyId',
  configValue: '',
  description: '阿里云账号AccessKey ID，阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。',
})
const accessKeySecret = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'AccessKeySecret',
  configKey: 'accessKeySecret',
  configValue: '',
  description: '阿里云账号AccessKey Secret，阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。',
})
const bucketName = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'BucketName',
  configKey: 'bucketName',
  configValue: '',
  description: '阿里云 OSS Bucket 名称',
})
const mount_path = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '挂载路径',
  configKey: 'mount_path',
  configValue: '',
  description: '阿里云 OSS 挂载路径',
})

const handleFormData = () => {
  list.value = []
  endpoint.value.configValue = addStorageForm.endpoint
  accessKeyId.value.configValue = addStorageForm.accessKeyId
  accessKeySecret.value.configValue = addStorageForm.accessKeySecret
  bucketName.value.configValue = addStorageForm.bucketName
  mount_path.value.configValue = addStorageForm.mount_path
  list.value.push(endpoint.value)
  list.value.push(accessKeyId.value)
  list.value.push(accessKeySecret.value)
  list.value.push(bucketName.value)
  list.value.push(mount_path.value)
  addStorageData.value.configList = list.value
}

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      addStorageData.value.name = addStorageForm.name
      addStorageData.value.storageKey = addStorageForm.storageKey
      addStorageData.value.remark = addStorageForm.remark
      handleFormData()
      storageAdd(addStorageData.value).then((res) => {
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
        <n-form ref="formRef" :model="addStorageForm" :rules="rules">
          <n-form-item :label="t('storage.name')" path="name" required>
            <n-input v-model:value="addStorageForm.name" placeholder="请输入存储名称" clearable show-count :maxlength="20" />
          </n-form-item>
          <n-form-item label="storageKey" path="storageKey" required>
            <n-input v-model:value="addStorageForm.storageKey" placeholder="请输入 storageKey" clearable show-count :maxlength="20" />
          </n-form-item>
          <n-form-item label="BucketName" path="bucketName" required>
            <n-input v-model:value="addStorageForm.bucketName" :placeholder="bucketName.description" clearable />
          </n-form-item>
          <n-form-item label="Endpoint" path="endpoint" required>
            <n-input v-model:value="addStorageForm.endpoint" :placeholder="endpoint.description" clearable />
          </n-form-item>
          <n-form-item label="AccessKeyId" path="accessKeyId" required>
            <n-input v-model:value="addStorageForm.accessKeyId" :placeholder="accessKeyId.description" clearable />
          </n-form-item>
          <n-form-item label="AccessKeySecret" path="accessKeySecret" required>
            <n-input v-model:value="addStorageForm.accessKeySecret" :placeholder="accessKeySecret.description" clearable />
          </n-form-item>
          <n-form-item label="挂载路径" path="mount_path" required>
            <n-input v-model:value="addStorageForm.mount_path" :placeholder="mount_path.description" clearable />
          </n-form-item>
          <n-form-item :label="t('storage.remark')" path="remark">
            <n-input v-model:value="addStorageForm.remark" type="textarea" placeholder="请输入备注" maxlength="160" show-count />
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
