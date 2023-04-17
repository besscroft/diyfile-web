<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['routerPage'])
const { t } = useI18n()
const router = useRouter()
const user = useUserStore()
const activeItem = ref<string>('')

/** 点击菜单事件 */
const routerPage = (val: string) => {
  emit('routerPage', val)
}

/** 退出登录 */
const loginOut = () => {
  localStorage.setItem('user', '')
  localStorage.setItem('diyfile-token', '')
  window.location.href = '/'
}

watch(router.currentRoute, (val) => {
  activeItem.value = val.path
})

onMounted(() => {
  activeItem.value = router.currentRoute.value.path
})
</script>

<template>
  <v-list nav class="flex flex-column">
    <v-list-item
      :prepend-avatar="user.avatar"
      :title="user.userName"
      :subtitle="user.roleCode"
    />
    <v-divider />
    <v-list-item :active="activeItem === '/@admin'" prepend-icon="dashboard" :title="t('menu.index')" @click="routerPage('admin')" />
    <v-list-item :active="activeItem === '/@admin/setting/storage'" prepend-icon="dns" :title="t('menu.setting.storage')" @click="routerPage('2_0')" />
    <v-list-item :active="activeItem === '/@admin/setting/backup'" prepend-icon="restore" :title="t('menu.setting.backup')" @click="routerPage('2_1')" />
    <v-list-item :active="activeItem === '/@admin/setting/sync'" prepend-icon="sync" :title="t('menu.setting.sync')" @click="routerPage('2_2')" />
    <v-list-item :active="activeItem === '/@admin/system/setting'" prepend-icon="settings_applications" :title="t('menu.system.setting')" @click="routerPage('3_0')" />
    <v-list-item :active="activeItem === '/@admin/system/user'" prepend-icon="supervisor_account" :title="t('menu.system.user')" @click="routerPage('3_1')" />
    <div class="flex flex-col mt-auto space-y-1">
      <v-btn class="flex-grow-1" @click="routerPage('/')">{{ t('button.home') }}</v-btn>
      <v-btn class="flex-grow-1" @click="loginOut">{{ t('button.quit') }}</v-btn>
    </div>
  </v-list>
</template>
