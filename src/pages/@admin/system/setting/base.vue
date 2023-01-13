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
      <a-form layout="vertical">
        <a-form-item label="版本">
          <a-input placeholder="v0.0.1" disabled>
            <template #prefix>
              <icon-send />
            </template>
          </a-input>
        </a-form-item>
        更多设置，敬请期待！
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
