<script setup lang="ts">
const fileInfo = defineProps(['value'])
const { text, copy, copied, isSupported } = useClipboard(fileInfo.value.url)
const { t } = useI18n()

const url = ref<string>()

onBeforeMount(() => {
  // TODO 跨域问题
  url.value = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${fileInfo.value.url}`
})
</script>

<template>
  <div className="w-full overflow-hidden rounded" :style="{ height: '90vh' }">
  <iframe :src="url" frameBorder="0" width="100%" height="100%"></iframe>
  </div>
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
