<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { getSiteConfig, updateConfig } from '~/api/modules/systemConfig'
import { ResultEnum } from '~/enums/httpEnum'

const user = useUserStore()
const dataMap = ref({})

const handleUpdateSiteConfig = (configKey: string, configValue: string) => {
  updateConfig({ configKey, configValue }).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      Message.success(res.message)
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
  <div
    :style="{
      width: '100%',
      height: '100%',
    }"
  >
    <a-card :bordered="false" hoverable :style="{ height: '100%' }">
      <a-form layout="vertical" class="mx-auto max-w-screen-sm">
        <a-form-item label="网站标题">
          <a-input-search v-if="dataMap.title" v-model="dataMap.title" search-button>
            <template #prefix>
              <icon-public />
            </template>
            <template #button-icon>
              <a-popconfirm content="确定要更新吗?" type="warning" :onOk="() => handleUpdateSiteConfig('title', dataMap.title)">
                <icon-edit />
              </a-popconfirm>
            </template>
          </a-input-search>
          <a-input-search v-else v-model="dataMap.title" placeholder="您暂未设置网站标题，将显示自带标题！" search-button>
            <template #prefix>
              <icon-public />
            </template>
            <template #button-icon>
              <icon-edit />
            </template>
          </a-input-search>
        </a-form-item>
        <a-form-item label="备案号">
          <a-input-search v-if="dataMap.beian" v-model="dataMap.beian" search-button>
            <template #prefix>
              <icon-idcard />
            </template>
            <template #button-icon>
              <a-popconfirm content="确定要更新吗?" type="warning" :onOk="() => handleUpdateSiteConfig('beian', dataMap.beian)">
                <icon-edit />
              </a-popconfirm>
            </template>
          </a-input-search>
          <a-input-search v-else v-model="dataMap.beian" placeholder="您暂未设置备案号！" search-button>
            <template #prefix>
              <icon-idcard />
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
