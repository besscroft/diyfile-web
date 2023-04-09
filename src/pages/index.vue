<script setup lang="ts">
import { getDefaultStorage } from '~/api/modules/file'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
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
  <el-skeleton
    v-if="loading"
    :rows="5"
    animated
    :style="isMobile ? { 'width': '100%', 'overflow-x': 'hidden !important' } : { 'width': '66%', 'overflow-x': 'hidden !important' }"
    class="mx-auto"
  />
  <p v-else>什么都没有呢！请登录后进入后台进行配置！</p>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
