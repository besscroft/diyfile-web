<script setup lang="ts">
import { useTheme } from 'vuetify'

const router = useRouter()
const { isMobile } = useDevice()
const theme = useTheme()

const toggleTheme = () => {
  if (isDark.value) {
    // 恢复亮色主题
    localStorage.setItem('diyfile-theme', 'light')
    theme.global.name.value = 'light'
  } else {
    // 设置为暗黑主题
    localStorage.setItem('diyfile-theme', 'dark')
    theme.global.name.value = 'dark'
  }
  toggleDark()
}

/** 路由切换 */
const routerPage = (val: string) => {
  if (val === '/') {
    router.push('/')
  } else if (val === '2_0') {
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
  <div>
    <n-layout position="absolute">
      <n-layout-header style="height: 60px" bordered>
        <Header @toggleTheme="toggleTheme" />
      </n-layout-header>
      <n-layout has-sider position="absolute" style="margin-top: 60px; height: calc(100% - 60px)">
        <n-layout-sider v-if="!isMobile" bordered collapse-mode="width" width="188">
          <PopMenu class="h-full" @routerPage="routerPage" />
        </n-layout-sider>
        <n-layout class="h-full">
          <n-layout-content content-style="padding: 0.25rem;" style="height: calc(100% - 60px)">
            <RouterView />
          </n-layout-content>
          <n-layout-footer v-if="isMobile" style="height: 60px">
            <MobileMenu style="height: 60px" @routerPage="routerPage" />
          </n-layout-footer>
          <n-layout-footer v-else style="height: 60px">
            <Footer style="height: 60px" />
          </n-layout-footer>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>
