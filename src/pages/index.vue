<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-row flex-wrap" style="margin-top: 6rem">
    <RouterLink class="flex-initial mx-auto" to="/about" :title="t('button.about')">
      <div i-carbon-dicom-overlay />
    </RouterLink>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
