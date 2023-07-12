<script setup lang="ts">
import type { DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownRenderOption } from 'naive-ui'
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
  <n-grid x-gap="12" :cols="12" h-full>
    <n-gi :span="isMobile ? 4 : 3" flex items-center>
      <span cursor-pointer inline-block h-10 w-32 rounded-lg ml-0.5 @click="routerPage('/')">
        <img
          src="/diyfile.png"
          :class="!isMobile ? 'transform scale-100' : 'transform scale-75'"
          alt="logo"
        >
      </span>
    </n-gi>
    <n-gi :span="isMobile ? 2 : 6" />
    <n-gi :span="isMobile ? 6 : 3" flex items-center justify-end mr-0.5rem>
      <n-dropdown :options="localesOptions || undefined" @select="toggleLocales">
        <n-button strong secondary circle>
          <template #icon>
            <n-icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                <path d="M27.85 29H30l-6-15h-2.35l-6 15h2.15l1.6-4h6.85zm-7.65-6l2.62-6.56L25.45 23z" fill="currentColor"></path>
                <path d="M18 7V5h-7V2H9v3H2v2h10.74a14.71 14.71 0 0 1-3.19 6.18A13.5 13.5 0 0 1 7.26 9h-2.1a16.47 16.47 0 0 0 3 5.58A16.84 16.84 0 0 1 3 18l.75 1.86A18.47 18.47 0 0 0 9.53 16a16.92 16.92 0 0 0 5.76 3.84L16 18a14.48 14.48 0 0 1-5.12-3.37A17.64 17.64 0 0 0 14.8 7z" fill="currentColor"></path>
              </svg>
            </n-icon>
          </template>
        </n-button>
      </n-dropdown>
      <n-button mx-1 strong secondary circle @click="toggleTheme">
        <template #icon>
          <n-icon v-if="isDark === 'dark_mode'">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M15 2h2v5h-2z" fill="currentColor"></path><path d="M21.687 8.9l3.506-3.507l1.414 1.415l-3.506 3.506z" fill="currentColor"></path><path d="M25 15h5v2h-5z" fill="currentColor"></path><path d="M21.687 23.1l1.414-1.414l3.506 3.506l-1.414 1.415z" fill="currentColor"></path><path d="M15 25h2v5h-2z" fill="currentColor"></path><path d="M5.394 25.192L8.9 21.686l1.414 1.415l-3.506 3.506z" fill="currentColor"></path><path d="M2 15h5v2H2z" fill="currentColor"></path><path d="M5.394 6.808l1.414-1.415L10.314 8.9L8.9 10.314z" fill="currentColor"></path><path d="M16 12a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path></svg>
          </n-icon>
          <n-icon v-else>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M15 2h2v5h-2z" fill="currentColor"></path><path d="M21.687 8.9l3.506-3.507l1.414 1.415l-3.506 3.506z" fill="currentColor"></path><path d="M25 15h5v2h-5z" fill="currentColor"></path><path d="M21.687 23.1l1.414-1.414l3.506 3.506l-1.414 1.415z" fill="currentColor"></path><path d="M15 25h2v5h-2z" fill="currentColor"></path><path d="M5.394 25.192L8.9 21.686l1.414 1.415l-3.506 3.506z" fill="currentColor"></path><path d="M2 15h5v2H2z" fill="currentColor"></path><path d="M5.394 6.808l1.414-1.415L10.314 8.9L8.9 10.314z" fill="currentColor"></path><path d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path></svg>
          </n-icon>
        </template>
      </n-button>
      <n-dropdown v-if="(user.userName && isMobile) || (user.userName && !router.currentRoute.value.path.startsWith('/@'))" :options="avatarOptions || undefined" @select="handleAvatarSelect">
        <n-avatar
          round
          size="medium"
          :src="user.avatar"
        />
      </n-dropdown>
      <n-button v-else-if="(!user.userName && isMobile) || (!user.userName && !router.currentRoute.value.path.startsWith('/@'))" icon-placement="left" secondary strong @click="routerPage('/@login')">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 30H14a2 2 0 0 1-2-2v-3h2v3h12V4H14v3h-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2z" fill="currentColor"></path><path d="M14.59 20.59L18.17 17H4v-2h14.17l-3.58-3.59L16 10l6 6l-6 6l-1.41-1.41z" fill="currentColor"></path></svg>
          </n-icon>
        </template>
        {{ t('button.login') }}
      </n-button>
    </n-gi>
  </n-grid>
</template>
