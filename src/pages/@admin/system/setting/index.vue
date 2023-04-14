<script setup lang="ts">
import Base from '~/pages/@admin/system/setting/base.vue'
import User from '~/pages/@admin/system/setting/user.vue'
import Web from '~/pages/@admin/system/setting/web.vue'

const router = useRouter()
const { t } = useI18n()
const tab = ref(1)
</script>

<template>
  <n-card content-style="padding: 0;" class="my-0.5">
    <n-page-header :title="t('menu.system.setting')" class="mx-0.5">
    </n-page-header>
  </n-card>
  <n-card content-style="padding: 0.5rem;" class="box-card h-full w-full overflow-auto" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab :value="1">{{ t('setting.base') }}</v-tab>
      <v-tab :value="2">{{ t('setting.web') }}</v-tab>
      <v-tab :value="3">{{ t('setting.user') }}</v-tab>
    </v-tabs>
    <v-window v-model="tab" class="wrapper mx-auto max-w-screen-sm">
      <v-window-item :value="1">
        <Base />
      </v-window-item>
      <v-window-item :value="2">
        <Web />
      </v-window-item>
      <v-window-item :value="3">
        <User />
      </v-window-item>
    </v-window>
  </n-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
