<script setup lang="ts">
import type { DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownRenderOption } from 'naive-ui'
import { useTheme } from 'vuetify'
import { getSiteTitle } from '~/api/modules/systemConfig'

// 路由状态
const props = defineProps(['value'])
const emit = defineEmits(['toggleTheme'])
const { t, locale } = useI18n()
const router = useRouter()
const user = useUserStore()
const username = ref<string>('')
const avatar = ref<string>('')
const { isMobile } = useDevice()
const showDropdownRef = ref(false)
const theme = useTheme()

const toggleTheme = () => {
  emit('toggleTheme')
}

const localesOptions = ref<Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>>([
  {
    label: '简体中文',
    key: 'zh-CN',
  },
  {
    label: 'English',
    key: 'en',
  },
  {
    label: '日本語',
    key: 'ja',
  },
])
const avatarOptions = ref<Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>>([])

/** 路由切换 */
const routerPage = (val: string) => {
  if (val) {
    router.push(val)
  } else {
    if (props.value) {
      router.push('/@admin')
    } else {
      router.push('/')
    }
  }
}

/** 退出登录 */
const loginOut = () => {
  localStorage.setItem('user', '')
  localStorage.setItem('diyfile-token', '')
  window.location.href = '/'
}

/** 头像下拉框操作 */
const handleAvatarSelect = (key: string) => {
  if (key === 'index') {
    routerPage('/@admin')
  } else if (key === 'home') {
    routerPage('/')
  } else if (key === 'quit') {
    loginOut()
  }
  showDropdownRef.value = false
}

/** 切换语言 */
const toggleLocales = (item: any) => {
  showDropdownRef.value = false
  locale.value = item
  user.setLanguage(item)
  localStorage.setItem('diyfile-locale', item)
}

onMounted(() => {
  username.value = user.userName
  avatar.value = user.avatar
  const localValue = localStorage.getItem('diyfile-locale')
  const localTheme = localStorage.getItem('diyfile-theme')
  if (localValue) {
    locale.value = localValue
  } else {
    locale.value = 'zh-CN'
  }
  localTheme === 'dark' || isDark.value ? theme.global.name.value = 'dark' : theme.global.name.value = 'light'
  if (!user.title) {
    getSiteTitle().then((res) => {
      if (res.code === 200) {
        user.setTitle(res.data.toString())
      }
    })
  }
  // 头像下拉框数组参数设置
  avatarOptions.value = []
  if (!router.currentRoute.value.path.startsWith('/@')) {
    avatarOptions.value.push({
      label: t('menu.index'),
      key: 'index',
    })
  } else {
    avatarOptions.value.push({
      label: t('button.home'),
      key: 'home',
    })
  }
  if (user.token) {
    avatarOptions.value.push({
      label: t('button.quit'),
      key: 'quit',
    })
  }
})
</script>

<template>
  <n-grid x-gap="12" :cols="12" class="h-full">
    <n-gi :span="isMobile ? 4 : 3" class="flex items-center">
      <span class="cursor-pointer inline-block h-10 w-32 rounded-lg ml-0.5" @click="routerPage('/')">
        <img
          src="/diyfile.png"
          :class="!isMobile ? 'transform scale-100' : 'transform scale-75'"
          alt="logo"
        >
      </span>
    </n-gi>
    <n-gi :span="isMobile ? 2 : 6" />
    <n-gi :span="isMobile ? 6 : 3" class="flex items-center justify-end mr-0.5rem">
      <n-dropdown :options="localesOptions || undefined" @select="toggleLocales">
        <v-btn icon="translate" variant="text" size="x-small" />
      </n-dropdown>
      <v-btn variant="text" class="mx-2" size="x-small" :icon="isDark ? 'dark_mode' : 'light_mode'" @click="toggleTheme" />
      <n-dropdown v-if="(user.userName && isMobile) || (user.userName && !router.currentRoute.value.path.startsWith('/@'))" :options="avatarOptions || undefined" @select="handleAvatarSelect">
        <n-avatar
          round
          size="medium"
          :src="user.avatar"
        />
      </n-dropdown>
      <v-btn v-else-if="(!user.userName && isMobile) || (!user.userName && !router.currentRoute.value.path.startsWith('/@'))" prepend-icon="login" @click="routerPage('/@login')">
        {{ t('button.login') }}
      </v-btn>
    </n-gi>
  </n-grid>
</template>
