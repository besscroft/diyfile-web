<script setup lang="ts">
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
    }"
  >
    <a-card :bordered="false" hoverable :style="{ height: '100%' }">
      <a-empty>
        <template #image>
          <icon-exclamation-circle-fill />
        </template>
        还没开发！
      </a-empty>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
