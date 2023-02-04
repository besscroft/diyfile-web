<script setup lang="ts">
import APlayer from 'aplayer'
import { getFileInfo } from '~/api/modules/file'
import { download } from '~/utils/ButtonUtil'

const fileInfo = defineProps(['value'])
const { text, copy, copied, isSupported } = useClipboard(fileInfo.value.url)
const { t } = useI18n()
const router = useRouter()

const initPlayer = (cover: string) => {
  const url = fileInfo.value.url
  const ap = new APlayer({
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
        name: fileInfo.value.name,
        url,
        theme: '#ebd0c2',
        cover,
      },
    ],
  })
}

const handleDownload = (url: string) => {
  download(url)
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
  getFileInfo(key, handleImagePath()).then((res) => {
    if (res.code === 200 && res.data.url) {
      initPlayer(res.data.url)
    } else {
      getFileInfo(key, handleImagePathPre()).then((res) => {
        if (res.code === 200) {
          initPlayer(res.data.url)
        }
      })
    }
  })
})
</script>

<template>
  <div id="player"></div>
  <a-divider></a-divider>
  <a-alert :show-icon="false">正在播放：{{ fileInfo.value.name }}，如果无法播放，请确认您的设备支持当前格式解码！</a-alert>
  <a-divider orientation="left">{{ t('table.Optional') }}</a-divider>
  <a-space wrap>
    <button type="button" @click='handleDownload(fileInfo.value.url)' class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      <icon-download /> {{ t('button.download') }}
    </button>
    <button type="button" @click='copy(fileInfo.value.url)' class="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      <icon-copy /> {{ !copied ? t('button.copyUrl') : t('button.copyOk') }}
    </button>
    <button type="button" class="cursor-not-allowed inline-block px-6 py-2 border-2 border-gray-200 text-gray-200 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      其它操作开发中
    </button>
  </a-space>
</template>

<style scoped>

</style>
