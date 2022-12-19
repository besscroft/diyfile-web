<script setup lang="ts">
const { t } = useI18n()

// 开发者信息
const devList = ref<Array<Object>>([
  {
    background: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
    description: '只要不失去你的崇高，整个世界都会向你敞开。',
    avatar: 'https://besscroft.com/uploads/avatar.jpeg',
    name: 'Bess Croft',
    job: '开发者',
  },
])
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
    <a-card hoverable :style="{ height: '100%' }">
      <div class="flex-auto">
        <a-typography :style="{ marginTop: '-40px' }">
          <a-typography-title>
            {{ t('menu.system.about') }}
          </a-typography-title>
          <a-typography-paragraph>
            一款好看的文件交互管理。
          </a-typography-paragraph>
        </a-typography>
        <div class="flex flex-wrap" style="justify-content: center;">
          <a-card v-for="item in devList" :key="item" class="flex-initial w-64 m-1" hoverable>
            <template #actions>
              <span class="icon-hover"> <IconThumbUp /> </span>
              <span class="icon-hover"> <IconShareInternal /> </span>
              <span class="icon-hover"> <IconMore /> </span>
            </template>
            <template #cover>
              <div
                :style="{
                  height: '204px',
                  overflow: 'hidden',
                }"
              >
                <img
                  :style="{ width: '100%', transform: 'translateY(-20px)' }"
                  alt="background"
                  :src="item.background"
                >
              </div>
            </template>
            <a-card-meta :title="item.job" :description="item.description">
              <template #avatar>
                <div
                  :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
                >
                  <a-avatar :size="40" :style="{ marginRight: '8px' }">
                    <img
                      alt="avatar"
                      :src="item.avatar"
                    >
                  </a-avatar>
                  <a-typography-text>{{ item.name }}</a-typography-text>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </div>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
