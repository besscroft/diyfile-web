<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { User } from '~/api/interface/user'
import { userDelete, userPage, userStatusUpdate } from '~/api/modules/user'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const user = useUserStore()
const loading = ref<Boolean>(true)
const { t } = useI18n()
const { isMobile } = useDevice()
const dataList = ref()
const pageInfo = reactive({
  total: 0,
  pageNum: 1,
  pageSize: 7,
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
      dataList.value = res.data.list
    }
    loading.value = false
  })
}

const handleUserDelete = (id: number) => {
  userDelete(id).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      ElMessage.info(res.message)
      useUserPage('')
    }
  })
}

const handleUserStatusUpdate = (id: number, status: number) => {
  updateUserStatusData.userId = id
  updateUserStatusData.status = status
  userStatusUpdate(updateUserStatusData).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      ElMessage.success(res.message)
      useUserPage('')
    }
  })
  updateUserStatusData.userId = undefined
  updateUserStatusData.status = undefined
}

useUserPage('')
</script>

<template>
  <el-card :body-style="{ padding: '0.25rem' }" class="my-1" shadow="never">
    <el-page-header @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-600 mr-2"> {{ t('menu.system.user') }} </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button type="primary" class="ml-2">Edit</el-button>
        </div>
      </template>
    </el-page-header>
  </el-card>
  <el-card :body-style="{ padding: '0px' }" class="box-card overflow-auto" style="height: calc(100% - 4rem); -ms-overflow-style: none;" shadow="never">
    <el-row :gutter="[12, 10]">
      <el-col v-for="item in dataList" :key="item.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <el-card :body-style="{ padding: '0.25rem' }" class="box-card mx-1 my-0.5 h-80">
          <template #header>
            <div class="flex justify-space-between align-center">
              <span class="mx-1">{{ item.name }}</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <v-card
            variant="text"
            class="flex h-68 flex-col"
            style="display: flex"
          >
            <div class="justify-center">
              <img
                class="rounded-full mt-1 w-14 h-14 mx-auto"
                alt="avatar"
                :src="item.avatar"
              />
              {{ item.remark }}
            </div>
            <div class="mt-auto">
              <el-tag v-if="item.role === 'platform-super-admin'" class="mx-1" effect="dark" round >超级管理员</el-tag>
              <el-tag v-if="item.role === 'platform-admin'" class="mx-1" effect="dark" round >平台管理员</el-tag>
              <el-tag v-if="item.role === 'platform-self-provisioner'" class="mx-1" effect="dark" round >平台运维员</el-tag>
              <el-tag v-if="item.role === 'platform-view'" class="mx-1" effect="dark" round >平台观察员</el-tag>
              <el-tag v-if="item.role === 'platform-visitor'" class="mx-1" effect="dark" round >游客</el-tag>
            </div>
          </v-card>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
