<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import type { Storage } from '~/api/interface/storage'
import { storageDelete, storagePage, storageSetDefault, storageUpdateStatus } from '~/api/modules/storage'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const { t } = useI18n()
const snackbar = useSnackbarStore()
const dataList = ref<Array<Object>>([])
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

const handleStorageDelete = (storageId: number) => {
  storageDelete(storageId).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      snackbar.setType('blue')
      snackbar.setText(res.message)
      handleStoragePage(-1)
    }
  })
}

const handleStorageUpdateStatus = (storageId: number, status: number) => {
  updateStorageStatusData.storageId = storageId
  updateStorageStatusData.status = status
  storageUpdateStatus(updateStorageStatusData).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      snackbar.setType('blue')
      snackbar.setText(res.message)
      handleStoragePage(-1)
    }
  }).catch((err) => {
    snackbar.setType('red')
    snackbar.setText(err.message)
  })
  updateStorageStatusData.storageId = undefined
  updateStorageStatusData.status = undefined
}

const handleStorageDefault = (storageId: number) => {
  storageSetDefault(storageId).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      snackbar.setType('blue')
      snackbar.setText(res.message)
      handleStoragePage(-1)
    }
  })
}

handleStoragePage(-1)
</script>

<template>
  <el-card :body-style="{ padding: '0.25rem' }" class="my-1 h-10" shadow="never">
    <el-page-header @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-400 mr-2"> {{ t('menu.setting.storage') }} </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <v-btn icon="add_box" variant="text" size="x-small" @click="router.push('/@admin/setting/storage/add')" />
          <el-dropdown>
            <v-btn icon="dynamic_form" variant="text" size="x-small" />
            <template #dropdown>
              <el-dropdown-menu>
                <!-- 存储类型：0->本地存储；1->OneDrive -->
                <el-dropdown-item @click="handleStoragePage()">所有类型</el-dropdown-item>
                <el-dropdown-item @click="handleStoragePage(0)" divided>本地存储</el-dropdown-item>
                <el-dropdown-item @click="handleStoragePage(1)">OneDrive</el-dropdown-item>
                <el-dropdown-item @click="handleStoragePage(2)">阿里云OSS</el-dropdown-item>
                <el-dropdown-item @click="handleStoragePage(3)">Amazon S3</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </el-page-header>
  </el-card>
  <el-card :body-style="{ padding: '0px' }" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;" shadow="never">
    <el-row :gutter="[12, 10]">
      <el-col v-for="item in dataList" :key="item.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <el-card :body-style="{ padding: '0.25rem' }" class="box-card mx-1 my-0.5 h-80" shadow="hover">
          <template #header>
            <div class="flex justify-space-between align-center">
              <span class="mx-1">{{ item.name }}</span>
              <el-dropdown>
                <v-btn prepend-icon="expand_more" variant="text"> {{ t('table.Optional') }} </v-btn>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="router.push({ path: `/@admin/setting/storage/${encodeURIComponent(item.id)}`, params: { id: item.id } })">{{ t('button.detail') }}</el-dropdown-item>
                    <el-dropdown-item v-if="item.type === 0" @click="router.push({ path: '/@admin/setting/storage/edit/local', query: { id: item.id } })">{{ t('button.edit') }}</el-dropdown-item>
                    <el-dropdown-item v-if="item.type === 1" @click="router.push({ path: '/@admin/setting/storage/edit/oneDrive', query: { id: item.id } })">{{ t('button.edit') }}</el-dropdown-item>
                    <el-dropdown-item v-if="item.type === 2" @click="router.push({ path: '/@admin/setting/storage/edit/aliyunOSS', query: { id: item.id } })">{{ t('button.edit') }}</el-dropdown-item>
                    <el-dropdown-item v-if="item.type === 3" @click="router.push({ path: '/@admin/setting/storage/edit/amazonS3', query: { id: item.id } })">{{ t('button.edit') }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
          <v-card
            variant="text"
            class="flex h-68 flex-col"
            style="display: flex"
          >
            <div class="flex w-full">
              <v-icon icon="storage" color="info" class="mt-3 mb-3 mx-auto" />
            </div>
            {{ item.remark }}
            <div class="mt-auto">
              <div class="flex justify-space-between">
                <div class="flex items-center justify-center">
                  <el-tag v-if="item.type === 0" class="mx-1" effect="dark" round>本地存储</el-tag>
                  <el-tag v-else-if="item.type === 1" class="mx-1" effect="dark" round>OneDrive</el-tag>
                  <el-tag v-else-if="item.type === 2" class="mx-1" effect="dark" round>阿里云 OSS</el-tag>
                  <el-tag v-else-if="item.type === 3" class="mx-1" effect="dark" round>Amazon S3</el-tag>
                  <el-popconfirm
                    v-if="item.enable === 1"
                    class="mx-1"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    title="确定要禁用吗?"
                    @confirm="() => handleStorageUpdateStatus(item.id, 0)"
                  >
                    <template #reference>
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
                  </el-popconfirm>
                  <el-popconfirm
                    v-else
                    class="mx-1"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    title="确定要启用吗?"
                    @confirm="() => handleStorageUpdateStatus(item.id, 1)"
                  >
                    <template #reference>
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
                  </el-popconfirm>
                  <el-popconfirm
                    v-if="item.defaultStatus === 0"
                    class="mx-1"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    title="确定要设置默认吗?"
                    @confirm="() => handleStorageDefault(item.id)"
                  >
                    <template #reference>
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
                  </el-popconfirm>
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
                  <el-popconfirm
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    :icon="Delete"
                    title="确定要删除吗?"
                    @confirm="() => handleStorageDelete(item.id)"
                  >
                    <template #reference>
                      <el-button type="warning" :icon="Delete" link circle />
                    </template>
                  </el-popconfirm>
                </span>
              </div>
            </div>
          </v-card>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      v-model:current-page="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      layout="total, prev, pager, next"
      :total="pageInfo.total"
      hide-on-single-page
      @current-change="(current) => { pageInfo.pageNum = current; handleStoragePage(roleFlag) }"
    />
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
