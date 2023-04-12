<script setup lang="ts">
import { getSiteConfig, updateConfig } from '~/api/modules/systemConfig'
import { ResultEnum } from '~/enums/httpEnum'

const user = useUserStore()
const message = useMessage()
const dataMap = ref({})

const handleUpdateSiteConfig = (configKey: string, configValue: string) => {
  updateConfig({ configKey, configValue }).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
      if (configKey === 'beian') {
        user.setBeian(configValue)
      }
    }
  })
}

onMounted(() => {
  getSiteConfig().then((res) => {
    dataMap.value = res.data
  })
})
</script>

<template>
  <div class="h-full mx-2 mt-2">
    <v-text-field
      v-model="dataMap.title"
      label="网站标题"
      append-inner-icon="download_done"
      @click:append-inner="() => handleUpdateSiteConfig('title', dataMap.title)"
    ></v-text-field>
    <v-text-field
      v-model="dataMap.beian"
      class="mt-2"
      label="备案号"
      append-inner-icon="download_done"
      @click:append-inner="() => handleUpdateSiteConfig('beian', dataMap.beian)"
    ></v-text-field>
  </div>
</template>

<style scoped>

</style>
