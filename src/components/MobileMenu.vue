<script setup lang="ts">
import type { DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownRenderOption } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['routerPage'])
const { t } = useI18n()
const router = useRouter()
const activeItem = ref<string>('')
const showDropdownRef = ref(false)

/** 点击菜单事件 */
const routerPage = (val: string) => {
  emit('routerPage', val)
}

const settingOptions = ref<Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>>([
  {
    label: t('menu.setting.storage'),
    key: '2_0',
  },
  {
    label: t('menu.setting.backup'),
    key: '2_1',
  },
  {
    label: t('menu.setting.sync'),
    key: '2_2',
  },
])
const systemOptions = ref<Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>>([
  {
    label: t('menu.system.setting'),
    key: '3_0',
  },
  {
    label: t('menu.system.user'),
    key: '3_1',
  },
  {
    label: t('menu.system.manual'),
    key: '3_2',
  },
])

const handleSelect = (path: string) => {
  showDropdownRef.value = false
  routerPage(path)
}

watch(router.currentRoute, (val) => {
  activeItem.value = val.path
})

onMounted(() => {
  activeItem.value = router.currentRoute.value.path
})
</script>

<template>
  <n-space flex justify-center items-center justify="space-around">
    <n-dropdown trigger="hover" :options="settingOptions" @select="handleSelect">
      <n-button icon-placement="left" quaternary>
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M30 8h-4.1c-.5-2.3-2.5-4-4.9-4s-4.4 1.7-4.9 4H2v2h14.1c.5 2.3 2.5 4 4.9 4s4.4-1.7 4.9-4H30V8zm-9 4c-1.7 0-3-1.3-3-3s1.3-3 3-3s3 1.3 3 3s-1.3 3-3 3z" fill="currentColor"></path><path d="M2 24h4.1c.5 2.3 2.5 4 4.9 4s4.4-1.7 4.9-4H30v-2H15.9c-.5-2.3-2.5-4-4.9-4s-4.4 1.7-4.9 4H2v2zm9-4c1.7 0 3 1.3 3 3s-1.3 3-3 3s-3-1.3-3-3s1.3-3 3-3z" fill="currentColor"></path></svg>
          </n-icon>
        </template>
        <p :class="activeItem.startsWith('/@admin/setting') ? 'text-green-600' : isDark ? 'text-white' : 'text-black'">{{ t('menu.setting.index') }}</p>
      </n-button>
    </n-dropdown>
    <n-button icon-placement="left" quaternary @click="routerPage('/@admin')">
      <template #icon>
        <n-icon>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 21h2v5h-2z" fill="currentColor"></path><path d="M20 16h2v10h-2z" fill="currentColor"></path><path d="M11 26a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3v-2a5 5 0 0 1 0 10z" fill="currentColor"></path><path d="M28 2H4a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2h24a2.003 2.003 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2zm0 9H14V4h14zM12 4v7H4V4zM4 28V13h24l.002 15z" fill="currentColor"></path></svg>
        </n-icon>
      </template>
      <p :class="activeItem === '/@admin' ? 'text-green-600' : isDark ? 'text-white' : 'text-black'">{{ t('menu.index') }}</p>
    </n-button>
    <n-dropdown trigger="hover" :options="systemOptions" @select="handleSelect">
      <n-button icon-placement="left" quaternary>
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M29 25h-2v-2h1v-4h-4v1h-2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z" fill="currentColor"></path><path d="M24 30h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1zm-5-2h4v-4h-4z" fill="currentColor"></path><path d="M15 19.858A3.993 3.993 0 1 1 20 16h2a6 6 0 1 0-7 5.91z" fill="currentColor"></path><path d="M28.89 13.55l-2.31 2.03l-1.42-1.42l2.41-2.12l-2.36-4.08l-3.44 1.16a9.368 9.368 0 0 0-2.7-1.57L18.36 4h-4.72l-.71 3.55a8.86 8.86 0 0 0-2.71 1.57L6.79 7.96l-2.36 4.08l2.72 2.39a8.895 8.895 0 0 0 0 3.13l-2.72 2.4l2.36 4.08l3.44-1.16a9.368 9.368 0 0 0 2.7 1.57l.71 3.55H15v2h-1.36a2 2 0 0 1-1.96-1.61l-.51-2.52a11.412 11.412 0 0 1-1.31-.75l-2.43.82a2.038 2.038 0 0 1-.64.1a1.973 1.973 0 0 1-1.73-1L2.7 20.96a2 2 0 0 1 .41-2.51l1.92-1.68C5.01 16.51 5 16.26 5 16s.02-.51.04-.76l-1.93-1.69a2 2 0 0 1-.41-2.51l2.36-4.08a1.973 1.973 0 0 1 1.73-1a2.038 2.038 0 0 1 .64.1l2.42.82a11.542 11.542 0 0 1 1.32-.75l.51-2.52A2 2 0 0 1 13.64 2h4.72a2 2 0 0 1 1.96 1.61l.51 2.52a11.412 11.412 0 0 1 1.31.75l2.43-.82a2.038 2.038 0 0 1 .64-.1a1.973 1.973 0 0 1 1.73 1l2.36 4.08a2 2 0 0 1-.41 2.51z" fill="currentColor"></path></svg>
          </n-icon>
        </template>
        <p :class="activeItem.startsWith('/@admin/system') ? 'text-green-600' : isDark ? 'text-white' : 'text-black'">{{ t('menu.system.index') }}</p>
      </n-button>
    </n-dropdown>
  </n-space>
</template>
