<script setup lang="ts">
import APlayer from 'aplayer'

const fileInfo = defineProps(['value'])
const { text, copy, copied, isSupported } = useClipboard(fileInfo.value.url)
const { t } = useI18n()

const initPlayer = () => {
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
      },
    ],
  })
}

onBeforeMount(() => {
  initPlayer()
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
