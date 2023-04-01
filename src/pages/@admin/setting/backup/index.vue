<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <el-card class="box-card h-full w-full overflow-auto" shadow="never">
    <template #header>
      <div class="flex justify-space-between align-center">
        <span class="mx-1">{{ t('menu.setting.backup') }}</span>
        <el-button style="margin-left: auto" class="button" text>Operation button</el-button>
      </div>
    </template>
    备份设置
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
