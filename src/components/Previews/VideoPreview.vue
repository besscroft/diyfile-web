<script setup lang="ts">
import DPlayer from 'dplayer'
import { download } from '~/utils/ButtonUtil'
import { storageInfoByStorageKey } from '~/api/modules/storage'
import { getBaseUrl } from '~/utils/WindowUtil'

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
const router = useRouter()
const storageType = ref<number>(-1)
const dp = ref<DPlayer>()

const copyProxyUrl = (): string => {
  if (storageType.value === 0) {
    return `${getBaseUrl()}/api/raw/?path=/${router.currentRoute.value.params.storageKey}/${props.fileInfo.url}`
  } else {
    return `${getBaseUrl()}/api/raw/?path=${router.currentRoute.value.fullPath}`
  }
}

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
  if (storageType.value === 0) {
    download(`${getBaseUrl()}/api/raw/?path=/${router.currentRoute.value.params.storageKey}/${props.fileInfo.url}`)
  } else {
    download(url)
  }
}

onMounted(() => {
  storageInfoByStorageKey(router.currentRoute.value.params.storageKey.toString()).then((res) => {
    storageType.value = res.data.type
  })
  initPlayer()
})

onUnmounted(() => {
  dp.value?.destroy()
})
</script>

<template>
  <div id="dplayer" />
  <v-divider :thickness="2" class="border-opacity-50" color="success" />
  <v-alert border="start" :text="`正在预览：${decodeURIComponent(props.fileInfo.name)} 如果格式不支持，请切换浏览器或者编码器！`" />
  <v-divider :thickness="2" class="border-opacity-50" color="success" />
  <div class="flex flex-wrap justify-center items-center space-x-2 min-h-12">
    <v-btn prepend-icon="download" class="my-1" @click="handleDownload(props.fileInfo.url)">
      {{ t('button.download') }}
    </v-btn>
    <v-btn v-if="storageType !== 0" prepend-icon="content_copy" class="my-1" @click="copy(props.fileInfo.url)">
      {{ !copied ? t('button.copyUrl') : t('button.copyOk') }}
    </v-btn>
    <v-btn prepend-icon="content_copy" class="my-1" @click="copy(copyProxyUrl())">
      {{ !copied ? t('button.copyProxyUrl') : t('button.copyOk') }}
    </v-btn>
    <v-btn v-if="props.storageInfo.type === 1 && props.fileInfo.proxyUrl" prepend-icon="download" class="my-1" @click="handleDownload(props.fileInfo.proxyUrl)">
      {{ t('button.proxyDownload') }}
    </v-btn>
  </div>
</template>

<style scoped>

</style>
