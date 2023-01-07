<script setup lang="ts">
import Base from '~/pages/@admin/system/setting/base.vue'
import Web from '~/pages/@admin/system/setting/web.vue'

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
    <a-card hoverable :style="{ width: '100%', height: '100%', marginBottom: '16px' }" :title="t('menu.system.setting')">
      <a-row class="wrapper">
        <a-col :span="24">
          <a-tabs default-active-key="1" type="rounded">
            <a-tab-pane key="1" :title="t('setting.base')">
              <Base />
            </a-tab-pane>
            <a-tab-pane key="2" :title="t('setting.web')">
              <Web />
            </a-tab-pane>
          </a-tabs>
        </a-col>
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
