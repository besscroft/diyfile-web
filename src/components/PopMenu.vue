<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// 菜单收缩按钮
const props = defineProps(['value'])
const emit = defineEmits(['routerPage', 'onMenuCollapse'])
const { t } = useI18n()

const onMenuCollapse = () => {
  console.log('onMenuCollapse')
  emit('onMenuCollapse')
}

/** 点击菜单事件 */
const routerPage = (val: string) => {
  emit('routerPage', val)
}
</script>

<template>
  <a-menu
    :style="{ width: '100%', height: '100%' }"
    show-collapse-button
    @collapse="onMenuCollapse"
  >
    <a-menu-item key="1" @click="routerPage('admin')">
      <template #icon><icon-apps></icon-apps></template>
      {{ t('menu.index') }}
    </a-menu-item>
    <a-sub-menu key="2">
      <template #icon><icon-storage /></template>
      <template #title>{{ t('menu.setting.index') }}</template>
      <a-menu-item key="2_0" @click="routerPage('2_0')"><icon-save />
        {{ t('menu.setting.storage') }}
      </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="3">
      <template #icon><icon-settings /></template>
      <template #title>{{ t('menu.system.index') }}</template>
      <a-menu-item key="3_0" @click="routerPage('3_0')"><icon-tool />{{ t('menu.system.setting') }}</a-menu-item>
      <a-menu-item key="3_1" @click="routerPage('3_1')"><icon-user-group />{{ t('menu.system.user') }}</a-menu-item>
      <a-menu-item key="3_2" @click="routerPage('3_2')"><icon-send />{{ t('menu.system.about') }}</a-menu-item>
      <a-menu-item key="3_3" @click="routerPage('3_3')"><icon-question-circle-fill />{{ t('menu.system.faqs') }}</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<style scoped>
</style>
