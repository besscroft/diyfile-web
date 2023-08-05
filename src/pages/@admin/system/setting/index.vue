<script setup lang="ts">
import Base from '~/pages/@admin/system/setting/base.vue'
import User from '~/pages/@admin/system/setting/user.vue'
import Web from '~/pages/@admin/system/setting/web.vue'

const { t } = useI18n()
const { isMobile } = useDevice()
</script>

<template>
  <div flex grid justify-start justify-center items-center h-8>
    <p mr-auto text-base font-medium ml-0.25rem>{{ t('menu.system.setting') }}</p>
    <div>
    </div>
  </div>
  <div content-style="padding: 0;" flex justify-center h-full w-full mt-1 of-auto style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-tabs type="line" animated :class="isMobile ? '' : 'w-160'">
      <n-tab-pane :name="t('setting.base')" :tab="t('setting.base')">
        <Base />
      </n-tab-pane>
      <n-tab-pane :name="t('setting.web')" :tab="t('setting.web')">
        <Web />
      </n-tab-pane>
      <n-tab-pane :name="t('setting.user')" :tab="t('setting.user')">
        <User />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
