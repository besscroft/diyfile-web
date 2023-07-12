<script setup lang="ts">
import type { DataTableColumns, DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownRenderOption } from 'naive-ui'
import { download } from '~/utils/ButtonUtil'
import { getBaseUrl } from '~/utils/WindowUtil'
import { storageInfoByStorageKey } from '~/api/modules/storage'
import { renderFileIcon } from '~/utils/renderUtil'

interface Title {
  fileName: string
  lastModifiedDateTime: string
  fileSize: string
  Optional: string
}

const dataList = defineProps(['value'])
const emit = defineEmits(['handleFolder', 'clickFile', 'handleDelete', 'handleShare'])
const { t } = useI18n()
const user = useUserStore()
const { isMobile } = useDevice()
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const rowItem = ref<any>({})
const message = useMessage()
const router = useRouter()
const storageType = ref<number>(-1)

const handleDelete = (row: any) => {
  emit('handleDelete', row)
}

const createColumns = (): DataTableColumns<Title> => {
  if (isMobile) {
    return [
      {
        title: t('table.index.fileName'),
        key: 'name',
        render: row => renderFileIcon(row, emit),
      },
    ]
  } else {
    return [
      {
        title: t('table.index.fileName'),
        key: 'name',
        render: row => renderFileIcon(row, emit),
      },
      {
        title: t('table.index.time'),
        key: 'lastModifiedDateTime',
        width: 142,
      },
      {
        title: t('table.index.fileSize'),
        key: 'size',
        width: 100,
        render: (row) => {
          if (row?.size <= 1024) {
            return `${(row?.size / 1024).toFixed(2)} KB`
          } else if (row?.size <= 1024 * 1024 * 1024) {
            return `${(row?.size / 1024 / 1024).toFixed(2)} MB`
          } else {
            return `${(row?.size / 1024 / 1024 / 1024).toFixed(2)} GB`
          }
        },
      },
    ]
  }
}

const tableColumns = ref(createColumns())

const options = ref<Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>>([])

/** 点击下拉框元素 */
const handleSelect = (row: string) => {
  showDropdownRef.value = false
  if (row === 'copyUrl') {
    if (storageType.value === 1) {
      emit('handleShare', rowItem.value.url)
    } else {
      message.warning('暂不支持！')
    }
  } else if (row === 'copyProxyUrl') {
    if (storageType.value === 0) {
      if (rowItem.value.url.startsWith('/@api')) {
        emit('handleShare', `${getBaseUrl()}/api/raw/?path=/${router.currentRoute.value.params.storageKey}/${rowItem.value.url}`)
      } else {
        emit('handleShare', rowItem.value.url)
      }
    } else {
      emit('handleShare', `${getBaseUrl()}/api/raw/?path=${router.currentRoute.value.fullPath}/${rowItem.value.name}`)
    }
  } else if (row === 'open') {
    rowItem.value.type !== 'file' ? emit('handleFolder', rowItem.value.name) : emit('clickFile', rowItem.value.name)
  } else if (row === 'download') {
    if (storageType.value === 0) {
      if (rowItem.value.url.startsWith('/@api')) {
        download(`${getBaseUrl()}/api/raw/?path=/${router.currentRoute.value.params.storageKey}/${rowItem.value.url.substring(6)}`)
      } else {
        download(rowItem.value.url)
      }
    } else {
      download(rowItem.value.url)
    }
  } else if (row === 'delete') {
    handleDelete(rowItem.value)
  } else {
    message.warning('暂不支持！')
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
  return router.currentRoute.value.params.storageKey
}, (storageKey) => {
  storageInfoByStorageKey(storageKey.toString()).then((res) => {
    storageType.value = res.data.type
  })
})

watch(() => {
  return user.language
}, () => {
  tableColumns.value = createColumns()
})

watch(() => {
  return rowItem.value
}, (row) => {
  options.value = [
    {
      label: t('button.open'),
      key: 'open',
    },
    {
      label: t('button.copyUrl'),
      key: 'copyUrl',
      show: row.type === 'file',
    },
    {
      label: t('button.copyProxyUrl'),
      key: 'copyProxyUrl',
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
    {
      label: t('button.proxyDownload'),
      key: 'proxyDownload',
      show: row.type === 'file',
    },
  ]
})

onBeforeMount(() => {
  options.value = []
  storageInfoByStorageKey(router.currentRoute.value.params.storageKey.toString()).then((res) => {
    storageType.value = res.data.type
  })
})
</script>

<template>
  <div
    :style="isMobile ? { width: '100%' } : { width: '66%' }"
  >
    <n-data-table
      :columns="tableColumns"
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
