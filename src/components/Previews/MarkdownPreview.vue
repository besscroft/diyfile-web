<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'github-markdown-css'
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
const contentHtml = ref()

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

onMounted(async () => {
  await storageInfoByStorageKey(router.currentRoute.value.params.storageKey.toString()).then((res) => {
    storageType.value = res.data.type
  })
  const response = await fetch(props.fileInfo.url)
  const markdown = await response.text()
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (__) {}
      }

      return '' // use external default escaping
    },
  })
  contentHtml.value = md.render(markdown.replace('/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/', ''))
})
</script>

<template>
  <div class="content px-2 py-4">
    <div class="markdown-body overflow-y-auto overflow-x-hidden" style="height: calc(100vh - 208px)" v-html="contentHtml" />
  </div>
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
.content .markdown-body >>> pre:hover .copy-btn {
  opacity: 1;
}
</style>
