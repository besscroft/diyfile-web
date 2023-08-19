<script setup lang="ts">
import APlayer from 'aplayer'
import { getFileInfo } from '~/api/modules/file'
import { ResultEnum } from '~/enums/httpEnum'
import { download } from '~/utils/ButtonUtil'
import { getFileName } from '~/utils/FileUtil'
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
  if (props.storageInfo.storageType === 0) {
    if (url.startsWith('/@api')) {
      return `${getBaseUrl()}/api/raw/?path=/${props.storageInfo.storageKey}/${url.substring(6)}`
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
  if (props.storageInfo.storageType === 0 && props.fileInfo.url.startsWith('/@api')) {
    download(`${getBaseUrl()}/api/raw/?path=/${props.storageInfo.storageKey}/${props.fileInfo.url.substring(6)}`)
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
  <n-alert type="default" closable>
    <template #icon>
      <n-icon>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
          <path d="M11 24h10v2H11z" fill="currentColor"></path>
          <path d="M13 28h6v2h-6z" fill="currentColor"></path>
          <path d="M10.815 18.14A7.185 7.185 0 0 1 8 12a8.01 8.01 0 0 1 8-8V2A10.011 10.011 0 0 0 6 12a9.18 9.18 0 0 0 3.46 7.616C10.472 20.551 11 21.081 11 22h2c0-1.84-1.11-2.866-2.185-3.86z" fill="currentColor"></path>
          <path d="M20 2h2v7h-2z" fill="currentColor"></path>
          <path d="M21 11a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 21 11z" fill="currentColor"></path>
          <path d="M26 2h2v7h-2z" fill="currentColor"></path>
          <path d="M27 11a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 27 11z" fill="currentColor"></path>
          <path d="M23.04 16a9.486 9.486 0 0 1-1.862 2.143C20.107 19.135 19 20.16 19 22h2c0-.92.526-1.45 1.535-2.386A9.984 9.984 0 0 0 25.275 16z" fill="currentColor"></path>
        </svg>
      </n-icon>
    </template>
    {{ `正在播放：${decodeURIComponent(props.fileInfo.name)}，如果无法播放，请确认您的设备支持当前格式解码！` }}
  </n-alert>
  <div flex flex-wrap justify-center items-center space-x-2 min-h-12>
    <n-button icon-placement="left" dashed my-1 @click="handleDownload(props.fileInfo.url)">
      <template #icon>
        <n-icon>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
            <path d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4z" fill="currentColor"></path>
            <path d="M26 14l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10l10-10z" fill="currentColor"></path>
          </svg>
        </n-icon>
      </template>
      {{ t('button.download') }}
    </n-button>
    <n-button v-if="storageType !== 0" icon-placement="left" dashed my-1 @click="copy(props.fileInfo.url)">
      <template #icon>
        <n-icon>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
            <path d="M11.947 19a4.948 4.948 0 0 1-3.499-8.447l5.106-5.104a4.948 4.948 0 0 1 6.998 6.998l-.553.552l-1.415-1.413l.557-.557a2.95 2.95 0 0 0-.004-4.166a3.02 3.02 0 0 0-4.17 0l-5.104 5.104a2.947 2.947 0 0 0 0 4.17a3.02 3.02 0 0 0 4.17 0l1.414 1.414a4.918 4.918 0 0 1-3.5 1.449z" fill="currentColor"></path>
            <path d="M19.947 17a4.948 4.948 0 0 1-3.499-8.447l.553-.552l1.414 1.415l-.552.552a2.948 2.948 0 0 0 0 4.169a3.02 3.02 0 0 0 4.17 0l5.105-5.105a2.951 2.951 0 0 0 0-4.168a3.02 3.02 0 0 0-4.17 0l-1.414-1.415a4.948 4.948 0 0 1 6.998 6.998l-5.104 5.103a4.92 4.92 0 0 1-3.5 1.45z" fill="currentColor"></path>
            <path d="M24 30H4a2.002 2.002 0 0 1-2-2V8a2.002 2.002 0 0 1 2-2h4v2H4v20h20V18h2v10a2.002 2.002 0 0 1-2 2z" fill="currentColor"></path>
          </svg>
        </n-icon>
      </template>
      {{ !copied ? t('button.copyUrl') : t('button.copyOk') }}
    </n-button>
    <n-button icon-placement="left" dashed my-1 @click="copy(copyProxyUrl())">
      <template #icon>
        <n-icon>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
            <path d="M11.947 19a4.948 4.948 0 0 1-3.499-8.447l5.106-5.104a4.948 4.948 0 0 1 6.998 6.998l-.553.552l-1.415-1.413l.557-.557a2.95 2.95 0 0 0-.004-4.166a3.02 3.02 0 0 0-4.17 0l-5.104 5.104a2.947 2.947 0 0 0 0 4.17a3.02 3.02 0 0 0 4.17 0l1.414 1.414a4.918 4.918 0 0 1-3.5 1.449z" fill="currentColor"></path>
            <path d="M19.947 17a4.948 4.948 0 0 1-3.499-8.447l.553-.552l1.414 1.415l-.552.552a2.948 2.948 0 0 0 0 4.169a3.02 3.02 0 0 0 4.17 0l5.105-5.105a2.951 2.951 0 0 0 0-4.168a3.02 3.02 0 0 0-4.17 0l-1.414-1.415a4.948 4.948 0 0 1 6.998 6.998l-5.104 5.103a4.92 4.92 0 0 1-3.5 1.45z" fill="currentColor"></path>
            <path d="M24 30H4a2.002 2.002 0 0 1-2-2V8a2.002 2.002 0 0 1 2-2h4v2H4v20h20V18h2v10a2.002 2.002 0 0 1-2 2z" fill="currentColor"></path>
          </svg>
        </n-icon>
      </template>
      {{ !copied ? t('button.copyProxyUrl') : t('button.copyOk') }}
    </n-button>
    <n-button v-if="props.storageInfo.type === 1 && props.fileInfo.proxyUrl" icon-placement="left" dashed my-1 @click="handleDownload(props.fileInfo.proxyUrl)">
      <template #icon>
        <n-icon>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
            <path d="M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22z" fill="currentColor"></path>
            <path d="M17 26.17V14h-2v12.17l-2.59-2.58L11 25l5 5l5-5l-1.41-1.41L17 26.17z" fill="currentColor"></path>
          </svg>
        </n-icon>
      </template>
      {{ t('button.proxyDownload') }}
    </n-button>
  </div>
</template>
