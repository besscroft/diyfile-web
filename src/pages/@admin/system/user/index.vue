<script setup lang="ts">
import type { DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownRenderOption } from 'naive-ui'
import type { User } from '~/api/interface/user'
import { userDelete, userPage, userStatusUpdate } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const user = useUserStore()
const message = useMessage()
const loading = ref<boolean>(true)
const { t } = useI18n()
const dataList = ref<Array<Object>>([])
const showDropdownRef = ref(false)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 8,
})
const roleFlag = ref<string>('')
const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 8,
    role: '',
  },
})

const updateUserStatusData = reactive<User.ChangeUserStatusRequestData>({
  /** 用户 id */
  userId: undefined,
  /** 状态 */
  status: undefined,
})

const useUserPage = (role: string) => {
  showDropdownRef.value = false
  if (role) {
    data.queryParam.role = role
    roleFlag.value = role.toString()
  } else {
    data.queryParam.role = ''
    roleFlag.value = ''
  }
  data.queryParam.pageNum = pageInfo.pageNum
  data.queryParam.pageSize = pageInfo.pageSize
  loading.value = true
  userPage(data.queryParam).then((res) => {
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
    label: '所有用户',
    key: '',
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '平台管理员',
    key: 'platform-admin',
  },
  {
    label: '平台运维员',
    key: 'platform-self-provisioner',
  },
  {
    label: '平台观察员',
    key: 'platform-view',
  },
  {
    label: '游客',
    key: 'platform-visitor',
  },
])

const handleUserDelete = (id: number) => {
  userDelete(id).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
      useUserPage('')
    }
  })
}

const handleUserStatusUpdate = (id: number, status: number) => {
  updateUserStatusData.userId = id
  updateUserStatusData.status = status
  userStatusUpdate(updateUserStatusData).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      message.success(res.message)
      useUserPage('')
    }
  })
  updateUserStatusData.userId = undefined
  updateUserStatusData.status = undefined
}

useUserPage('')
</script>

<template>
  <n-card content-style="padding: 0;" class="my-0.5">
    <n-page-header :title="t('menu.system.user')" class="mx-0.5">
      <template #extra>
        <div class="flex items-center">
          <v-btn icon="person_add" variant="text" size="x-small" @click="router.push('/@admin/system/user/add')" />
          <n-dropdown :options="pageOptions || undefined" @select="useUserPage">
            <v-btn icon="group" variant="text" size="x-small" />
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
                  <v-list-item @click="router.push({ path: `/@admin/system/user/${encodeURIComponent(item.username)}`, params: { username: item.username } })">
                    <v-list-item-title>{{ t('button.detail') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="router.push({ path: '/@admin/system/user/edit', query: { id: item.id } })">
                    <v-list-item-title>{{ t('button.edit') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="user.roleCode === 'platform-super-admin'" @click="router.push({ path: '/@admin/system/user/pwd', query: { id: item.id } })">
                    <v-list-item-title>{{ t('button.pwd') }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
          <div class="justify-center">
            <img
              class="rounded-full my-1 w-14 h-14 mx-auto"
              alt="avatar"
              :src="item.avatar"
            />
            {{ item.remark }}
          </div>
          <template #action>
            <div class="mt-auto">
              <div class="flex justify-space-between">
                <div class="flex items-center justify-center space-x-1">
                  <span
                    class="inline-flex items-center justify-center rounded-full bg-blue-400 px-2.5 py-0.5 text-coolGray-50"
                  >
                    <p class="whitespace-nowrap text-sm">
                      {{
                        item.role === 'platform-super-admin' ? '超级管理员'
                        : item.role === 'platform-admin' ? '平台管理员'
                        : item.role === 'platform-self-provisioner' ? '平台运维员'
                        : item.role === 'platform-view' ? '平台观察员' : '游客'
                      }}
                    </p>
                  </span>
                  <span
                    v-if="item.role === 'platform-super-admin' && item.status === 1"
                    class="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
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
                  <span
                    v-else-if="item.role === 'platform-super-admin' && item.status === 0"
                    class="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700"
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
                  <n-popconfirm
                    v-else-if="item.role !== 'platform-super-admin' && item.status === 1"
                    positive-text="确定"
                    negative-text="取消"
                    @positive-click="() => handleUserStatusUpdate(item.id, 0)"
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
                    @positive-click="() => handleUserStatusUpdate(item.id, 1)"
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
                </div>
                <span v-if="item.role !== 'platform-super-admin'" class="icon-hover">
                  <n-popconfirm
                    positive-text="确定"
                    negative-text="取消"
                    @positive-click="() => handleUserDelete(item.id)"
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
                <n-popover v-else trigger="hover" :keep-alive-on-hover="false">
                  <template #trigger>
                    <n-icon size="18" class="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                        <path d="M16 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z" fill="currentColor"></path>
                        <path d="M26 30h-2v-5a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v5H6v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z" fill="currentColor"></path>
                      </svg>
                    </n-icon>
                  </template>
                  <span>超级管理员无法被删除！</span>
                </n-popover>
              </div>
            </div>
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
    <el-pagination
      v-model:current-page="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      layout="total, prev, pager, next"
      :total="pageInfo.total"
      hide-on-single-page
      @current-change="(current) => { pageInfo.pageNum = current; useUserPage(roleFlag) }"
    />
  </n-card>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
