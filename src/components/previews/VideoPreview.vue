<script setup lang="ts">
import DPlayer from 'dplayer'
import { download } from '~/utils/ButtonUtil'

const props = defineProps({
  fileInfo: {
    type: Object,
    required: true,
  },
  storageInfo: {
    type: Object,
    required: true,
  },
})
const { text, copy, copied } = useClipboard(props.fileInfo.url)
const { t } = useI18n()
const dp = ref<DPlayer>()

const initPlayer = () => {
  const url = props.fileInfo.url
  dp.value = new DPlayer({
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

onUnmounted(() => {
  dp.value?.destroy()
})
</script>

<template>
  <div id="dplayer" />
  <v-divider :thickness="2" class="border-opacity-50" color="success"></v-divider>
  <v-alert border="start" color="blue-lighten-4" :text="`正在预览：${decodeURIComponent(props.fileInfo.name)} 如果格式不支持，请切换浏览器或者编码器！`"></v-alert>
  <v-divider :thickness="2" class="border-opacity-50" color="success"></v-divider>
  <v-alert class="flex flex-wrap justify-center items-center h-12" color="cyan-lighten-4">
    <v-btn prepend-icon="download" class="mx-2" color="green-accent-3" @click="handleDownload(props.fileInfo.url)">
      {{ t('button.download') }}
    </v-btn>
    <v-btn prepend-icon="content_copy" class="mx-2" color="teal-accent-1" @click="copy(props.fileInfo.url)">
      {{ !copied ? t('button.copyUrl') : t('button.copyOk') }}
    </v-btn>
    <v-btn v-if="props.storageInfo.type === 1 && props.fileInfo.proxyUrl" prepend-icon="download" class="mx-2" color="blue-grey-lighten-3" @click="handleDownload(props.fileInfo.proxyUrl)">
      {{ t('button.proxyDownload') }}
    </v-btn>
    <v-btn prepend-icon="sentiment_satisfied" variant="tonal" class="mx-2">
      其它操作开发中
    </v-btn>
  </v-alert>
</template>

<style scoped>

</style>
