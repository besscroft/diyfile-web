<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
const { isMobile } = useDevice()
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
      开发中...
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
