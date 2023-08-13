<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
const { isMobile } = useDevice()
</script>

<template>
  <div flex grid justify-start justify-center items-center h-8>
    <div mr-auto>
      <n-icon size="22" @click="router.back()" class="cursor-pointer ml-0.25rem">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
          <path d="M26 4h2v24h-2z" fill="currentColor"></path>
          <path d="M11.414 20.586L7.828 17H22v-2H7.828l3.586-3.586L10 10l-6 6l6 6l1.414-1.414z" fill="currentColor"></path>
        </svg>
      </n-icon>
    </div>
  </div>
  <div content-style="padding: 0;" h-full w-full mt-1 of-auto onscroll style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-grid cols="5" item-responsive responsive="screen">
      <n-grid-item offset="0 m:1 l:1" span="5 m:3 l:3">
        <div flex flex-col class="space-y-3">
          <n-button @click="router.push({ path: '/@admin/setting/storage/add/local', query: { type: 0 } })" ghost>本地存储</n-button>
          <n-button @click="router.push({ path: '/@admin/setting/storage/add/oneDrive', query: { type: 1 } })" ghost>OneDrive</n-button>
          <n-button @click="router.push({ path: '/@admin/setting/storage/add/aliyunOSS', query: { type: 2 } })" ghost>阿里云 OSS</n-button>
          <n-button @click="router.push({ path: '/@admin/setting/storage/add/amazonS3', query: { type: 3 } })" ghost>Amazon S3</n-button>
          <n-button @click="router.push({ path: '/@admin/setting/storage/add/qCloudCOS', query: { type: 4 } })" ghost>腾讯云 COS</n-button>
          <n-button disabled ghost>更多存储支持中...</n-button>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
