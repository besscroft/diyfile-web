<script setup lang="ts">
import DPlayer from 'dplayer'
import { download } from '~/utils/ButtonUtil'
import { getBaseUrl } from '~/utils/WindowUtil'

const fileInfo = defineProps(['value'])
const { text, copy, copied } = useClipboard(fileInfo.value.url)
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

const handleDownload = (url: string) => {
  download(url)
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
    <button type="button" @click='handleDownload(fileInfo.value.url)' class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      <icon-download /> {{ t('button.download') }}
    </button>
    <button type="button" @click='copy(fileInfo.value.url)' class="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      <icon-copy /> {{ !copied ? t('button.copyUrl') : t('button.copyOk') }}
    </button>
    <button type="button"
            @click="() => window.open(`potplayer://${getBaseUrl()}${fileInfo.value.url}`)"
            class="inline-block px-6 py-2 border-2 border-yellow-500 text-yellow-500 font-medium text-xs leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      PotPlayer
    </button>
    <button type="button" class="cursor-not-allowed inline-block px-6 py-2 border-2 border-gray-200 text-gray-200 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      其它操作开发中
    </button>
  </a-space>
</template>

<style scoped>

</style>
