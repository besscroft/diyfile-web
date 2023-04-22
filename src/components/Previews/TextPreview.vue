<script setup lang="ts">
import { download } from '~/utils/ButtonUtil'
import { getBaseUrl } from '~/utils/WindowUtil'
import { storageInfoByStorageKey } from '~/api/modules/storage'

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
const contentHtml = ref()
const storageType = ref<number>(-1)

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

onBeforeMount(() => {
  const url = props.fileInfo.url
  storageInfoByStorageKey(router.currentRoute.value.params.storageKey.toString()).then((res) => {
    storageType.value = res.data.type
  })
  fetch(url)
    .then(response => response.text())
    .then((text) => {
      contentHtml.value = text
    })
})
</script>

<template>
  <div>{{ contentHtml }}</div>
  <v-divider :thickness="2" class="border-opacity-50" color="success"></v-divider>
  <v-alert border="start" color="blue-lighten-4" :text="`正在预览：${decodeURIComponent(props.fileInfo.name)}`"></v-alert>
  <v-divider :thickness="2" class="border-opacity-50" color="success"></v-divider>
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
