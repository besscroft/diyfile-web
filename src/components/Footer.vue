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
  6，这里是页脚，还没写！移动端底部菜单也还没写！
</template>
