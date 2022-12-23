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
          <a-result :status="null" :title="t('menu.system.setting')" :subtitle="t('tip.deving')">
            <template #icon>
              <IconFaceSmileFill />
            </template>
          </a-result>
          <br/>
          <a-progress :percent="0.01" :style="{ width: '50%' }">
            <template v-slot:text="scope" >
              设置页面开发进度 {{scope.percent * 100}}%
            </template>
          </a-progress>
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
