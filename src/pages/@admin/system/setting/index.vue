<script setup lang="ts">
import Base from '~/pages/@admin/system/setting/base.vue'
import User from '~/pages/@admin/system/setting/user.vue'
import Web from '~/pages/@admin/system/setting/web.vue'

const { t } = useI18n()
const { isMobile } = useDevice()
</script>

<template>
  <n-card content-style="padding: 0;" my0.5>
    <n-page-header :title="t('menu.system.setting')" mx0.5 />
  </n-card>
  <n-card content-style="padding: 0.5rem;" flex items-center h-full w-full of-auto class="box-card" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
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
  </n-card>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
