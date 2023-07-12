<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { MenuOption } from 'naive-ui'
import { renderIcon } from '~/utils/renderUtil'

const emit = defineEmits(['routerPage'])
const { t } = useI18n()
const router = useRouter()
const user = useUserStore()
const activeItem = ref<string | null>(null)

function routerPage(key: string) {
  emit('routerPage', key)
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          onClick: () => routerPage('admin'),
        },
        t('menu.index'),
      ),
    key: 'menu-index',
    icon: () => renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M5.646 9.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L7.293 11.5L5.646 9.854a.5.5 0 0 1 0-.708zM14.5 13h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM2.996 5.5a2.5 2.5 0 0 1 2.5-2.5h9a2.5 2.5 0 0 1 2.5 2.5V6H17v1h-.003v7.5a2.5 2.5 0 0 1-2.5 2.5h-9a2.5 2.5 0 0 1-2.5-2.5v-9zm13 .5v-.5a1.5 1.5 0 0 0-1.5-1.5h-9a1.5 1.5 0 0 0-1.5 1.5V6h12zm-12 1v7.5a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V7h-12z" fill="currentColor"></path></g></svg>'),
  },
  {
    label: () =>
      h(
        'a',
        {
          onClick: () => routerPage('2_0'),
        },
        t('menu.setting.storage'),
      ),
    key: 'menu-setting-storage',
    icon: () => renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M4 21H2v3a2.006 2.006 0 0 0 2 2h3v-2H4z" fill="currentColor"></path><path d="M4 8h3V6H4a2.006 2.006 0 0 0-2 2v3h2z" fill="currentColor"></path><path d="M17 6h6v2h-6z" fill="currentColor"></path><path d="M9 6h6v2H9z" fill="currentColor"></path><path d="M17 24h6v2h-6z" fill="currentColor"></path><path d="M28 15H4v-2H2v6h2v-2h24v2h2v-6h-2v2z" fill="currentColor"></path><path d="M28 24h-3v2h3a2.006 2.006 0 0 0 2-2v-3h-2z" fill="currentColor"></path><path d="M28 6h-3v2h3v3h2V8a2.006 2.006 0 0 0-2-2z" fill="currentColor"></path><path d="M9 24h6v2H9z" fill="currentColor"></path><circle cx="7" cy="12" r="1" fill="currentColor"></circle><circle cx="7" cy="20" r="1" fill="currentColor"></circle></svg>'),
  },
  {
    label: () =>
      h(
        'a',
        {
          onClick: () => routerPage('2_1'),
        },
        t('menu.setting.backup'),
      ),
    key: 'menu-setting-backup',
    icon: () => renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2s.9 2 2 2s2-.9 2-2zm-2-9a9 9 0 0 0-9 9H0l4 4l4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7a6.995 6.995 0 0 1-11.06 5.7l-1.42 1.44A9 9 0 1 0 12 3z" fill="currentColor"></path></svg>'),
  },
  {
    label: () =>
      h(
        'a',
        {
          onClick: () => routerPage('2_2'),
        },
        t('menu.setting.sync'),
      ),
    key: 'menu-setting-sync',
    icon: () => renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M6.087 7.75a5.752 5.752 0 0 1 11.326 0h.087a4 4 0 0 1 3.962 4.552a6.534 6.534 0 0 0-1.597-1.364A2.501 2.501 0 0 0 17.5 9.25h-.756a.75.75 0 0 1-.75-.713a4.25 4.25 0 0 0-8.489 0a.75.75 0 0 1-.749.713H6a2.5 2.5 0 0 0 0 5h4.4a6.458 6.458 0 0 0-.357 1.5H6a4 4 0 0 1 0-8h.087zM11 16.5a5.5 5.5 0 1 0 11 0a5.5 5.5 0 0 0-11 0zm8.5-3.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h1a2.496 2.496 0 0 0-2-1c-.833 0-1.572.407-2.027 1.036a.5.5 0 0 1-.81-.586A3.496 3.496 0 0 1 16.5 13c.98 0 1.865.403 2.5 1.05v-.55a.5.5 0 0 1 .5-.5zM14 18.95v.55a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-1c.456.608 1.183 1 2 1c.766 0 1.452-.344 1.911-.888a.5.5 0 0 1 .764.645A3.493 3.493 0 0 1 16.5 20a3.49 3.49 0 0 1-2.5-1.05z" fill="currentColor"></path></g></svg>'),
  },
  {
    label: () =>
      h(
        'a',
        {
          onClick: () => routerPage('3_0'),
        },
        t('menu.system.setting'),
      ),
    key: 'menu-system-setting',
    icon: () => renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M27 16.76V16v-.77l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51zM25.21 24l-3.43-1.16a8.86 8.86 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.36 9.36 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.86 8.86 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.36 9.36 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20z" fill="currentColor"></path><path d="M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6zm0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4z" fill="currentColor"></path></svg>'),
  },
  {
    label: () =>
      h(
        'a',
        {
          onClick: () => routerPage('3_1'),
        },
        t('menu.system.user'),
      ),
    key: 'menu-system-user',
    icon: () => renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M30 30h-2v-5a5.006 5.006 0 0 0-5-5v-2a7.008 7.008 0 0 1 7 7z" fill="currentColor"></path><path d="M22 30h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7z" fill="currentColor"></path><path d="M20 2v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14z" fill="currentColor"></path><path d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z" fill="currentColor"></path></svg>'),
  },
  {
    label: () =>
      h(
        'a',
        {
          onClick: () => routerPage('3_2'),
        },
        t('menu.system.manual'),
      ),
    key: 'menu-system-manual',
    icon: () => renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M14.819 11.795a3.724 3.724 0 1 0-1.024 1.024l2.476 2.475l.067.058l.008.006a.724.724 0 0 0 .942-1.093l-2.47-2.47zm-3.095-4.348a2.276 2.276 0 1 1 0 4.553a2.276 2.276 0 0 1 0-4.553zM6.5 2A2.5 2.5 0 0 0 4 4.5v15A2.5 2.5 0 0 0 6.5 22h13.25a.75.75 0 0 0 0-1.5H6.5a1 1 0 0 1-1-1h14.25a.75.75 0 0 0 .75-.75V4.5A2.5 2.5 0 0 0 18 2H6.5zM19 18H5.5V4.5a1 1 0 0 1 1-1H18a1 1 0 0 1 1 1V18z" fill="currentColor"></path></g></svg>'),
  },
]

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
  const path = router.currentRoute.value.path
  if (path === '/@admin') {
    activeItem.value = 'menu-index'
  } else if (path === '/@admin/setting/storage') {
    activeItem.value = 'menu-setting-storage'
  } else if (path === '/@admin/setting/backup') {
    activeItem.value = 'menu-setting-backup'
  } else if (path === '/@admin/setting/sync') {
    activeItem.value = 'menu-setting-sync'
  } else if (path === '/@admin/system/setting') {
    activeItem.value = 'menu-system-setting'
  } else if (path === '/@admin/system/user') {
    activeItem.value = 'menu-system-user'
  } else if (path === '/@admin/system/manual') {
    activeItem.value = 'menu-system-manual'
  }
})
</script>

<template>
  <div flex flex-col>
    <div flex mt-1>
      <div flex justify-center items-center h-10 class="w-1/4">
        <n-avatar
          round
          size="large"
          :src="user.avatar"
        />
      </div>
      <div flex flex-col h-10 pl-1 class="w-3/4">
        <n-gradient-text
          gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
        >
          {{ user.userName }}
        </n-gradient-text>
        <n-tooltip trigger="hover">
          <template #trigger>
            {{ user.roleCode.slice(0, 14) + '...' }}
          </template>
          {{ user.roleCode }}
        </n-tooltip>
      </div>
    </div>
    <n-menu v-model:value="activeItem" :options="menuOptions" />
    <div flex flex-col mta space-y-1>
      <n-button type="tertiary" @click="routerPage('/')">
        {{ t('button.home') }}
      </n-button>
      <n-button mb1 type="tertiary" @click="loginOut">
        {{ t('button.quit') }}
      </n-button>
    </div>
  </div>
</template>
