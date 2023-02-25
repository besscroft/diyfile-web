<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '0.25rem',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ height: '100%', padding: '0.25rem' }" :title="t('tip.cardTitle')">
      <GoBack />
      <br>
      <a-row>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
        <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
          <br>
          <a-space direction="vertical" fill>
            <a-button type="primary" long disabled @click="router.push({ path: '/@admin/setting/storage/add/local', query: { type: 0 } })">本地存储(开发中)</a-button>
            <a-button type="primary" long @click="router.push({ path: '/@admin/setting/storage/add/oneDrive', query: { type: 1 } })">OneDrive</a-button>
            <a-button type="primary" long @click="router.push({ path: '/@admin/setting/storage/add/aliyunOSS', query: { type: 2 } })">阿里云OSS(当心被刷流量，后续将支持 CloudFlare)</a-button>
            <a-button type="primary" long disabled>更多存储支持中...</a-button>
          </a-space>
        </a-col>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
      </a-row>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
