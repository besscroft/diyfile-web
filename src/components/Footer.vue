<script setup lang="ts">

</script>

<template>
  <a-card hoverable :style="{ width: '100%' }">
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }"
    >
      <span
        :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
      >
        <a-typography-text>Made with ❤ by Bess Croft.</a-typography-text>
      </span>
      <a-tag color="gray">
        <template #icon>
          <icon-github />
        </template>
        <a-link href="https://github.com/besscroft">
          GitHub
        </a-link>
      </a-tag>
    </div>
  </a-card>
</template>
