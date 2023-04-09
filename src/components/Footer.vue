<script setup lang="ts">
import { getBeian } from '~/api/modules/systemConfig'
import { ResultEnum } from '~/enums/httpEnum'

const user = useUserStore()

onMounted(() => {
  if (!user.beian) {
    getBeian().then((res) => {
      if (res.code === ResultEnum.SUCCESS) {
        user.setBeian(res.data.toString())
      }
    })
  }
})
</script>

<template>
  <div class="h-full flex text-center justify-center items-center">
    Made with ❤ by Bess Croft.
  </div>
</template>
