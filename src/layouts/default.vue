<script setup lang="ts">
const router = useRouter()
const props = ref<Boolean>(true)
// 控制菜单收缩
const menuStatus = ref<Boolean>(true)

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
</script>

<template>
  <el-container class="w-full h-full">
    <el-header class="w-full" style="border-bottom: 1px solid #e0e0e0;">
      <Header />
    </el-header>
    <el-container style="height: calc(100% - 60px)">
      <el-container>
        <el-main style="height: calc(100% - 60px)">
          <RouterView />
        </el-main>
        <el-footer style="border-top: 1px solid #e0e0e0;">
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
