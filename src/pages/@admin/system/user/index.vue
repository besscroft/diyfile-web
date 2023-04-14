<script setup lang="ts">
import { Delete, User as userIcon } from '@element-plus/icons-vue'
import type { User } from '~/api/interface/user'
import { userDelete, userPage, userStatusUpdate } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const user = useUserStore()
const message = useMessage()
const loading = ref<boolean>(true)
const { t } = useI18n()
const dataList = ref()
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
          <el-dropdown>
            <v-btn icon="group" variant="text" size="x-small" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="useUserPage('')">所有用户</el-dropdown-item>
                <el-dropdown-item @click="useUserPage('platform-admin')" divided>平台管理员</el-dropdown-item>
                <el-dropdown-item @click="useUserPage('platform-self-provisioner')">平台运维员</el-dropdown-item>
                <el-dropdown-item @click="useUserPage('platform-view')">平台观察员</el-dropdown-item>
                <el-dropdown-item @click="useUserPage('platform-visitor')" divided>游客</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </n-page-header>
  </n-card>
  <n-card content-style="padding: 0;" class="box-card overflow-auto no-scrollbar" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item v-if="loading">
        <el-skeleton :body-style="{ padding: '0.25rem' }" class="box-card h-80">
          <template #template>
            <el-skeleton-item variant="rect" class="w-11/12 h-68 mx-2.5" />
            <div style="padding: 14px">
              <div class="w-11/12 flex align-center justify-space-between">
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
            </div>
          </template>
        </el-skeleton>
      </n-grid-item>
      <n-grid-item v-for="item in dataList" v-else :key="item.id">
        <n-card
          :title="item.name"
          content-style="padding: 0.25rem;"
          class="box-card h-80"
        >
          <template #header-extra>
            <el-dropdown>
              <v-btn icon="expand_more" variant="text" size="x-small" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="router.push({ path: `/@admin/system/user/${encodeURIComponent(item.username)}`, params: { username: item.username } })">{{ t('button.detail') }}</el-dropdown-item>
                  <el-dropdown-item @click="router.push({ path: '/@admin/system/user/edit', query: { id: item.id } })">{{ t('button.edit') }}</el-dropdown-item>
                  <el-dropdown-item v-if="user.roleCode === 'platform-super-admin'" @click="router.push({ path: '/@admin/system/user/pwd', query: { id: item.id } })">{{ t('button.pwd') }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
                <div class="flex items-center justify-center">
                  <el-tag v-if="item.role === 'platform-super-admin'" class="mx-1" effect="dark" round>超级管理员</el-tag>
                  <el-tag v-if="item.role === 'platform-admin'" class="mx-1" effect="dark" round>平台管理员</el-tag>
                  <el-tag v-if="item.role === 'platform-self-provisioner'" class="mx-1" effect="dark" round>平台运维员</el-tag>
                  <el-tag v-if="item.role === 'platform-view'" class="mx-1" effect="dark" round>平台观察员</el-tag>
                  <el-tag v-if="item.role === 'platform-visitor'" class="mx-1" effect="dark" round>游客</el-tag>
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
                  <el-popconfirm
                    v-else-if="item.role !== 'platform-super-admin' && item.status === 1"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    title="确定要禁用吗?"
                    @confirm="() => handleUserStatusUpdate(item.id, 0)"
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
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    title="确定要启用吗?"
                    @confirm="() => handleUserStatusUpdate(item.id, 1)"
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
                </div>
                <span v-if="item.role !== 'platform-super-admin'" class="icon-hover">
                  <el-popconfirm
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    :icon="Delete"
                    title="确定要删除吗?"
                    @confirm="() => handleUserDelete(item.id)"
                  >
                    <template #reference>
                      <el-button type="warning" :icon="Delete" link circle />
                    </template>
                  </el-popconfirm>
                </span>
                <el-popover
                  v-else
                  placement="top-start"
                  title="提示"
                  trigger="hover"
                  content="超级管理员无法被删除！"
                >
                  <template #reference>
                    <el-button type="success" :icon="userIcon" link circle />
                  </template>
                </el-popover>
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

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
