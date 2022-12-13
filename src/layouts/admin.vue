<script setup lang="ts">
import { isDark } from '~/composables/dark'

const toggleTheme = () => {
  if (isDark.value) {
    // 恢复亮色主题
    document.body.removeAttribute('arco-theme')
  } else {
    // 设置为暗黑主题
    document.body.setAttribute('arco-theme', 'dark')
  }
  toggleDark()
}
</script>

<template>
  <a-layout>
    <a-layout-header>
      <Header @toggleTheme="toggleTheme" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider>
        6
      </a-layout-sider>
      <a-layout-content>
        <slot />
      </a-layout-content>
    </a-layout>
    <a-layout-footer>
      6
    </a-layout-footer>
  </a-layout>
</template>
