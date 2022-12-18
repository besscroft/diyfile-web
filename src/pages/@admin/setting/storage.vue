<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '12px',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ width: '100%', height: '100%', marginBottom: '16px' }">
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
      >
        <div class="flex-auto">
          <a-result :status="null" :title="t('menu.setting.storage')" :subtitle="t('tip.deving')">
            <template #icon>
              <IconFaceSmileFill />
            </template>
          </a-result>
        </div>
      </div>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
