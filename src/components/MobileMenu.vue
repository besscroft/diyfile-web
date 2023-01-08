<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['routerPage'])
const { t } = useI18n()

/** 点击菜单事件 */
const routerPage = (val: string) => {
  emit('routerPage', val)
}
</script>

<template>
  <a-row style="height: 56px; background-color: var(--color-bg-2); text-align: center;" class="items-center">
    <a-col :flex="4">
      <a-button aria-label="dashboard" @click="routerPage('admin')" type="text">
        <template #icon>
          <icon-apps />
        </template>
        <template #default>{{ t('menu.index') }}</template>
      </a-button>
    </a-col>
    <a-col :flex="4">
      <a-dropdown>
        <a-button aria-label="storage" type="text">
          <template #icon>
            <icon-storage />
          </template>
          <template #default>{{ t('menu.setting.index') }}</template>
        </a-button>
        <template #content>
          <a-doption @click="routerPage('2_0')">
            <template #icon>
              <icon-save />
            </template>
            <template #default>{{ t('menu.setting.storage') }}</template>
          </a-doption>
          <a-doption @click="routerPage('2_1')">
            <template #icon>
              <icon-thunderbolt />
            </template>
            <template #default>{{ t('menu.setting.cdn') }}</template>
          </a-doption>
        </template>
      </a-dropdown>
    </a-col>
    <a-col :flex="4">
      <div>
        <a-dropdown>
          <a-button aria-label="settings" type="text">
            <template #icon>
              <icon-settings />
            </template>
            <template #default>{{ t('menu.system.index') }}</template>
          </a-button>
          <template #content>
            <a-doption @click="routerPage('3_0')">
              <template #icon>
                <icon-tool />
              </template>
              <template #default>{{ t('menu.system.setting') }}</template>
            </a-doption>
            <a-doption @click="routerPage('3_1')">
              <template #icon>
                <icon-user-group />
              </template>
              <template #default>{{ t('menu.system.user') }}</template>
            </a-doption>
            <a-doption @click="routerPage('3_2')">
              <template #icon>
                <icon-send />
              </template>
              <template #default>{{ t('menu.system.about') }}</template>
            </a-doption>
            <a-doption @click="routerPage('3_3')">
              <template #icon>
                <icon-question-circle-fill />
              </template>
              <template #default>{{ t('menu.system.faqs') }}</template>
            </a-doption>
          </template>
        </a-dropdown>
      </div>
    </a-col>
  </a-row>
</template>

<style scoped>
</style>
