<script setup lang="ts">
import { useTheme } from 'vuetify'

const router = useRouter()
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
</script>

<template>
  <el-container class="w-full h-full">
    <el-header class="w-full" style="border-bottom: 1px solid var(--el-border-color-light);">
      <Header @toggleTheme="toggleTheme" />
    </el-header>
    <el-container style="height: calc(100% - 60px)">
      <el-container>
        <el-main style="height: calc(100% - 60px);">
          <RouterView />
        </el-main>
        <el-footer style="height: 60px; border-top: 1px solid var(--el-border-color-light);">
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
