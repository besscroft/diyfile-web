<script setup lang="ts">
import { isDark } from '~/composables/dark'

const router = useRouter()
const props = ref<Boolean>(false)
// 控制菜单收缩
const menuStatus = ref<Boolean>(true)

const toggleTheme = () => {
  if (isDark.value) {
    // 恢复亮色主题
    document.body.removeAttribute('arco-theme')
    localStorage.setItem('Xanadu-theme', 'light')
  } else {
    // 设置为暗黑主题
    document.body.setAttribute('arco-theme', 'dark')
    localStorage.setItem('Xanadu-theme', 'dark')
  }
  toggleDark()
}

const onMenuCollapse = () => {
  menuStatus.value = !menuStatus.value
}

/** 路由切换 */
const routerPage = (val: string) => {
  if (val === '2_0') {
    router.push('/@admin/setting/storage')
  } else if (val === '2_1') {
    router.push('/@admin/setting/cdn')
  } else if (val === '3_0') {
    router.push('/@admin/system/setting')
  } else if (val === '3_1') {
    router.push('/@admin/system/user')
  } else if (val === '3_2') {
    router.push('/@admin/system/about')
  } else {
    router.push('/@admin')
  }
}
</script>

<template>
  <a-layout style="height: 100%;">
    <a-layout-header>
      <Header @onMenuCollapse="onMenuCollapse" @toggleTheme="toggleTheme" :value="props" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        hide-trigger
        collapsible
        :collapsed="menuStatus"
      >
        <PopMenu @routerPage="routerPage"/>
      </a-layout-sider>
      <a-layout-content>
        <RouterView />
      </a-layout-content>
    </a-layout>
    <a-layout-footer>
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>
