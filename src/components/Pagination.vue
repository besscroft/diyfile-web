<script setup lang="ts">
const props = defineProps({
  value: Object,
  pageInfo: Object,
})
const emit = defineEmits(['onPageHandle'])

const onPageHandle = (val: any) => {
  emit('onPageHandle', val)
}
</script>

<template>
  <a-pagination
    :total="pageInfo.total"
    :page-size="pageInfo.pageSize"
    :current="pageInfo.pageNum"
    :show-total="true"
    class="mt-4"
    @change="(current) => { pageInfo.pageNum = current; onPageHandle(value) }"
  />
</template>

<style scoped>

</style>
