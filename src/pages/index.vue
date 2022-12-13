<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <RouterLink class="icon-btn mx-2" to="/about" :title="t('button.about')">
    <div i-carbon-dicom-overlay />
  </RouterLink>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
