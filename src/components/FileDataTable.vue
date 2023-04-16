<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { VIcon } from 'vuetify/components/VIcon'
import { isAudio, isImage, isPDF, isVideo } from '~/utils/FileUtil'
import { download } from '~/utils/ButtonUtil'
import PathTableNPopconfirm from '~/components/PathTableNPopconfirm.vue'

interface Title {
  fileName: string
  lastModifiedDateTime: string
  fileSize: string
  Optional: string
}

const dataList = defineProps(['value'])
const emit = defineEmits(['handleFolder', 'clickFile', 'handleDelete', 'handleShare'])
const { t } = useI18n()
const { isMobile } = useDevice()

const handleDelete = (row: any) => {
  emit('handleDelete', row)
}

const createColumns = (): DataTableColumns<Title> => {
  if (isMobile) {
    return [
      {
        title: t('table.index.fileName'),
        key: 'name',
        render: (row) => {
          if (row.type !== 'file') {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('handleFolder', row.name) },
              },
              [h(VIcon, { icon: 'folder' }), h('p', row.name)],
            )
          } else if (isImage(row.name)) {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('clickFile', row.name) },
              },
              [h(VIcon, { icon: 'image' }), h('p', row.name)],
            )
          } else if (isVideo(row.name)) {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('clickFile', row.name) },
              },
              [h(VIcon, { icon: 'video_library' }), h('p', row.name)],
            )
          } else if (isAudio(row.name)) {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('clickFile', row.name) },
              },
              [h(VIcon, { icon: 'music_note' }), h('p', row.name)],
            )
          } else if (isPDF(row.name)) {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('clickFile', row.name) },
              },
              [h(VIcon, { icon: 'picture_as_pdf' }), h('p', row.name)],
            )
          } else {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('clickFile', row.name) },
              },
              [h(VIcon, { icon: 'description' }), h('p', row.name)],
            )
          }
        },
      },
    ]
  } else {
    return [
      {
        title: t('table.index.fileName'),
        key: 'name',
        render: (row) => {
          if (row.type !== 'file') {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('handleFolder', row.name) },
              },
              [h(VIcon, { icon: 'folder' }), h('p', row.name)],
            )
          } else if (isImage(row.name)) {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('clickFile', row.name) },
              },
              [h(VIcon, { icon: 'image' }), h('p', row.name)],
            )
          } else if (isVideo(row.name)) {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('clickFile', row.name) },
              },
              [h(VIcon, { icon: 'video_library' }), h('p', row.name)],
            )
          } else if (isAudio(row.name)) {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('clickFile', row.name) },
              },
              [h(VIcon, { icon: 'music_note' }), h('p', row.name)],
            )
          } else if (isPDF(row.name)) {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('clickFile', row.name) },
              },
              [h(VIcon, { icon: 'picture_as_pdf' }), h('p', row.name)],
            )
          } else {
            return h('div',
              {
                class: 'flex items-center cursor-pointer',
                onClick: () => { emit('clickFile', row.name) },
              },
              [h(VIcon, { icon: 'description' }), h('p', row.name)],
            )
          }
        },
      },
      {
        title: t('table.index.time'),
        key: 'lastModifiedDateTime',
        width: 220,
      },
      {
        title: t('table.index.fileSize'),
        key: 'size',
        width: 100,
        render: (row) => {
          return `${(row?.size / 1000 / 1000).toFixed(2)} MB`
        },
      },
      {
        title: t('table.Optional'),
        key: 'actions',
        width: 100,
        render: (row) => {
          if (row.type === 'file') {
            return h('div',
              { class: 'flex items-center cursor-pointer' },
              [
                h(VIcon, { icon: 'download', onClick: () => { download(row.url) } }),
                h(VIcon, { icon: 'content_copy', onClick: () => { emit('handleShare', row.url) } }),
                h(PathTableNPopconfirm, { onClick: () => { handleDelete(row) } }),
              ],
            )
          }
        },
      },
    ]
  }
}

const columns = createColumns()
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="dataList.value"
    :bordered="false"
    max-height="calc(100vh - 208px)"
    size="small"
    striped
  />
</template>

<style scoped>

</style>
