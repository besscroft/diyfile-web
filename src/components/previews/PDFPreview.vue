<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'
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

const pdfSource = ref<string>()
const isLoading = ref<boolean>(true)
const page = ref(1)
const pageCount = ref<number>(1)
const pdfRef = ref()

const handleDownload = (url: string) => {
  download(url)
}

const handleDocumentRender = () => {
  isLoading.value = false
  pageCount.value = pdfRef.value.pageCount
}

onMounted(() => {
  pdfSource.value = props.fileInfo.url
})
</script>

<template>
  <a-space wrap>
    <template v-if="isLoading">
      Loading...
    </template>

    <template v-else>
      <div class="inline-flex items-center justify-center gap-3">
        <a
          href="#"
          class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
          @click="page > 1 ? page-- : page"
        >
          <span class="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>

        <p class="text-xs">
          {{ page }}
          <span class="mx-0.25">/</span>
          {{ pageCount }}
        </p>

        <a
          href="#"
          class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
          @click="page < pageCount ? page++ : page"
        >
          <span class="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </template>
  </a-space>
  <a-divider />
  <VuePdfEmbed
    ref="pdfRef"
    :source="pdfSource"
    :page="page"
    @rendered="handleDocumentRender"
  />
  <a-divider />
  <template v-if="!isLoading">
    <div class="inline-flex items-center justify-center gap-3">
      <a
        href="#"
        class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
        @click="page > 1 ? page-- : page"
      >
        <span class="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>

      <p class="text-xs">
        {{ page }}
        <span class="mx-0.25">/</span>
        {{ pageCount }}
      </p>

      <a
        href="#"
        class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
        @click="page < pageCount ? page++ : page"
      >
        <span class="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
  </template>
  <a-alert :show-icon="false">
    正在预览：{{ props.fileInfo.name }}
  </a-alert>
  <a-divider orientation="left">
    {{ t('table.Optional') }}
  </a-divider>
  <a-space wrap>
    <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="handleDownload(props.fileInfo.url)">
      <icon-download /> {{ t('button.download') }}
    </button>
    <button type="button" class="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="copy(props.fileInfo.url)">
      <icon-copy /> {{ !copied ? t('button.copyUrl') : t('button.copyOk') }}
    </button>
    <button v-if="props.storageInfo.type === 1 && props.fileInfo.proxyUrl" type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="handleDownload(props.fileInfo.proxyUrl)">
      <icon-download /> {{ t('button.proxyDownload') }}
    </button>
    <button type="button" class="cursor-not-allowed inline-block px-6 py-2 border-2 border-gray-200 text-gray-200 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      其它操作开发中
    </button>
  </a-space>
</template>

<style scoped>

</style>
