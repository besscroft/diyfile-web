<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <n-card content-style="padding: 0;" class="my-0.5">
    <n-page-header :title="t('tip.cardTitle')" class="mx-0.5" @back="router.back()">
    </n-page-header>
  </n-card>
  <n-card content-style="padding: 0.5rem;" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <el-row :gutter="10">
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
      <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
        <div class="flex flex-col space-y-3">
          <v-btn disabled @click="router.push({ path: '/@admin/setting/storage/add/local', query: { type: 0 } })">本地存储(开发中)</v-btn>
          <v-btn @click="router.push({ path: '/@admin/setting/storage/add/oneDrive', query: { type: 1 } })">OneDrive</v-btn>
          <v-btn @click="router.push({ path: '/@admin/setting/storage/add/aliyunOSS', query: { type: 2 } })">阿里云OSS</v-btn>
          <v-btn @click="router.push({ path: '/@admin/setting/storage/add/amazonS3', query: { type: 3 } })">AmazonS3</v-btn>
          <v-btn disabled>更多存储支持中...</v-btn>
        </div>
      </el-col>
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
    </el-row>
  </n-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
