<script setup lang="ts">
import { darkTheme } from 'naive-ui'

const user = useUserStore()
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
</script>

<template>
  <NConfigProvider
    class="w-full h-full"
    :theme="isDark ? darkTheme : undefined"
  >
    <Application>
      <RouterView />
    </Application>
  </NConfigProvider>
</template>
