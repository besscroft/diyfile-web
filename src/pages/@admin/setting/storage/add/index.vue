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
    <n-grid x-gap="12" :cols="isMobile ? 1 : 3">
      <n-gi :offset="isMobile ? 0 : 1">
        <div class="flex flex-col space-y-3">
          <v-btn disabled @click="router.push({ path: '/@admin/setting/storage/add/local', query: { type: 0 } })">本地存储(开发中)</v-btn>
          <v-btn @click="router.push({ path: '/@admin/setting/storage/add/oneDrive', query: { type: 1 } })">OneDrive</v-btn>
          <v-btn @click="router.push({ path: '/@admin/setting/storage/add/aliyunOSS', query: { type: 2 } })">阿里云OSS</v-btn>
          <v-btn @click="router.push({ path: '/@admin/setting/storage/add/amazonS3', query: { type: 3 } })">AmazonS3</v-btn>
          <v-btn disabled>更多存储支持中...</v-btn>
        </div>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
