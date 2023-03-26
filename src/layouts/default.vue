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

const onMenuCollapse = () => {
  menuStatus.value = !menuStatus.value
}
</script>

<template>
  6
</template>
