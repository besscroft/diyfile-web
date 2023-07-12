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
  <div flex text-center h-full justify-center items-center>
    <a v-if="user.beian" href="https://beian.miit.gov.cn/" target="_blank">{{ user.beian }}</a>
    <span v-else>
      Made with ❤ by Bess Croft.
    </span>
  </div>
</template>
