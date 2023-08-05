<script setup lang="ts">
import type { UploadFileInfo, UploadInst } from 'naive-ui'
import axios from 'axios'
import { API_URL } from '../../../../../config/config'
import { ResultEnum } from '~/enums/httpEnum'
import { getBackupFile } from '~/api/modules/monitor'

const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()
const user = useUserStore()
const dialogVisible = ref<boolean>(false)
const fileListLengthRef = ref(0)
const uploadRef = ref<UploadInst | null>(null)

const handleBackupFile = () => {
  getBackupFile().then((res) => {
    const jsonObj = JSON.parse(res.data.toString() || '{}')
    // 创建一个包含 json 对象的二进制对象，并指定类型为 application/json
    const blob = new Blob([JSON.stringify(jsonObj)], { type: 'application/json' })
    // 创建一个指向 Blob 对象的临时 URL
    const url = URL.createObjectURL(blob)
    // 创建一个链接到临时 URL 的 a 标签，并设置 download 属性为文件名
    const a = document.createElement('a')
    a.href = url
    const now = new Date()
    a.download = `backup-${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDay()}.json`
    // 触发 a 标签的点击事件，开始下载文件
    a.click()
    // 释放临时 URL
    URL.revokeObjectURL(url)
  }).catch((err) => {
    console.log(err)
  })
}

const onRequestUpload = (option: any) => {
  const { file } = option
  // 创建 FormData 对象
  const formData = new FormData()
  formData.append('file', file.file)

  // 发送 POST 请求上传文件
  axios.post(`${API_URL}/monitor/restoreData`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${user.token}`,
    },
  }).then((res) => {
    if (res.data.code === ResultEnum.SUCCESS) {
      message.success(res.data.message)
      return Promise.resolve(res.data)
    }
    if (res.data.code === ResultEnum.UNAUTHORIZED) {
      message.error('登陆已过期，请重新登陆！')
      user.setToken('')
      user.setUserName('')
      user.setAvatar('')
      window.location.href = '/@login'
      return Promise.reject(res.data)
    }
    // 没有权限（code == 403）
    if (res.data.code === ResultEnum.FORBIDDEN) {
      message.error(res.data.message)
      return Promise.reject(res.data)
    }
  }).catch((err) => {
    console.log(err)
  })
}

const onConfirmUpload = () => {
  dialogVisible.value = false
  uploadRef.value?.submit()
}

const handleFileChange = (options: { fileList: UploadFileInfo[] }) => {
  fileListLengthRef.value = options.fileList.length
}

const handleSubmitClick = () => {
  dialog.success({
    title: '确定要上传吗？',
    content: '上传备份文件，系统配置将会覆盖，存储数据将会新增！',
    positiveText: '确定',
    negativeText: '算了',
    closable: false,
    maskClosable: false,
    onPositiveClick: () => {
      onConfirmUpload()
    },
  })
}
</script>

<template>
  <div flex grid justify-start justify-center items-center h-8>
    <p mr-auto text-base font-medium ml-0.25rem>{{ t('menu.setting.backup') }}</p>
    <div>
    </div>
  </div>
  <div content-style="padding: 0;" h-full w-full mt-1 of-auto style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <div flex flex-col mx2 my2 ma2>
      <div ma2 w-40>
        <n-button icon-placement="left" quaternary @click="handleBackupFile">
          <template #icon>
            <n-icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                <circle cx="7" cy="7" r="1" fill="currentColor"></circle>
                <circle cx="7" cy="15" r="1" fill="currentColor"></circle>
                <circle cx="7" cy="23" r="1" fill="currentColor"></circle>
                <path d="M12 26H4v-6h8v-2H4v-6h18V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h8zM4 4h16v6H4z" fill="currentColor"></path>
                <path d="M28 17v2.413A6.996 6.996 0 1 0 22 30v-2a5 5 0 1 1 4.576-7H24v2h6v-6z" fill="currentColor"></path>
              </svg>
            </n-icon>
          </template>
          {{ t('button.backup') }}
        </n-button>
      </div>
      <div ma2 w-40>
        <n-upload
          ref="uploadRef"
          :default-upload="false"
          multiple
          :custom-request="onRequestUpload"
          accept=".json"
          @change="handleFileChange"
        >
          <n-button icon-placement="left" quaternary>
            <template #icon>
              <n-icon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                  <path d="M11 18l1.41 1.41L15 16.83V29h2V16.83l2.59 2.58L21 18l-5-5l-5 5z" fill="currentColor"></path>
                  <path d="M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22z" fill="currentColor"></path>
                </svg>
              </n-icon>
            </template>
            {{ t('button.selectFile') }}
          </n-button>
        </n-upload>
      </div>
      <div ma2 w-40>
        <n-button icon-placement="left" quaternary @click="handleSubmitClick" :disabled="!fileListLengthRef">
          <template #icon>
            <n-icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                <path d="M26.5 12H19a4 4 0 0 1 0-8h.084A4.786 4.786 0 0 1 23 2a4.982 4.982 0 0 1 4.654 3.203A3.467 3.467 0 0 1 30 8.5a3.504 3.504 0 0 1-3.5 3.5zM19 6a2 2 0 0 0 0 4h7.5A1.502 1.502 0 0 0 28 8.5a1.486 1.486 0 0 0-1.278-1.474l-.661-.099l-.162-.649a2.957 2.957 0 0 0-5.487-.712L20.114 6z" fill="currentColor"></path>
                <path d="M23 14l-5 5l1.414 1.414L22 17.832V24h-6v2h6a2.002 2.002 0 0 0 2-2v-6.168l2.587 2.583L28 19z" fill="currentColor"></path>
                <path d="M2 20h10v2H2z" fill="currentColor"></path>
                <path d="M2 24h10v2H2z" fill="currentColor"></path>
                <path d="M2 28h10v2H2z" fill="currentColor"></path>
              </svg>
            </n-icon>
          </template>
          {{ t('button.restore') }}
        </n-button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
