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
  666
</template>

<style scoped>
</style>
