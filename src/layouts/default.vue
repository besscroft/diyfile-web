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
  <div>
    <n-layout position="absolute">
      <n-layout-header style="height: 60px" bordered>
        <Header @toggleTheme="toggleTheme" />
      </n-layout-header>
      <n-layout style="height: calc(100% - 120px)">
        <n-layout-content content-style="padding: 0.5rem;">
          <RouterView />
        </n-layout-content>
      </n-layout>
      <n-layout-footer style="height: 60px" bordered>
        <Footer />
      </n-layout-footer>
    </n-layout>
  </div>
<!--  <el-container class="w-full h-full">-->
<!--    <el-header class="w-full" style="border-bottom: 1px solid var(&#45;&#45;el-border-color-light);">-->
<!--      <Header @toggleTheme="toggleTheme" />-->
<!--    </el-header>-->
<!--    <el-container style="height: calc(100% - 60px)">-->
<!--      <el-container>-->
<!--        <el-main style="height: calc(100% - 60px);">-->
<!--          <RouterView />-->
<!--        </el-main>-->
<!--        <el-footer style="height: 60px; border-top: 1px solid var(&#45;&#45;el-border-color-light);">-->
<!--          <Footer />-->
<!--        </el-footer>-->
<!--      </el-container>-->
<!--    </el-container>-->
<!--  </el-container>-->
</template>
