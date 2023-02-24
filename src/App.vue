<script setup lang="ts">
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import jaJP from '@arco-design/web-vue/es/locale/lang/ja-jp'

const user = useUserStore()
const locale = ref()
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: user.title || 'DiyFile',
  meta: [
    { name: 'DiyFile', content: '一款好看的在线文件列表程序，使用 Spring Boot 3 和 Vue 驱动🚀' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})

const handleLanguage = (item: any) => {
  if (item === 'en') {
    locale.value = enUS
    user.setLanguage('enUS')
  } else if (item === 'ja') {
    locale.value = jaJP
    user.setLanguage('jaJP')
  } else {
    locale.value = zhCN
    user.setLanguage('zhCN')
  }
}

/** 国际化监听处理 */
watch(user, (user) => {
  const localValue = localStorage.getItem('diyfile-locale')
  handleLanguage(localValue)
})

onMounted(() => {
  const localValue = localStorage.getItem('diyfile-locale')
  handleLanguage(localValue)
})
</script>

<template>
  <a-config-provider :locale="locale">
    <RouterView />
  </a-config-provider>
</template>
