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
    网站标题
    <n-input-group>
      <n-input v-model:value="dataMap.title" />
      <n-button quaternary @click="handleUpdateSiteConfig('title', dataMap.title)">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
              <path d="M13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z" fill="currentColor"></path>
            </svg>
          </n-icon>
        </template>
      </n-button>
    </n-input-group>
    备案号
    <n-input-group>
      <n-input v-model:value="dataMap.beian" />
      <n-button quaternary @click="handleUpdateSiteConfig('beian', dataMap.beian)">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
              <path d="M13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z" fill="currentColor"></path>
            </svg>
          </n-icon>
        </template>
      </n-button>
    </n-input-group>
  </div>
</template>
