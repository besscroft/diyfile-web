<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { User } from '~/api/interface/user'
import { userDelete, userPage, userStatusUpdate } from '~/api/modules/user'

const router = useRouter()
const loading = ref<Boolean>(true)
const { t } = useI18n()
const { isMobile } = useDevice()
const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    role: '',
  },
})
const updateUserStatusData = reactive<User.ChangeUserStatusRequestData>({
  /** 用户 id */
  userId: undefined,
  /** 状态 */
  status: undefined,
})

const dataList = ref()

const useUserPage = (role: string) => {
  if (role) {
    data.queryParam.role = role
  } else {
    data.queryParam.role = ''
  }
  loading.value = true
  userPage(data.queryParam).then((res) => {
    if (res.code === 200) {
      dataList.value = res.data.list
    }
    loading.value = false
  })
}

const handleUserDelete = (id: number) => {
  userDelete(id).then((res) => {
    if (res.code === 200) {
      Message.info(res.message)
      useUserPage('')
    }
  })
}

const handleUserStatusUpdate = (id: number, status: number) => {
  updateUserStatusData.userId = id
  updateUserStatusData.status = status
  userStatusUpdate(updateUserStatusData).then((res) => {
    if (res.code === 200) {
      Message.success(res.message)
      useUserPage('')
    }
  })
  updateUserStatusData.userId = undefined
  updateUserStatusData.status = undefined
}

useUserPage('')
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
    <a-card hoverable :style="{ height: '100%' }" :title="t('menu.system.user')">
      <template #extra>
        <a-space>
          <a-dropdown trigger="hover">
            <a-button>{{ t('button.role') }}</a-button>
            <template #content>
              <a-doption @click="useUserPage('')">所有用户</a-doption>
              <a-doption @click="useUserPage('platform-admin')">平台管理员</a-doption>
              <a-doption @click="useUserPage('platform-self-provisioner')">平台运维员</a-doption>
              <a-doption @click="useUserPage('platform-view')">平台观察员</a-doption>
              <a-doption @click="useUserPage('platform-visitor')">游客</a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </template>
      <a-space v-if="loading" direction="vertical" size="large" :style="{ width: '100%' }">
        <a-skeleton animation="animation">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-line v-if="!isMobile" :rows="10" />
            <a-skeleton-shape size="large" :key="index" v-for="index in 10" />
          </a-space>
        </a-skeleton>
      </a-space>
      <a-row v-else :gutter="[12, 10]">
        <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :key="item.id" v-for="item in dataList">
          <a-card :title="item.name" :style="{ height: '320px' }" hoverable>
            <template #extra>
              <a-dropdown trigger="hover">
                <a-button type="primary">{{ t('table.Optional') }}</a-button>
                <template #content>
                  <a-doption @click="router.push({ path: `/@admin/system/user/${encodeURIComponent(item.username)}`, params: { username: item.username } })">{{ t('button.detail') }}</a-doption>
                  <a-doption @click="router.push({ path: '/@admin/system/user/edit', query: { id: item.id } })">{{ t('button.edit') }}</a-doption>
                  <a-doption @click="router.push({ path: '/@admin/system/user/pwd', query: { id: item.id } })">{{ t('button.pwd') }}</a-doption>
                </template>
              </a-dropdown>
            </template>
            <template #cover>
              <div class="h-48">
                <img
                  class="rounded-full mt-2 w-14 h-14 mx-auto"
                  alt="avatar"
                  :src="item.avatar"
                />
                <a-typography-paragraph class="mt-4 ml-2 mr-2 mb-2">
                  {{ item.remark }}
                </a-typography-paragraph>
              </div>
            </template>
            <template #actions>
              <span class="icon-hover" v-if="item.role !== 'platform-super-admin'">
                <a-popconfirm content="确定要删除吗?" type="warning" :onOk="() => handleUserDelete(item.id)">
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
                    <a-tag color="blue" v-if="item.role === 'platform-super-admin'">超级管理员</a-tag>
                    <a-tag color="cyan" v-if="item.role === 'platform-admin'">平台管理员</a-tag>
                    <a-tag color="orange" v-if="item.role === 'platform-self-provisioner'">平台运维员</a-tag>
                    <a-tag color="lime" v-if="item.role === 'platform-view'">平台观察员</a-tag>
                    <a-tag color="green" v-if="item.role === 'platform-visitor'">游客</a-tag>
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
                    <a-popconfirm v-else-if="item.role !== 'platform-super-admin' && item.status === 1" content="确定要禁用吗?" type="warning" :onOk="() => handleUserStatusUpdate(item.id, 0)">
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
                    <a-popconfirm v-else content="确定要启用吗?" type="warning" :onOk="() => handleUserStatusUpdate(item.id, 1)">
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
                  </a-space>
                </div>
                <br />
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <a-card
            hoverable
            :style="{ height: '320px' }"
            class="flex items-center justify-center cursor-pointer"
            @click="router.push('/@admin/system/user/add')"
          >
            <a-result>
              <template #icon>
                <icon-plus style="font-size: 20px" />
              </template>
            </a-result>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
