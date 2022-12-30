<script setup lang="ts">
const { t } = useI18n()
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
    <a-card hoverable :style="{ width: '100%', height: '100%', marginBottom: '16px' }" :title="t('menu.setting.cdn')">
      <a-progress :percent="0.01" :style="{ width: '50%' }">
        <template v-slot:text="scope" >
          CDN 页面开发进度 {{ scope.percent * 100 }}%
        </template>
      </a-progress>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
