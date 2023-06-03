<script setup lang="ts">
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

const handleDownload = (url: string) => {
  if (storageType.value === 0 && props.fileInfo.url.startsWith('/@api')) {
    download(`${getBaseUrl()}/api/raw/?path=/${router.currentRoute.value.params.storageKey}/${props.fileInfo.url.substring(6)}`)
  } else {
    download(url)
  }
}

const copyProxyUrl = (): string => {
  if (storageType.value === 0) {
    if (props.fileInfo.url.startsWith('/@api')) {
      return `${getBaseUrl()}/api/raw/?path=/${router.currentRoute.value.params.storageKey}/${props.fileInfo.url.substring(6)}`
    } else {
      return props.fileInfo.url
    }
  } else {
    return `${getBaseUrl()}/api/raw/?path=${router.currentRoute.value.fullPath}`
  }
}

onMounted(() => {
  storageInfoByStorageKey(router.currentRoute.value.params.storageKey.toString()).then((res) => {
    storageType.value = res.data.type
  })
})
</script>

<template>
  <v-divider :thickness="2" class="border-opacity-50" color="success" />
  <v-alert border="start" text="看起来没有针对当前文件格式的预览呢，不过您也可以直接下载！" />
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

</style>
