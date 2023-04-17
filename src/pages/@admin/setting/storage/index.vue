<script setup lang="ts">
import type { DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownRenderOption } from 'naive-ui'
import type { Storage } from '~/api/interface/storage'
import { storageDelete, storagePage, storageSetDefault, storageUpdateStatus } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const { t } = useI18n()
const message = useMessage()
const dataList = ref<Array<Object>>([])
const showDropdownRef = ref(false)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 8,
})
const typeFlag = ref<any>()
const loading = ref<boolean>(true)
const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 8,
    type: null as any,
  },
})
const updateStorageStatusData = reactive<Storage.UpdateStorageStatusRequestData>({
  /** 存储id */
  storageId: undefined,
  /** 启用状态 */
  status: undefined,
})

const handleStoragePage = (type: number) => {
  showDropdownRef.value = false
  if (type === -1) {
    data.queryParam.type = null
    typeFlag.value = null
  } else {
    data.queryParam.type = type
    typeFlag.value = type
  }
  data.queryParam.pageNum = pageInfo.pageNum
  data.queryParam.pageSize = pageInfo.pageSize
  loading.value = true
  storagePage(data.queryParam).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      pageInfo.total = res.data.total
      pageInfo.totalPage = res.data.totalPage
      dataList.value = res.data.list
    }
    loading.value = false
  })
}

const pageOptions = ref<Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>>([
  {
    label: '所有类型',
    key: -1,
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '本地存储',
    key: 0,
  },
  {
    label: 'OneDrive',
    key: 1,
  },
  {
    label: '阿里云OSS',
    key: 2,
  },
  {
    label: 'Amazon S3',
    key: 3,
  },
])

const handleStorageDelete = (storageId: number) => {
  storageDelete(storageId).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
      handleStoragePage(-1)
    }
  })
}

const handleStorageUpdateStatus = (storageId: number, status: number) => {
  updateStorageStatusData.storageId = storageId
  updateStorageStatusData.status = status
  storageUpdateStatus(updateStorageStatusData).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
      handleStoragePage(-1)
    }
  }).catch((err) => {
    message.error(err.message)
  })
  updateStorageStatusData.storageId = undefined
  updateStorageStatusData.status = undefined
}

const handleStorageDefault = (storageId: number) => {
  storageSetDefault(storageId).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
      handleStoragePage(-1)
    }
  })
}

handleStoragePage(-1)
</script>

<template>
  <n-card content-style="padding: 0;" class="my-0.5">
    <n-page-header :title="t('menu.setting.storage')" class="mx-0.5">
      <template #extra>
        <div class="flex items-center">
          <v-btn icon="add_box" variant="text" size="x-small" @click="router.push('/@admin/setting/storage/add')" />
          <n-dropdown :options="pageOptions || undefined" @select="handleStoragePage">
            <v-btn icon="dynamic_form" variant="text" size="x-small" />
          </n-dropdown>
        </div>
      </template>
    </n-page-header>
  </n-card>
  <n-card content-style="padding: 0;" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <div v-if="loading" class="flex justify-center mt-7">
      <n-spin size="medium" />
    </div>
    <n-grid v-else cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item v-for="item in dataList" :key="item.id">
        <n-card
          :title="item.name"
          content-style="padding: 0.25rem;"
          class="box-card h-80"
        >
          <template #header-extra>
            <div class="text-center">
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-btn icon="expand_more" v-bind="props" variant="text" size="x-small" />
                </template>
                <v-list>
                  <v-list-item @click="router.push({ path: `/@admin/setting/storage/${encodeURIComponent(item.id)}`, params: { id: item.id } })">
                    <v-list-item-title>{{ t('button.detail') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="item.type === 0" @click="router.push({ path: '/@admin/setting/storage/edit/local', query: { id: item.id } })">
                    <v-list-item-title>{{ t('button.edit') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="item.type === 1" @click="router.push({ path: '/@admin/setting/storage/edit/oneDrive', query: { id: item.id } })">
                    <v-list-item-title>{{ t('button.edit') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="item.type === 2" @click="router.push({ path: '/@admin/setting/storage/edit/aliyunOSS', query: { id: item.id } })">
                    <v-list-item-title>{{ t('button.edit') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="item.type === 3" @click="router.push({ path: '/@admin/setting/storage/edit/amazonS3', query: { id: item.id } })">
                    <v-list-item-title>{{ t('button.edit') }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
          <div class="flex w-full">
            <v-avatar size="56" image="/storage_FILL0_wght400_GRAD0_opsz48.png" class="mb-3 mx-auto" />
          </div>
          {{ item.remark }}
          <template #action>
            <div class="mt-auto">
              <div class="flex justify-space-between">
                <div class="flex items-center justify-center space-x-1">
                  <span
                    class="inline-flex items-center justify-center rounded-full bg-blue-400 px-2.5 py-0.5 text-coolGray-50"
                  >
                    <p class="whitespace-nowrap text-sm">
                      {{
                        item.type === 0 ? '本地存储'
                        : item.type === 1 ? 'OneDrive'
                        : item.type === 2 ? '阿里云 OSS'
                        : item.type === 3 ? 'Amazon S3' : '未知'
                      }}
                    </p>
                  </span>
                  <n-popconfirm
                    v-if="item.enable === 1"
                    positive-text="确定"
                    negative-text="取消"
                    @positive-click="() => handleStorageUpdateStatus(item.id, 0)"
                  >
                    <template #trigger>
                      <span
                        class="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="-ml-1 mr-1.5 h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p class="whitespace-nowrap text-sm">启用</p>
                      </span>
                    </template>
                    确定要禁用吗?
                  </n-popconfirm>
                  <n-popconfirm
                    v-else
                    positive-text="确定"
                    negative-text="取消"
                    @positive-click="() => handleStorageUpdateStatus(item.id, 1)"
                  >
                    <template #trigger>
                      <span
                        class="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="-ml-1 mr-1.5 h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                        <p class="whitespace-nowrap text-sm">禁用</p>
                      </span>
                    </template>
                    确定要启用吗?
                  </n-popconfirm>
                  <n-popconfirm
                    v-if="item.defaultStatus === 0"
                    class="mx-1"
                    positive-text="确定"
                    negative-text="取消"
                    @positive-click="() => handleStorageDefault(item.id)"
                  >
                    <template #trigger>
                      <span
                        class="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="-ml-1 mr-1.5 h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                        <p class="whitespace-nowrap text-sm">非默认</p>
                      </span>
                    </template>
                    确定要设置默认吗?
                  </n-popconfirm>
                  <span
                    v-else
                    class="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 cursor-pointer mx-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="-ml-1 mr-1.5 h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p class="whitespace-nowrap text-sm">默认</p>
                  </span>
                </div>
                <span class="icon-hover">
                  <n-popconfirm
                    positive-text="确定"
                    negative-text="取消"
                    @positive-click="() => handleStorageDelete(item.id)"
                  >
                    <template #trigger>
                      <n-icon size="18" class="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                          <path d="M6 21h12V7H6v14zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" fill="currentColor"></path>
                        </svg>
                      </n-icon>
                    </template>
                    确定要删除吗?
                  </n-popconfirm>
                </span>
              </div>
            </div>
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-pagination
      v-if="pageInfo.totalPage > 1"
      v-model:page="pageInfo.pageNum"
      v-model:page-size="pageInfo.pageSize"
      :page-count="pageInfo.totalPage"
      @update:page="(current) => { pageInfo.pageNum = current; handleStoragePage(typeFlag) }"
    />
  </n-card>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
