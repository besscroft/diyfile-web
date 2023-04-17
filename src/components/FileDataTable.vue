<script setup lang="ts">
import type { DataTableColumns, DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownRenderOption } from 'naive-ui'
import { VIcon } from 'vuetify/components/VIcon'
import { getFileName, isAudio, isImage, isPDF, isVideo } from '~/utils/FileUtil'
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
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const rowItem = ref<any>({})

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

const options = ref<Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>>([])

/** 点击下拉框元素 */
const handleSelect = (row: string) => {
  showDropdownRef.value = false
  if (row === 'copy') {
    emit('handleShare', rowItem.value.url)
  } else if (row === 'open') {
    rowItem.value.type !== 'file' ? emit('handleFolder', rowItem.value.name) : emit('clickFile', rowItem.value.name)
  } else if (row === 'download') {
    download(rowItem.value.url)
  } else if (row === 'delete') {
    handleDelete(rowItem.value)
  }
}

const onClickOutSide = (row: any) => {
  showDropdownRef.value = false
}

const rowProps = (row: Title) => {
  return {
    onContextmenu: (e: MouseEvent) => {
      rowItem.value = row
      e.preventDefault()
      showDropdownRef.value = false
      nextTick().then(() => {
        showDropdownRef.value = true
        xRef.value = e.clientX
        yRef.value = e.clientY
      })
    },
  }
}

watch(() => {
  return rowItem.value
}, (row) => {
  options.value = [
    {
      label: t('button.open'),
      key: 'open',
    },
    {
      label: t('button.copy'),
      key: 'copy',
      show: row.type === 'file',
    },
    {
      label: t('button.download'),
      key: 'download',
      show: row.type === 'file',
    },
    {
      label: t('button.delete'),
      key: 'delete',
      show: row.type === 'file',
    },
  ]
})

onBeforeMount(() => {
  options.value = [
    {
      label: t('button.open'),
      key: 'open',
    },
    {
      label: t('button.copy'),
      key: 'copy',
    },
    {
      label: t('button.edit'),
      key: 'edit',
    },
    {
      label: t('button.delete'),
      key: 'delete',
    },
  ]
})
</script>

<template>
  <div
    :style="isMobile ? { width: '100%' } : { width: '66%' }"
  >
    <n-data-table
      :columns="columns"
      :data="dataList.value"
      :row-props="rowProps"
      :bordered="false"
      max-height="calc(100vh - 208px)"
      size="small"
      striped
    />
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="xRef"
      :y="yRef"
      :options="options"
      :show="showDropdownRef"
      :on-clickoutside="onClickOutSide"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped>

</style>
