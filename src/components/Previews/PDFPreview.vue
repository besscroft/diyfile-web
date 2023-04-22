<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'
import { createLoadingTask } from 'vue3-pdfjs'
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
const { text, copy, copied, isSupported } = useClipboard(props.fileInfo.url)
const { t } = useI18n()
const router = useRouter()
const storageType = ref<number>(-1)
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

const copyProxyUrl = (): string => {
  if (storageType.value === 0) {
    return `${getBaseUrl()}/api/raw/?path=/${router.currentRoute.value.params.storageKey}/${props.fileInfo.url}`
  } else {
    return `${getBaseUrl()}/api/raw/?path=${router.currentRoute.value.fullPath}`
  }
}

onMounted(() => {
  storageInfoByStorageKey(router.currentRoute.value.params.storageKey.toString()).then((res) => {
    storageType.value = res.data.type
  })
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
      <div class="cursor-pointer" @click="pdfInfo.pageNum > 1 ? pdfInfo.pageNum-- : ''">上一页</div>
      <div class="cursor-pointer">{{ pdfInfo.pageNum }}/{{ pdfInfo.numPages }}</div>
      <div class="cursor-pointer" @click="pdfInfo.pageNum < pdfInfo.numPages ? pdfInfo.pageNum++ : ''">下一页</div>
      <div class="cursor-pointer" @click="pdfInfo.scale < 2 ? pdfInfo.scale += 0.1 : ''">放大</div>
      <div class="cursor-pointer" @click="pdfInfo.scale > 0.5 ? pdfInfo.scale -= 0.1 : ''">缩小</div>
    </div>
  </div>
  <div class="flex mx-auto" style="height: calc(100vh - 256px)">
    <div class="flex-grow-1 overflow-hidden" style="height: calc(100vh - 256px); background-color: #505050">
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
    <v-btn prepend-icon="content_copy" class="my-1" color="teal-accent-1" @click="copy(copyProxyUrl())">
      {{ !copied ? t('button.copyProxyUrl') : t('button.copyOk') }}
    </v-btn>
    <v-btn v-if="props.storageInfo.type === 1 && props.fileInfo.proxyUrl" prepend-icon="download" class="my-1" color="blue-grey-lighten-3" @click="handleDownload(props.fileInfo.proxyUrl)">
      {{ t('button.proxyDownload') }}
    </v-btn>
  </div>
</template>

<style scoped>

</style>
