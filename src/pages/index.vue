<script setup lang="ts">
import { getDefaultStorage } from '~/api/modules/file'

const { t } = useI18n()
const user = useUserStore()
const router = useRouter()
const loading = ref<boolean>(true)
const routes = ref<Array<any>>([
  {
    path: '/',
    label: 'Home',
  },
])

onBeforeMount(() => {
  getDefaultStorage().then((res) => {
    if (res.code === 200) {
      router.push({ path: `/${res.data.storageKey}` })
    }
  }).catch((err) => {
    console.log(err)
    loading.value = false
  })
})
</script>

<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '12px',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-col :xs="1" :sm="2" :md="2" :lg="3" :xl="4" :xxl="4"></a-col>
      <a-col :xs="22" :sm="20" :md="20" :lg="18" :xl="16" :xxl="16">
        <a-tag color="gray">
          <template #icon>
            <icon-branch />
          </template>
          <a-breadcrumb :routes="routes" :max-count="3">
            <template #item-render="{ route }">
              <a-link @click="router.push(route.path)">
                {{route.label}}
              </a-link>
            </template>
          </a-breadcrumb>
        </a-tag>
        <a-card :bordered="false" :style="{ width: '100%' }">
          <a-spin v-if="loading" :size="32" class="flex justify-center">
            <template #icon>
              <icon-sync />
            </template>
          </a-spin>
          <a-empty v-else>
            什么都没有呢！请登录后进入后台进行配置！
          </a-empty>
        </a-card>
      </a-col>
      <a-col :xs="1" :sm="2" :md="2" :lg="3" :xl="4" :xxl="4"></a-col>
    </a-row>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
