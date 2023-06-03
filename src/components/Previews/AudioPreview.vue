<script setup lang="ts">
import APlayer from 'aplayer'
import { getFileInfo } from '~/api/modules/file'
import { ResultEnum } from '~/enums/httpEnum'
import { download } from '~/utils/ButtonUtil'
import { getFileName } from '~/utils/FileUtil'
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
const { text, copy, copied, isSupported } = useClipboard(props.fileInfo.url)
const { t } = useI18n()
const router = useRouter()
const url = props.fileInfo.url
const storageType = ref<number>(-1)
const ap = ref<APlayer>()

const copyProxyUrl = (): string => {
  if (storageType.value === 0) {
    if (url.startsWith('/@api')) {
      return `${getBaseUrl()}/api/raw/?path=/${router.currentRoute.value.params.storageKey}/${url.substring(6)}`
    } else {
      return url
    }
  } else {
    return `${getBaseUrl()}/api/raw/?path=${router.currentRoute.value.fullPath}`
  }
}

const initPlayer = (cover: string) => {
  ap.value = new APlayer({
    container: document.getElementById('player'),
    mini: false,
    autoplay: false,
    theme: '#FADFA3',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    listMaxHeight: 90,
    lrcType: 3,
    audio: [
      {
        name: props.fileInfo.name,
        url: props.fileInfo.url.startsWith('/@api') ? `${getBaseUrl()}/@api/${props.storageInfo.storageKey}/${props.fileInfo.url.substring(6)}` : props.fileInfo.url,
        theme: '#ebd0c2',
        cover,
      },
    ],
  })
}

const handleDownload = (url: string) => {
  if (storageType.value === 0 && props.fileInfo.url.startsWith('/@api')) {
    download(`${getBaseUrl()}/api/raw/?path=/${router.currentRoute.value.params.storageKey}/${props.fileInfo.url.substring(6)}`)
  } else {
    download(url)
  }
}

const handleImagePath = (): string => {
  const item = router.currentRoute.value.params.path.length
  let imagePath = ''
  for (let i = 0; i < item; i++) {
    for (let j = 0; j < i; j++) {
      imagePath += `/${router.currentRoute.value.params.path[j]}`
    }
  }
  imagePath += '/cover.jpg'
  return imagePath
}

const handleImagePathPre = (): string => {
  const item = router.currentRoute.value.params.path.length
  let imagePath = ''
  for (let i = 0; i < item - 1; i++) {
    for (let j = 0; j < i; j++) {
      imagePath += `/${router.currentRoute.value.params.path[j]}`
    }
  }
  imagePath += '/cover.jpg'
  return imagePath
}

onMounted(() => {
  const key = router.currentRoute.value.params.storageKey.toString()
  const path = router.currentRoute.value.path
  storageInfoByStorageKey(router.currentRoute.value.params.storageKey.toString()).then((res) => {
    storageType.value = res.data.type
  })
  getFileInfo(key, handleImagePath(), getFileName(path)).then((res) => {
    if (res.code === ResultEnum.SUCCESS && res.data.url) {
      initPlayer(res.data.url)
    } else {
      getFileInfo(key, handleImagePathPre(), getFileName(path)).then((res) => {
        if (res.code === ResultEnum.SUCCESS) {
          initPlayer(res.data.url)
        }
      })
    }
  })
})

onUnmounted(() => {
  ap.value?.destroy()
})
</script>

<template>
  <div id="player" />
  <v-divider :thickness="2" class="border-opacity-50" color="success" />
  <v-alert border="start" :text="`正在播放：${decodeURIComponent(props.fileInfo.name)}，如果无法播放，请确认您的设备支持当前格式解码！`" />
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
