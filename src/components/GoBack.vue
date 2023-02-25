<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <icon-arrow-left class="cursor-pointer" @click="router.back()" /> {{ t('button.back') }}
</template>

<style scoped>

</style>
