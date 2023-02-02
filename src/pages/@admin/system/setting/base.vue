<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { getBarkId, updateConfig } from '~/api/modules/systemConfig'

const barkId = ref()

const handleUpdateBarkId = (barkId: string) => {
  updateConfig({ configKey: 'barkId', configValue: barkId }).then((res) => {
    if (res.code === 200) {
      Message.success(res.message)
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
  <div
    :style="{
      width: '100%',
      height: '100%',
    }"
  >
    <a-card :bordered="false" hoverable :style="{ height: '100%' }">
      <a-form layout="vertical">
        <a-form-item label="版本">
          <a-input placeholder="v0.0.1" disabled>
            <template #prefix>
              <icon-send />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="BarkId">
          <a-input-search v-if="barkId" v-model="barkId" search-button>
            <template #prefix>
              <icon-message />
            </template>
            <template #button-icon>
              <a-popconfirm content="确定要更新吗?" type="warning" :onOk="() => handleUpdateBarkId(barkId)">
                <icon-edit />
              </a-popconfirm>
            </template>
          </a-input-search>
          <a-input-search v-else v-model="barkId" placeholder="您暂未设置 BarkId！" search-button>
            <template #prefix>
              <icon-message />
            </template>
            <template #button-icon>
              <icon-edit />
            </template>
          </a-input-search>
        </a-form-item>
        更多设置，敬请期待！
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
