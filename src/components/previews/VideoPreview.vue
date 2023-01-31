<script setup lang="ts">
import DPlayer from 'dplayer'

const fileInfo = defineProps(['value'])
const { text, copy, copied, isSupported } = useClipboard(fileInfo.value.url)
const { t } = useI18n()

const initPlayer = () => {
  const url = fileInfo.value.url
  const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    autoplay: false,
    theme: '#0093ff',
    loop: true,
    lang: 'zh-cn',
    screenshot: true,
    airplay: true,
    hotkey: true,
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    video: {
      url,
    },
  })
}

onMounted(() => {
  initPlayer()
})
</script>

<template>
  <div id="dplayer"></div>
  <a-divider></a-divider>
  <a-alert :show-icon="false">正在预览：{{ fileInfo.value.name }}，如果格式不支持，请切换浏览器或者编码器！</a-alert>
  <a-divider orientation="left">{{ t('table.Optional') }}</a-divider>
  <a-space wrap>
    <a className="cursor-pointer rounded px-1.5 py-1 hover:bg-gray-300 dark:hover:bg-gray-600" :href="fileInfo.value.url">
      <a-button type="outline">
        <template #icon>
          <icon-download />
        </template>
        {{ t('button.download') }}
      </a-button>
    </a>
    <a-button type="outline" @click='copy(fileInfo.value.url)'>
      <template #icon>
        <icon-copy />
      </template>
      {{ !copied ? t('button.copyUrl') : t('button.copyOk') }}
    </a-button>
    <a-button type="outline" disabled>其它操作开发中</a-button>
  </a-space>
</template>

<style scoped>

</style>
