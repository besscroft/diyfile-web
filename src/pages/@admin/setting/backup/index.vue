<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <el-card :body-style="{ padding: '0.25rem' }" class="my-1" shadow="never">
    <el-page-header @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-600 mr-2"> {{ t('menu.setting.backup') }} </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button type="primary" class="ml-2">Edit</el-button>
        </div>
      </template>
    </el-page-header>
  </el-card>
  <el-card :body-style="{ padding: '0px' }" class="box-card h-full w-full overflow-auto" style="height: calc(100% - 4rem); -ms-overflow-style: none;" shadow="never">
    备份设置
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
