<script setup lang="ts">
import { getDefaultStorage } from '~/api/modules/file'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const loading = ref<boolean>(true)
const { isMobile } = useDevice()

onBeforeMount(() => {
  getDefaultStorage().then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      if (res.data.storageKey) {
        router.push({ path: `/${res.data.storageKey}` })
      } else {
        loading.value = false
      }
    }
  }).catch((err) => {
    console.log(err)
    loading.value = false
  })
})
</script>

<template>
  <div v-if="loading" class="flex justify-center mt-7">
    <n-spin size="medium" />
  </div>
  <p v-else>什么都没有呢！请登录后进入后台进行配置！</p>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
