<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { userPage } from '~/api/modules/user'
import useDevice from '~/hooks/device'

const loading = ref<Boolean>(true)
const { t } = useI18n()
const { isMobile } = useDevice()
const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
  },
})
const userDetail = ref({})
const visible = ref<Boolean>(false)

const dataList = ref()

const handleClickDetail = (data: any) => {
  userDetail.value = data
  visible.value = true
}

const handleOk = () => {
  visible.value = false
}

const useUserPage = () => {
  loading.value = true
  userPage(data.queryParam).then((res) => {
    if (res.code === 200) {
      dataList.value = res.data.list
    }
    loading.value = false
  })
}

const handleUserAdd = () => {
  Message.info('触发用户新增事件，还没写！')
}

const handleUserDelete = () => {
  Message.info('触发用户删除事件，还没写！')
}

useUserPage()
</script>

<template>
  <div
    class="layout-demo" :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '12px',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ height: '100%' }">
      <a-space v-if="loading" direction="vertical" size="large" :style="{ width: '100%' }">
        <a-skeleton animation="animation">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-line v-if="!isMobile" :rows="10" />
            <a-skeleton-shape size="large" :key="index" v-for="index in 10" />
          </a-space>
        </a-skeleton>
      </a-space>
      <div v-else class="flex flex-wrap flex-col sm:flex-row">
        <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1" :key="item" v-for="item in dataList">
          <a-card :style="{ height: '360px' }" hoverable>
            <template #actions>
              <span class="icon-hover"><icon-user @click="handleClickDetail(item)" /></span>
              <span class="icon-hover"><icon-delete @click="handleUserDelete(item)" /></span>
            </template>
            <a-card-meta :title="item.name" :description="item.remark">
              <template #avatar>
                <div
                  :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
                >
                  <a-avatar :size="40" :style="{ marginRight: '8px' }">
                    <img
                      alt="avatar"
                      :src="item.avatar"
                    />
                  </a-avatar>
                  <a-typography-text>{{ t('table.user.role') }}: <a-tag>{{ item.role }}</a-tag></a-typography-text>
                </div>
                <br />
                {{ t('table.user.loginTime') }}: {{ item.loginTime }}
              </template>
            </a-card-meta>
          </a-card>
        </div>
        <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
          <a-card :style="{ height: '360px' }" hoverable>
            <a-button type="text" :style="{ height: '328px', width: '100%' }" @click="handleUserAdd">
              <template #icon>
                <icon-plus />
              </template>
            </a-button>
          </a-card>
        </div>
      </div>
    </a-card>
  </div>
  <a-modal
    v-model:visible="visible"
    @ok="handleOk"
    hide-cancel
    :closable="false"
  >
    <UserDesc :value="userDetail" />
  </a-modal>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
