<script setup lang="ts">
import { getBarkId, getBarkStatus, updateConfig } from '~/api/modules/systemConfig'
import { ResultEnum } from '~/enums/httpEnum'

const barkId = ref()
const barkStatus = ref(false)
const message = useMessage()

const handleUpdateBarkId = (barkId: string) => {
  updateConfig({ configKey: 'barkId', configValue: barkId }).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
    }
  })
}

const handleUpdateValue = (value: boolean) => {
  updateConfig({ configKey: 'barkStatus', configValue: value ? 1 : 0 }).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
    }
  })
}

onMounted(() => {
  getBarkId().then((res) => {
    barkId.value = res.data
  })
  getBarkStatus().then((res) => {
    barkStatus.value = res.data === 1 ? true : false
  })
})
</script>

<template>
  <div class="h-full mx-2 mt-2">
    BarkId
    <n-input-group>
      <n-input v-model:value="barkId" />
      <n-button quaternary @click="handleUpdateBarkId(barkId)">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
              <path d="M13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z" fill="currentColor"></path>
            </svg>
          </n-icon>
        </template>
      </n-button>
    </n-input-group>
    <br />
    <br />
    是否启用 Bark 推送
    <br />
    <n-switch
      v-model:value="barkStatus"
      @update:value="(value: boolean) => handleUpdateValue(value)"
    />
  </div>
</template>
