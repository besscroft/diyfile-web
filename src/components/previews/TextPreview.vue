<script setup lang="ts">
const fileInfo = defineProps(['value'])
const { text, copy, copied, isSupported } = useClipboard(fileInfo.value.url)
const { t } = useI18n()
const contentHtml = ref()

onBeforeMount(() => {
  const url = fileInfo.value.url
  fetch(url)
    .then(response => response.text())
    .then((text) => {
      contentHtml.value = text
    })
})
</script>

<template>
  <div>{{ contentHtml }}</div>
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
