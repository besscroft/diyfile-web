<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { Storage } from '~/api/interface/storage'
import { storageDelete, storagePage, storageSetDefault, storageUpdateStatus } from '~/api/modules/storage'

const router = useRouter()
const { t } = useI18n()
const { isMobile } = useDevice()
const dataList = ref<Array<Object>>([])
const total = ref<number>()
const pageNum = ref<number>(1)
const pageSize = ref<number>(7)
const typeFlag = ref<any>()
const loading = ref<Boolean>(true)
const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 7,
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
  if (type === -1) {
    data.queryParam.type = null
    typeFlag.value = null
  } else {
    data.queryParam.type = type
    typeFlag.value = type
  }
  data.queryParam.pageNum = pageNum.value
  data.queryParam.pageSize = pageSize.value
  loading.value = true
  storagePage(data.queryParam).then((res) => {
    if (res.code === 200) {
      dataList.value = res.data.list
      total.value = res.data.total
    }
    loading.value = false
  })
}

const handleStorageUpdate = () => {
  Message.warning('还没写!')
}

const handleStorageDelete = (storageId: number) => {
  storageDelete(storageId).then((res) => {
    if (res.code === 200) {
      Message.success('删除成功!')
      handleStoragePage(-1)
    }
  })
}

const handleStorageUpdateStatus = (storageId: number, status: number) => {
  updateStorageStatusData.storageId = storageId
  updateStorageStatusData.status = status
  storageUpdateStatus(updateStorageStatusData).then((res) => {
    if (res.code === 200) {
      Message.success(res.message)
      handleStoragePage(-1)
    }
  }).catch((err) => {
    Message.error(err.message)
  })
  updateStorageStatusData.storageId = undefined
  updateStorageStatusData.status = undefined
}

const handleStorageDefault = (storageId: number) => {
  storageSetDefault(storageId).then((res) => {
    if (res.code === 200) {
      Message.success(res.message)
      handleStoragePage(-1)
    }
  })
}

handleStoragePage(-1)
</script>

<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '0.25rem',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ height: '100%' }" :title="t('menu.setting.storage')">
      <template #extra>
        <a-space>
          <a-dropdown trigger="hover">
            <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">{{ t('button.type') }}</button>
            <template #content>
              <!-- 存储类型：0->本地存储；1->OneDrive -->
              <a-doption @click="handleStoragePage()">所有类型</a-doption>
              <a-doption @click="handleStoragePage(0)">本地存储</a-doption>
              <a-doption @click="handleStoragePage(1)">OneDrive</a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </template>
      <a-space v-if="loading" direction="vertical" size="large" :style="{ width: '100%' }">
        <a-skeleton animation="animation">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-line v-if="!isMobile" :rows="10" />
            <a-skeleton-shape v-for="index in 10" :key="index" size="large" />
          </a-space>
        </a-skeleton>
      </a-space>
      <a-row v-else :gutter="[12, 10]">
        <a-col v-for="item in dataList" :key="item.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <a-card :style="{ height: '300px' }" :title="item.name" hoverable>
            <template #extra>
              <a-dropdown trigger="hover">
                <button type="button" class="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">{{ t('table.Optional') }}</button>
                <template #content>
                  <a-doption @click="router.push({ path: `/@admin/setting/storage/${encodeURIComponent(item.id)}`, params: { id: item.id } })">{{ t('button.detail') }}</a-doption>
                  <a-doption v-if="item.type === 0" @click="router.push({ path: '/@admin/setting/storage/edit/local', query: { id: item.id } })">{{ t('button.edit') }}</a-doption>
                  <a-doption v-if="item.type === 1" @click="router.push({ path: '/@admin/setting/storage/edit/oneDrive', query: { id: item.id } })">{{ t('button.edit') }}</a-doption>
                </template>
              </a-dropdown>
            </template>
            <template #cover>
              <div class="h-46">
                <icon-storage :style="{ 'margin-top': '12px', 'height': '36px', 'width': '100%' }" />
                <a-typography-paragraph class="mt-4 ml-2 mr-2 mb-2">
                  {{ item.remark }}
                </a-typography-paragraph>
              </div>
            </template>
            <template #actions>
              <span class="icon-hover">
                <a-popconfirm content="确定要删除吗?" type="warning" :onOk="() => handleStorageDelete(item.id)">
                  <icon-delete />
                </a-popconfirm>
              </span>
            </template>
            <a-card-meta>
              <template #avatar>
                <div
                  :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
                >
                  <a-space>
                    <a-tag v-if="item.type === 0" color="cyan">本地存储</a-tag>
                    <a-tag v-else-if="item.type === 1" color="cyan">OneDrive</a-tag>
                    <a-tag v-else-if="item.type === 2" color="cyan">阿里云 OSS</a-tag>
                    <a-popconfirm v-if="item.enable === 1" content="确定要禁用吗?" type="warning" :onOk="() => handleStorageUpdateStatus(item.id, 0)">
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
                    </a-popconfirm>
                    <a-popconfirm v-else content="确定要启用吗?" type="warning" :onOk="() => handleStorageUpdateStatus(item.id, 1)">
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
                    </a-popconfirm>
                    <a-popconfirm v-if="item.defaultStatus === 0" content="确定要设置默认吗?" type="warning" :onOk="() => handleStorageDefault(item.id)">
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
                    </a-popconfirm>
                    <span
                      v-else
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
                      <p class="whitespace-nowrap text-sm">默认</p>
                    </span>
                  </a-space>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <a-card
            hoverable
            :style="{ height: '300px' }"
            class="flex items-center justify-center cursor-pointer"
            @click="router.push('/@admin/setting/storage/add')"
          >
            <a-result>
              <template #icon>
                <icon-plus style="font-size: 20px" />
              </template>
            </a-result>
          </a-card>
        </a-col>
      </a-row>
      <a-pagination
        :total="total"
        :page-size="pageSize"
        :current="pageNum"
        :show-total="true"
        class="mt-4"
        @change="(current) => { pageNum = current; handleStoragePage(typeFlag) }"
      />
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
