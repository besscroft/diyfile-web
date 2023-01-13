<script setup lang="ts">
// 表单参数
import type { Storage } from '~/api/interface/storage'

const props = defineProps(['value'])
const { t } = useI18n()

const list = reactive<Array<Storage.StorageConfig>>([])
</script>

<template>
  开发中
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
