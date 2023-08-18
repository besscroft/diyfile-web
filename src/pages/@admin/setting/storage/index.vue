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
    label: '阿里云 OSS',
    key: 2,
  },
  {
    label: 'Amazon S3',
    key: 3,
  },
  {
    label: '腾讯云 COS',
    key: 4,
  },
])
const selectOptions = ref<Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>>([
  {
    label: t('button.detail'),
    key: 'detail',
  },
  {
    label: t('button.edit'),
    key: 'edit',
  },
])

const handleSelect = (key: string | number, item: any) => {
  showDropdownRef.value = false
  if (key === 'detail') {
    router.push({ path: `/@admin/setting/storage/${encodeURIComponent(item.id)}`, params: { id: item.id } })
  } else if (key === 'edit') {
    if (item.type === 0) {
      router.push({ path: '/@admin/setting/storage/edit/local', query: { id: item.id } })
    } else if (item.type === 1) {
      router.push({ path: '/@admin/setting/storage/edit/oneDrive', query: { id: item.id } })
    } else if (item.type === 2) {
      router.push({ path: '/@admin/setting/storage/edit/aliyunOSS', query: { id: item.id } })
    } else if (item.type === 3) {
      router.push({ path: '/@admin/setting/storage/edit/amazonS3', query: { id: item.id } })
    } else if (item.type === 4) {
      router.push({ path: '/@admin/setting/storage/edit/qCloudCOS', query: { id: item.id } })
    }
  }
}

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
  <div flex grid justify-start justify-center items-center h-8>
    <p mr-auto text-base font-medium ml-0.25rem>{{ t('menu.setting.storage') }}</p>
    <div>
      <n-icon size="22" @click="router.push('/@admin/setting/storage/add')" class="cursor-pointer mr-0.25rem">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
          <path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z" fill="currentColor"></path>
        </svg>
      </n-icon>
      <n-dropdown :options="pageOptions || undefined" @select="handleStoragePage">
        <n-button quaternary circle>
          <template #icon>
            <n-icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                <path d="M28 20h-2v2h2v6H4v-6h10v-2H4a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h24a2.002 2.002 0 0 0 2-2v-6a2.002 2.002 0 0 0-2-2z" fill="currentColor"></path>
                <circle cx="7" cy="25" r="1" fill="currentColor"></circle>
                <path d="M30 8h-8v6h-6v8h8v-6h6zm-8 12h-4v-4h4zm6-6h-4v-4h4z" fill="currentColor"></path>
                <path d="M18 10h-8V2h8zm-6-2h4V4h-4z" fill="currentColor"></path>
              </svg>
            </n-icon>
          </template>
        </n-button>
      </n-dropdown>
    </div>
  </div>
  <div content-style="padding: 0;" h-full w-full mt-1 of-auto onscroll style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <div v-if="loading" flex justify-center mt-7>
      <n-spin size="medium" />
    </div>
    <n-grid v-else-if="Array.isArray(dataList) && dataList.length > 0" cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item v-for="item in dataList" :key="item.id">
        <n-card
          :title="item.name"
          content-style="padding: 0.25rem;"
          h-80
          class="box-card"
        >
          <template #header-extra>
            <div text-center>
              <n-dropdown trigger="hover" :options="selectOptions" @select="(key) => handleSelect(key, item)">
                <n-icon size="24" class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z" fill="currentColor" />
                  </svg>
                </n-icon>
              </n-dropdown>
            </div>
          </template>
          <div flex w-full>
            <n-icon size="46" mb3 mxa>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                <path d="M28 20h-2v2h2v6H4v-6h2v-2H4a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h24a2.002 2.002 0 0 0 2-2v-6a2.002 2.002 0 0 0-2-2z" fill="currentColor"></path>
                <circle cx="7" cy="25" r="1" fill="currentColor"></circle>
                <path d="M15 20H8v-7h7zm-5-2h3v-3h-3z" fill="currentColor"></path>
                <path d="M24 20h-7v-7h7zm-5-2h3v-3h-3z" fill="currentColor"></path>
                <path d="M15 11H8V4h7zm-5-2h3V6h-3z" fill="currentColor"></path>
                <path d="M24 11h-7V4h7zm-5-2h3V6h-3z" fill="currentColor"></path>
              </svg>
            </n-icon>
          </div>
          {{ item.remark }}
          <template #action>
            <div mta>
              <div flex justify-between>
                <div flex items-center justify-center space-x-1>
                  <span
                    class="inline-flex items-center justify-center rounded-full bg-blue-400 px-2.5 py-0.5 text-coolGray-50"
                  >
                    <p class="whitespace-nowrap text-sm">
                      {{
                        item.type === 0 ? '本地存储'
                          : item.type === 1 ? 'OneDrive'
                          : item.type === 2 ? '阿里云 OSS'
                          : item.type === 3 ? 'Amazon S3'
                          : item.type === 4 ? '腾讯云 COS'
                          : '未知'
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
    <n-empty v-else :description="t('tip.empty')">
    </n-empty>
    <n-pagination
      v-if="pageInfo.totalPage > 1"
      v-model:page="pageInfo.pageNum"
      v-model:page-size="pageInfo.pageSize"
      :page-count="pageInfo.totalPage"
      mt-0.5
      @update:page="(current) => { pageInfo.pageNum = current; handleStoragePage(typeFlag) }"
    />
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
