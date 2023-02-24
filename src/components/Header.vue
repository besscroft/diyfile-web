<script setup lang="ts">
import { getSiteTitle } from '~/api/modules/systemConfig'

// 路由状态
const props = defineProps(['value'])
const emit = defineEmits(['toggleTheme'])
const { t, locale } = useI18n()
const router = useRouter()
const user = useUserStore()
const username = ref<String>('')
const avatar = ref<String>('')

const toggleTheme = () => {
  emit('toggleTheme')
}

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

/** 切换语言 */
const toggleLocales = (item: any) => {
  locale.value = item
  user.setLanguage(item)
  localStorage.setItem('diyfile-locale', item)
}

/** 退出登录 */
const loginOut = () => {
  username.value = ''
  avatar.value = ''
  localStorage.setItem('user', '')
  localStorage.setItem('diyfile-token', '')
  window.location.href = '/'
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
  localTheme === 'dark' || isDark.value ? document.body.setAttribute('arco-theme', 'dark') : document.body.removeAttribute('arco-theme')
  if (!user.title) {
    getSiteTitle().then((res) => {
      if (res.code === 200) {
        user.setTitle(res.data.toString())
      }
    })
  }
})
</script>

<template>
  <a-row class="grid-demo">
    <a-col class="title-container" :xs="8" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
      <div class="cursor-pointer" @click="routerPage('/')">
        {{ user.title || 'DiyFile' }}
      </div>
    </a-col>
    <a-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
      <div class="content-container">
      </div>
    </a-col>
    <a-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
      <div class="avatar-container">
        <a-space size="large">
          <button class="icon-btn !outline-none" :title="t('button.toggle_dark')" @click="toggleTheme">
            <div i="carbon-sun dark:carbon-moon" />
          </button>
          <a-dropdown>
            <a class="icon-btn">
              <div i-carbon-language />
            </a>
            <template #content>
              <a-doption @click="toggleLocales('zh-CN')">简体中文</a-doption>
              <a-doption @click="toggleLocales('en')">English</a-doption>
              <a-doption @click="toggleLocales('ja')">日本語</a-doption>
            </template>
          </a-dropdown>
          <span
            v-show="username"
            class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700"
          >
            {{ username }}
          </span>
          <a-dropdown>
            <a-avatar v-if="avatar" :size="40">
              <img
                class="cursor-pointer"
                alt="avatar"
                :src="avatar"
              />
            </a-avatar>
            <a-avatar v-else :style="{ backgroundColor: '#FBC3CB' }">
              <IconUser class="cursor-pointer" />
            </a-avatar>
            <template #content>
              <div v-if="username">
                <a-doption v-if="!router.currentRoute.value.path.startsWith('/@') && router.currentRoute.value.path !== '/'" @click="routerPage('/@admin')">{{ t('menu.index') }}</a-doption>
                <a-doption v-else @click="routerPage('/')">{{ t('button.home') }}</a-doption>
                <a-doption @click="loginOut">{{ t('button.quit') }}</a-doption>
              </div>
              <div v-else>
                <a-doption v-if="!props" @click="routerPage('/')">{{ t('button.home') }}</a-doption>
                <a-doption @click="routerPage('/@login')">{{ t('button.login') }}</a-doption>
              </div>
            </template>
          </a-dropdown>
        </a-space>
      </div>
    </a-col>
  </a-row>
</template>

<style scoped>
.grid-demo {
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.avatar-container {
  height: 60px;
  line-height: 60px;
  padding-right: 16px;
  display: flex;
  justify-content: flex-end;
}

.title-container {
  display: flex;
  justify-content: flex-start;
  height: 60px;
  padding-left: 8px;
  line-height: 60px;
}

.content-container {
  display: flex;
  justify-content: center;
  height: 60px;
  line-height: 60px;
}
</style>
