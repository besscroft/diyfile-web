<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['routerPage'])
const { t } = useI18n()

/** 点击菜单事件 */
const routerPage = (val: string) => {
  emit('routerPage', val)
}
</script>

<template>
  <v-list nav>
    <v-list-item prepend-icon="dashboard" :title="t('menu.index')" @click="routerPage('admin')"></v-list-item>
    <v-list-item prepend-icon="dns" :title="t('menu.setting.storage')" @click="routerPage('2_0')"></v-list-item>
    <v-list-item prepend-icon="restore" :title="t('menu.setting.backup')" @click="routerPage('2_1')"></v-list-item>
    <v-list-item prepend-icon="sync" :title="t('menu.setting.sync')" @click="routerPage('2_2')"></v-list-item>
    <v-list-item prepend-icon="settings_applications" :title="t('menu.system.setting')" @click="routerPage('3_0')"></v-list-item>
    <v-list-item prepend-icon="supervisor_account" :title="t('menu.system.user')" @click="routerPage('3_1')"></v-list-item>
  </v-list>
</template>

<style scoped>
</style>
