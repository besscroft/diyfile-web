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
  <el-container class="w-full h-full">
    <el-header class="diyfile-header">
      <Header />
    </el-header>
    <el-container v-if="!isMobile" style="height: calc(100% - 60px)">
      <PopMenu class="w-48 h-full" />
      <el-container>
        <el-main style="height: calc(100% - 60px)">
          <RouterView />
        </el-main>
        <el-footer>
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
.diyfile-header {
  --el-header-padding: 0px;
}
</style>
