<script setup lang="ts">
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
const { text, copy, copied, isSupported } = useClipboard(props.fileInfo.url)
const { t } = useI18n()
const url = ref<string>()

const handleDownload = (url: string) => {
  download(url)
}

onMounted(() => {
  // 如果有需要，可以自建一个pdf.js的服务，然后将下面的url改为自己的
  url.value = `https://pdfjs.besscroft.com/web/viewer.html?file=${props.fileInfo.url}`
})
</script>

<template>
  <iframe :src="url" frameBorder="0" width="100%" height="100%" />
  <v-divider :thickness="2" class="border-opacity-50" color="success"></v-divider>
  <v-alert border="start" color="blue-lighten-4" :text="`正在阅读：${decodeURIComponent(props.fileInfo.name)}`"></v-alert>
  <v-divider :thickness="2" class="border-opacity-50" color="success"></v-divider>
  <div class="flex flex-wrap justify-center items-center space-x-2 min-h-12">
    <v-btn prepend-icon="download" class="my-1" color="green-accent-3" @click="handleDownload(props.fileInfo.url)">
      {{ t('button.download') }}
    </v-btn>
    <v-btn prepend-icon="content_copy" class="my-1" color="teal-accent-1" @click="copy(props.fileInfo.url)">
      {{ !copied ? t('button.copyUrl') : t('button.copyOk') }}
    </v-btn>
    <v-btn v-if="props.storageInfo.type === 1 && props.fileInfo.proxyUrl" prepend-icon="download" class="my-1" color="blue-grey-lighten-3" @click="handleDownload(props.fileInfo.proxyUrl)">
      {{ t('button.proxyDownload') }}
    </v-btn>
    <v-btn prepend-icon="sentiment_satisfied" class="my-1" variant="tonal">
      其它操作开发中
    </v-btn>
  </div>
</template>

<style scoped>

</style>
