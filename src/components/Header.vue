<script setup lang="ts">
import useDevice from '~/hooks/device'

// 路由状态
const props = defineProps(['value'])
const emit = defineEmits(['toggleTheme', 'onMenuCollapse'])
const { t, locale } = useI18n()
const router = useRouter()
const user = useUserStore()
const { isMobile } = useDevice()
const username = ref<String>('')
const avatar = ref<String>('')

const toggleTheme = () => {
  emit('toggleTheme')
}

const onMenuCollapse = () => {
  emit('onMenuCollapse')
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
  localStorage.setItem('Xanadu-locale', item)
}

/** 退出登录 */
const loginOut = () => {
  username.value = ''
  avatar.value = ''
  user.setToken('')
  user.setUserName('')
  user.setAvatar('')
  user.setTokenHead('')
  user.setRefreshToken('')
  router.push('/')
}

onMounted(() => {
  username.value = user.userName
  avatar.value = user.avatar
  const localValue = localStorage.getItem('Xanadu-locale')
  const localTheme = localStorage.getItem('Xanadu-theme')
  if (localValue) {
    locale.value = localValue
  } else {
    locale.value = 'zh-CN'
  }
  localTheme === 'dark' ? document.body.setAttribute('arco-theme', 'dark') : document.body.removeAttribute('arco-theme')
})
</script>

<template>
  <a-row class="grid-demo">
    <a-col class="title-container" :xs="8" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
      <div v-if="props.value || isMobile">
        Xanadu
      </div>
      <div v-else>
        <a-button shape="circle" @click="onMenuCollapse">
          <icon-list />
        </a-button>
      </div>
    </a-col>
    <a-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
      <div class="content-container">
      </div>
    </a-col>
    <a-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
      <div class="avatar-container">
        <a-space size="large">
          <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleTheme">
            <div i="carbon-sun dark:carbon-moon" />
          </button>
          <a-dropdown>
            <a-button shape="circle" aria-label="language">
              <template #icon>
                <icon-language />
              </template>
            </a-button>
            <template #content>
              <a-doption @click="toggleLocales('zh-CN')">简体中文</a-doption>
              <a-doption @click="toggleLocales('en')">English</a-doption>
              <a-doption @click="toggleLocales('ja')">日本語</a-doption>
            </template>
          </a-dropdown>
          <a-tag color="#FBC3CB" v-show="username">{{ username }}</a-tag>
          <a-dropdown>
            <a-avatar :size="40" v-if="avatar">
              <img
                alt="avatar"
                :src="avatar"
              />
            </a-avatar>
            <a-avatar v-else :style="{ backgroundColor: '#FBC3CB' }">
              <IconUser />
            </a-avatar>
            <template #content>
              <div v-if="username">
                <a-doption @click="routerPage('')">{{ props.value ? t('button.admin') : t('button.home') }}</a-doption>
                <a-doption @click="routerPage('/@admin')" v-if="router.currentRoute.value.path !== '/@admin' && router.currentRoute.value.path !== '/'">{{ t('menu.index') }}</a-doption>
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
