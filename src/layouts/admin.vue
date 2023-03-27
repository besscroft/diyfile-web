<script setup lang="ts">
const router = useRouter()
const { isMobile } = useDevice()

const toggleTheme = () => {
  if (isDark.value) {
    // 恢复亮色主题
    localStorage.setItem('diyfile-theme', 'light')
  } else {
    // 设置为暗黑主题
    localStorage.setItem('diyfile-theme', 'dark')
  }
  toggleDark()
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
  <el-container class="w-full h-full">
    <el-header class="w-full" style="border-bottom: 1px solid #e0e0e0;">
      <Header />
    </el-header>
    <el-container v-if="!isMobile" style="height: calc(100% - 60px)">
      <PopMenu class="w-48 h-full" @routerPage="routerPage" style="border-right: 1px solid #e0e0e0;" />
      <el-container>
        <el-main style="height: calc(100% - 60px)">
          <RouterView />
        </el-main>
        <el-footer style="border-top: 1px solid #e0e0e0;">
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
    <el-container v-else style="height: calc(100% - 60px)">
      <el-container>
        <el-main style="height: calc(100% - 60px)">
          <RouterView />
        </el-main>
        <el-footer>
          <MobileMenu />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>

</style>
