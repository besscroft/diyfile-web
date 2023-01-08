<script setup lang="ts">
import { isDark } from '~/composables/dark'
import useDevice from '~/hooks/device'

const router = useRouter()
const { isMobile } = useDevice()
const props = ref<Boolean>(false)
// 控制菜单收缩
const menuStatus = ref<Boolean>(false)

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
  } else if (val === '3_3') {
    router.push('/@admin/system/faqs')
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
        v-if="!isMobile"
      >
        <PopMenu @routerPage="routerPage"/>
      </a-layout-sider>
      <a-layout-content v-if="isMobile" style="margin-bottom: 56px;">
        <RouterView />
      </a-layout-content>
      <a-layout-content v-else>
        <RouterView />
      </a-layout-content>
    </a-layout>
    <a-layout-footer v-if="isMobile" style="position: fixed; bottom: 0; width: 100%;">
      <MobileMenu @routerPage="routerPage" />
    </a-layout-footer>
    <a-layout-footer v-else>
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>
