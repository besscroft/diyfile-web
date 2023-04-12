<script setup lang="ts">
import { getBarkId, updateConfig } from '~/api/modules/systemConfig'
import { ResultEnum } from '~/enums/httpEnum'

const barkId = ref()
const message = useMessage()

const handleUpdateBarkId = (barkId: string) => {
  updateConfig({ configKey: 'barkId', configValue: barkId }).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
    }
  })
}

onMounted(() => {
  getBarkId().then((res) => {
    barkId.value = res.data
  })
})
</script>

<template>
  <div class="h-full mx-2 mt-2">
    <v-text-field
      v-model="barkId"
      label="BarkId"
      append-inner-icon="download_done"
      @click:append-inner="() => handleUpdateBarkId(barkId)"
    ></v-text-field>
  </div>
</template>

<style scoped>

</style>
