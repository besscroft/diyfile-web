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
const { isMobile } = useDevice()

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

const clickHandle = () => {
  console.log('点击了')
  // menuStatus.value = !menuStatus.value
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
  <el-row :gutter="20" class="h-full w-full flex justify-center items-center">
    <el-col :span="4">
      <span class="cursor-pointer inline-block h-10 w-32 rounded-lg" @click="routerPage('/')">
        <img
          src="/diyfile.png"
          :class="!isMobile ? 'transform scale-100' : 'transform scale-75'"
          alt="logo"
        >
      </span>
    </el-col>
    <el-col :span="16">
      <div v-if="!isMobile" class="flex gap-4 justify-center items-center">
        <a
          href="https://doc.diyfile.besscroft.com/"
          target="_blank"
          class="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
        >
          <v-icon icon="explore" />
        </a>
        <a
          href="https://github.com/besscroft/diyfile"
          target="_blank"
          class="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
        >
          <v-icon icon="question_answer" />
        </a>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="avatar-container">
        <el-dropdown v-if="user.userName">
          <el-avatar
            alt="avatar"
            :src="user.avatar"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="!router.currentRoute.value.path.startsWith('/@')" @click="routerPage('/@admin')">
                {{ t('menu.index') }}
              </el-dropdown-item>
              <el-dropdown-item v-else @click="routerPage('/')">
                {{ t('button.home') }}
              </el-dropdown-item>
              <el-dropdown-item v-if="user.token" @click="loginOut">
                {{ t('button.quit') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <v-btn v-else prepend-icon="login" @click="routerPage('/@login')">
          {{ t('button.login') }}
        </v-btn>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.avatar-container {
  height: 60px;
  line-height: 60px;
  margin-right: -24px;
  display: flex;
  justify-content: flex-end;
  /** 垂直居中 */
  align-items: center;
}
</style>
