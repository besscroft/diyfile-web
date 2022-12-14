<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// 菜单收缩按钮
const props = defineProps(['value'])
const emit = defineEmits(['routerPage'])
const { t } = useI18n()

/** 点击菜单事件 */
const routerPage = (val: string) => {
  emit('routerPage', val)
}
</script>

<template>
  <a-menu
    :style="{ width: '100%', height: '100%' }"
  >
    <a-menu-item key="1" @click="routerPage('admin')">
      <template #icon><icon-apps></icon-apps></template>
      {{ t('menu.index') }}
    </a-menu-item>
    <a-sub-menu key="2">
      <template #icon><icon-storage /></template>
      <template #title>菜单</template>
      <a-menu-item key="2_0" @click="routerPage('2_0')"><icon-save />
        菜单1
      </a-menu-item>
      <a-menu-item key="2_1" @click="routerPage('2_1')"><icon-thunderbolt />
        菜单2
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<style scoped>
</style>
