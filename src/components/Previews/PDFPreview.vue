<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'
import { createLoadingTask } from 'vue3-pdfjs'
import { download } from '~/utils/ButtonUtil'
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
  if (props.storageInfo.storageType === 0 && props.fileInfo.url.startsWith('/@api')) {
    download(`${getBaseUrl()}/api/raw/?path=/${props.storageInfo.storageKey}/${props.fileInfo.url.substring(6)}`)
  } else {
    download(url)
  }
}

const copyProxyUrl = (): string => {
  if (props.storageInfo.storageType === 0) {
    if (props.fileInfo.url.startsWith('/@api')) {
      return `${getBaseUrl()}/api/raw/?path=/${props.storageInfo.storageKey}/${props.fileInfo.url.substring(6)}`
    } else {
      return props.fileInfo.url
    }
  } else {
    return `${getBaseUrl()}/api/raw/?path=${router.currentRoute.value.fullPath}`
  }
}

onMounted(() => {
  const loadingTask = createLoadingTask(props.fileInfo.url.startsWith('/@api') ? `${getBaseUrl()}/@api/${props.storageInfo.storageKey}/${props.fileInfo.url.substring(6)}` : props.fileInfo.url)
  loadingTask.promise.then((pdf: { numPages: number }) => {
    pdfInfo.numPages = pdf.numPages
  })
})
</script>

<template>
  <div flex text-center justify-between w-full px-2 style="height: 48px; background-color: #323639; z-index: 999">
    <p v-if="!isMobile" class="title" style="color: #fff; font-size: 18px">{{ props.fileInfo.name }}</p>
    <div flex text-center space-x-4 style="color: #fff; user-select: none">
      <div cursor-pointer @click="pdfInfo.pageNum > 1 ? pdfInfo.pageNum-- : ''">上一页</div>
      <div cursor-pointer>{{ pdfInfo.pageNum }}/{{ pdfInfo.numPages }}</div>
      <div cursor-pointer @click="pdfInfo.pageNum < pdfInfo.numPages ? pdfInfo.pageNum++ : ''">下一页</div>
      <div cursor-pointer @click="pdfInfo.scale < 2 ? pdfInfo.scale += 0.1 : ''">放大</div>
      <div cursor-pointer @click="pdfInfo.scale > 0.5 ? pdfInfo.scale -= 0.1 : ''">缩小</div>
    </div>
  </div>
  <div flex flex-auto style="height: calc(100vh - 256px)">
    <div flex-1 overflow-hidden style="height: calc(100vh - 256px); background-color: #505050">
      <div h-full w-full of-auto>
        <VuePdfEmbed :source="props.fileInfo.url" :style="scale" :page="pdfInfo.pageNum" />
      </div>
    </div>
  </div>
  <n-divider />
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

<style scoped>

</style>
