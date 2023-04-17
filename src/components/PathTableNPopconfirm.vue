<script setup lang="ts">
const emit = defineEmits(['handleDelete'])

const handlePositiveClick = () => {
  emit('handleDelete')
}
</script>

<template>
  <n-popconfirm
    positive-text="确定"
    negative-text="取消"
    @positive-click="handlePositiveClick"
  >
    <template #trigger>
      <v-icon class="cursor-pointer" icon="delete" />
    </template>
    确定要删除吗?
  </n-popconfirm>
</template>
