<script setup lang="ts">
import { getDefaultStorage } from '~/api/modules/file'

const router = useRouter()
const loading = ref<boolean>(true)

onBeforeMount(() => {
  getDefaultStorage().then((res) => {
    if (res.data.storageKey) {
      router.push({ path: `/${res.data.storageKey}` })
    } else {
      loading.value = false
    }
  }).catch((err) => {
    console.log(err)
    loading.value = false
  })
})
</script>

<template>
  <div v-if="loading" flex justify-center mt-7>
    <n-spin size="medium" />
  </div>
  <n-result v-else status="404" title="什么都没有呢！请登录后进入后台进行配置！" description="生活总归带点荒谬" />
</template>

<route lang="yaml">
meta:
  layout: default
</route>
