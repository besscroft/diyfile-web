<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <el-card :body-style="{ padding: '0.25rem' }" class="my-1" shadow="never">
    <el-page-header @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-400 mr-2"> {{ t('menu.system.setting') }} </span>
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
    <v-tabs
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab :value="1">{{ t('setting.base') }}</v-tab>
      <v-tab :value="2">{{ t('setting.web') }}</v-tab>
      <v-tab :value="3">{{ t('setting.user') }}</v-tab>
    </v-tabs>
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
