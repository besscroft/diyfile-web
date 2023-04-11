<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <el-card :body-style="{ padding: '0.25rem' }" class="my-1 h-10" shadow="never">
    <el-page-header class="mt-1" @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-400 mr-2"> {{ t('tip.cardTitle') }} </span>
        </div>
      </template>
    </el-page-header>
  </el-card>
  <el-card :body-style="{ padding: '1rem' }" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;" shadow="never">
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
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
