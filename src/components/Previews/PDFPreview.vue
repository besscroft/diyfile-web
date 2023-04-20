<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'
import { createLoadingTask } from 'vue3-pdfjs'
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
const { isMobile } = useDevice()
const pdfInfo = reactive({
  numPages: 0,
  pageNum: 1,
  scale: 0.9,
})
const scale = computed(() => `transform:scale(${pdfInfo.scale})`)

const handleDownload = (url: string) => {
  download(url)
}

const setPage = (page: number) => {
  if (page > 0 && pdfInfo.pageNum < pdfInfo.numPages) {
    pdfInfo.pageNum++
  } else if (page < 0 && pdfInfo.pageNum > 1) {
    pdfInfo.pageNum--
  }
}

const setZoom = (val: number) => {
  if (val > 0 && pdfInfo.scale < 2) {
    pdfInfo.scale += val
  } else if (val < 0 && pdfInfo.scale > 0.5) {
    pdfInfo.scale += val
  }
}

onMounted(() => {
  const loadingTask = createLoadingTask(props.fileInfo.url)
  loadingTask.promise.then((pdf: { numPages: number }) => {
    pdfInfo.numPages = pdf.numPages
  })
})
</script>

<template>
  <div class="flex align-center justify-space-between w-full px-2" style="height: 48px; background-color: #323639; z-index: 999">
    <p v-if="!isMobile" class="title" style="color: #fff; font-size: 18px">{{ props.fileInfo.name }}</p>
    <div class="flex align-center space-x-4" style="color: #fff; user-select: none">
      <div class="cursor-pointer" @click="setPage(-1)">上一页</div>
      <div class="cursor-pointer">{{ pdfInfo.pageNum }}/{{ pdfInfo.numPages }}</div>
      <div class="cursor-pointer" @click="setPage(1)">下一页</div>
      <div class="cursor-pointer" @click="setZoom(0.1)">放大</div>
      <div class="cursor-pointer" @click="setZoom(-0.1)">缩小</div>
    </div>
  </div>
  <div class="flex mx-auto" style="height: calc(100vh - 256px)">
    <!-- 目录 -->
    <div v-if="!isMobile" class="container-left overflow-y-auto w-1/4" style="height: calc(100vh - 256px); width: 300px; background-color: #323639">
      <div v-for="item in pdfInfo.numPages" :key="item" class="cursor-pointer align-center ma-2">
        <div :style="item === pdfInfo.pageNum ? 'border: 5px solid #7d9dfe' : ''">
          <VuePdfEmbed class="item-pdf" :source="props.fileInfo.url" :page="item" @click="pdfInfo.pageNum = item" />
        </div>
        <p class="px-2" style="color: #fff">{{ item }}</p>
      </div>
    </div>
    <div :class="isMobile ? 'w-full' : 'flex-grow-1 overflow-hidden w-3/4'" style="height: calc(100vh - 256px); background-color: #505050">
      <div class="h-full w-full overflow-auto">
        <VuePdfEmbed :source="props.fileInfo.url" :style="scale" :page="pdfInfo.pageNum" />
      </div>
    </div>
  </div>
  <v-divider :thickness="2" class="border-opacity-50" color="success" />
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
  </div>
</template>

<style scoped>

</style>
