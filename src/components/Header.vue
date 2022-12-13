<script setup lang="ts">
const emit = defineEmits(['toggleTheme'])
const { t, availableLocales, locale } = useI18n()
const username = ref<String>('旅行者')
const avatar = ref<String>('')

const toggleTheme = () => {
  emit('toggleTheme')
}
</script>

<template>
  <a-row class="grid-demo">
    <a-col class="title-container" :xs="8" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
      <icon-sun-fill /> Xanadu
    </a-col>
    <a-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
      <div class="content-container">
      </div>
    </a-col>
    <a-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" :xxl="8">
      <div class="avatar-container">
        <a-space size="large">
          <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleTheme">
            <div i="carbon-sun dark:carbon-moon" />
          </button>
          <a-dropdown>
            <a-button shape="circle">
              <template #icon>
                <icon-language />
              </template>
            </a-button>
            <template #content>
              <a-doption>简体中文</a-doption>
              <a-doption>English</a-doption>
            </template>
          </a-dropdown>
          <a-tag color="#168cff" v-show="username">{{ username }}</a-tag>
          <a-dropdown>
            <a-avatar :size="40" v-if="avatar">
              <img
                alt="avatar"
                :src="avatar"
              />
            </a-avatar>
            <a-avatar :size="40" :style="{ backgroundColor: '#14a9f8' }" v-else>{{ t('button.noLogin') }}</a-avatar>
            <template #content>
              <div v-if="username">
                <a-doption @click="routerPage('')">{{ props.value ? t('button.admin') : t('button.home') }}</a-doption>
                <a-doption @click="routerPage('/admin')" v-if="!props.value && isMobile">{{ t('menu.index') }}</a-doption>
                <a-doption @click="loginOut">{{ t('button.quit') }}</a-doption>
              </div>
              <div v-else>
                <a-doption @click="routerPage('/')">{{ t('button.home') }}</a-doption>
                <a-doption @click="routerPage('/login')">{{ t('button.login') }}</a-doption>
              </div>
            </template>
          </a-dropdown>
        </a-space>
      </div>
    </a-col>
  </a-row>
</template>

<style scoped>
.grid-demo {
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.avatar-container {
  height: 60px;
  line-height: 60px;
  padding-right: 16px;
  display: flex;
  justify-content: flex-end;
}

.title-container {
  display: flex;
  justify-content: flex-start;
  height: 60px;
  padding-left: 8px;
  line-height: 60px;
}

.content-container {
  display: flex;
  justify-content: center;
  height: 60px;
  line-height: 60px;
}
</style>
