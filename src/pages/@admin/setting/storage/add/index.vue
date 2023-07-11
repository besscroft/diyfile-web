<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
const { isMobile } = useDevice()
</script>

<template>
  <n-card content-style="padding: 0;" class="my-0.5">
    <n-page-header :title="t('tip.cardTitle')" class="mx-0.5" @back="router.back()" />
  </n-card>
  <n-card content-style="padding: 0.5rem;" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-grid cols="5" item-responsive responsive="screen">
      <n-grid-item offset="0 m:1 l:1" span="5 m:3 l:3">
        <div class="flex flex-col space-y-3">
          <n-button @click="router.push({ path: '/@admin/setting/storage/add/local', query: { type: 0 } })" ghost>本地存储</n-button>
          <n-button @click="router.push({ path: '/@admin/setting/storage/add/oneDrive', query: { type: 1 } })" ghost>OneDrive</n-button>
          <n-button @click="router.push({ path: '/@admin/setting/storage/add/aliyunOSS', query: { type: 2 } })" ghost>阿里云OSS</n-button>
          <n-button @click="router.push({ path: '/@admin/setting/storage/add/amazonS3', query: { type: 3 } })" ghost>AmazonS3</n-button>
          <n-button disabled ghost>更多存储支持中...</n-button>
        </div>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
