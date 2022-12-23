<script setup lang="ts">
const router = useRouter()

const useDetail = () => {
  const id = router.currentRoute.value.query.id
  console.log(id)
}

useDetail()
</script>

<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '12px',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ height: '100%' }">
      <icon-arrow-left @click="router.back()"/>
      <br/>
      <a-progress :percent="0.1" :style="{ width: '50%' }">
        <template v-slot:text="scope" >
          存储编辑开发进度 {{ scope.percent * 100 }}%
        </template>
      </a-progress>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
