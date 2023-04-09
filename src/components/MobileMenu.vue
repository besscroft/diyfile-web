<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['routerPage'])
const { t } = useI18n()
const router = useRouter()
const activeItem = ref<string>('')

/** 点击菜单事件 */
const routerPage = (val: string) => {
  emit('routerPage', val)
}

watch(router.currentRoute, (val) => {
  activeItem.value = val.path
})

onMounted(() => {
  activeItem.value = router.currentRoute.value.path
})
</script>

<template>
  <el-row class="row-bg h-full items-center" justify="space-between">
    <el-col :span="6">
      <el-dropdown>
        <v-btn value="setting" variant="text" :active="activeItem.startsWith('/@admin/setting')">
          <v-icon>restore</v-icon>
          {{ t('menu.setting.index') }}
        </v-btn>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="routerPage('2_0')">{{ t('menu.setting.storage') }}</el-dropdown-item>
            <el-dropdown-item @click="routerPage('2_1')">{{ t('menu.setting.backup') }}</el-dropdown-item>
            <el-dropdown-item @click="routerPage('2_2')">{{ t('menu.setting.sync') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
    <el-col :span="6">
      <v-btn value="index" variant="text" :active="activeItem === '/@admin'" @click="routerPage('/@admin')">
        <v-icon>dashboard</v-icon>
        {{ t('menu.index') }}
      </v-btn>
    </el-col>
    <el-col :span="6"><el-dropdown>
      <v-btn value="system" variant="text" :active="activeItem.startsWith('/@admin/system')">
        <v-icon>settings_suggest</v-icon>
        {{ t('menu.system.index') }}
      </v-btn>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="routerPage('3_0')">{{ t('menu.system.setting') }}</el-dropdown-item>
          <el-dropdown-item @click="routerPage('3_1')">{{ t('menu.system.user') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown></el-col>
  </el-row>
</template>

<style scoped>
</style>
