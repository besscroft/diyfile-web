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
  <n-space class="flex justify-center items-center justify-space-around">
    <n-dropdown trigger="hover" :options="settingOptions" @select="handleSelect">
      <v-btn value="setting" variant="text" :active="activeItem.startsWith('/@admin/setting')">
        <v-icon>restore</v-icon>
        {{ t('menu.setting.index') }}
      </v-btn>
    </n-dropdown>
    <v-btn value="index" variant="text" :active="activeItem === '/@admin'" @click="routerPage('/@admin')">
      <v-icon>dashboard</v-icon>
      {{ t('menu.index') }}
    </v-btn>
    <n-dropdown trigger="hover" :options="systemOptions" @select="handleSelect">
      <v-btn value="system" variant="text" :active="activeItem.startsWith('/@admin/system')">
        <v-icon>settings_suggest</v-icon>
        {{ t('menu.system.index') }}
      </v-btn>
    </n-dropdown>
  </n-space>
</template>
