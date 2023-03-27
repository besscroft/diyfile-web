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
const menuStatus = ref<Boolean>(false)

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
  <div class="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
    <div class="flex items-center sm:justify-between sm:gap-4">
      <div class="relative hidden sm:block">
        <label class="sr-only" for="search"> Search </label>

        <input
          class="h-10 w-full rounded-lg border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56"
          id="search"
          type="search"
          placeholder="Search website..."
        />

        <button
          type="button"
          class="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
        >
          <span class="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      <div
        class="flex flex-1 items-center justify-between gap-8 sm:justify-end"
      >
        <div class="flex gap-4">
          <button
            type="button"
            class="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 sm:hidden"
          >
            <span class="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <a
            href="https://doc.diyfile.besscroft.com/"
            target="_blank"
            class="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
          >
            <v-icon icon="explore"></v-icon>
          </a>

          <a
            href="https://github.com/besscroft/diyfile"
            target="_blank"
            class="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
          >
            <v-icon icon="question_answer"></v-icon>
          </a>
        </div>

        <button
          v-if="user.userName"
          type="button"
          class="group flex shrink-0 items-center rounded-lg transition"
        >
          <img
            alt="Man"
            :src="user.avatar"
            class="h-10 w-10 rounded-full object-cover"
          />

          <p class="ml-2 hidden text-left text-xs sm:block">
            <strong class="block font-medium">{{ user.userName }}</strong>

            <span class="text-gray-500">{{ user.roleCode }}</span>
          </p>

          <v-menu
            open-on-hover
          >
            <template v-slot:activator="{ props }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
                viewBox="0 0 20 20"
                fill="currentColor"
                @click="clickHandle"
                v-bind="props"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title v-if="!router.currentRoute.value.path.startsWith('/@')" @click="routerPage('/@admin')">{{ t('menu.index') }}</v-list-item-title>
                <v-list-item-title v-else @click="routerPage('/')">{{ t('button.home') }}</v-list-item-title>
                <v-list-item-title v-if="user.token" @click="loginOut">{{ t('button.quit') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </button>
        <v-btn v-else prepend-icon="login" @click="routerPage('/@login')">
          {{ t('button.login') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>
