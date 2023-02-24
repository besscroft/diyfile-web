<script setup lang="ts">
const router = useRouter()
const { isMobile } = useDevice()
const props = ref<Boolean>(false)
// 控制菜单收缩
const menuStatus = ref<Boolean>(false)

const toggleTheme = () => {
  if (isDark.value) {
    // 恢复亮色主题
    document.body.removeAttribute('arco-theme')
    localStorage.setItem('diyfile-theme', 'light')
  } else {
    // 设置为暗黑主题
    document.body.setAttribute('arco-theme', 'dark')
    localStorage.setItem('diyfile-theme', 'dark')
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
    router.push('/@admin/setting/backup')
  } else if (val === '2_2') {
    router.push('/@admin/setting/sync')
  } else if (val === '3_0') {
    router.push('/@admin/system/setting')
  } else if (val === '3_1') {
    router.push('/@admin/system/user')
  } else if (val === '3_2') {
    router.push('/@admin/system/faqs')
  } else {
    router.push('/@admin')
  }
}
</script>

<template>
  <a-layout style="height: 100%;">
    <a-layout-header>
      <Header :value="props" @toggleTheme="toggleTheme" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-if="!isMobile"
        hide-trigger
        collapsible
        :collapsed="menuStatus"
      >
        <PopMenu @onMenuCollapse="onMenuCollapse" @routerPage="routerPage" />
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
