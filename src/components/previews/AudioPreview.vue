<script setup lang="ts">
import APlayer from 'aplayer'
import { getFileInfo } from '~/api/modules/file'

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
