<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <el-card class="box-card" :style="{ height: '100%', padding: '0.5rem' }" shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between;">
        <span>{{ t('menu.system.setting') }}</span>
        <div style="display: flex">
          <el-button style="margin-left: auto" class="button" text>Operation button</el-button>
        </div>
      </div>
    </template>
    系统设置
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
