<script setup lang="ts">
import { getBackupFile } from '~/api/modules/monitor'

const router = useRouter()
const { t } = useI18n()
const { isMobile } = useDevice()

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
    <a-card hoverable :style="{ height: '100%' }" :title="t('menu.setting.backup')">
      <a-space size="medium">
        <template #split>
          <a-divider direction="vertical" />
        </template>
        <a-button type="outline" @click="handleBackupFile">
          {{ t('button.backup') }}
        </a-button>
        <a-button type="outline" disabled>
          {{ t('button.restore') }}
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
