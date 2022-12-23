<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { userDelete, userPage } from '~/api/modules/user'
import useDevice from '~/hooks/device'

const router = useRouter()
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

const dataList = ref()

const useUserPage = () => {
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
    }
  })
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
      <a-row v-else :gutter="[12, 10]">
        <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :key="item.id" v-for="item in dataList">
          <a-card :style="{ height: '320px' }" hoverable>
            <template #actions>
              <span class="icon-hover">
                <icon-user @click="router.push({ path: `/@admin/system/user/${encodeURIComponent(item.username)}`, params: { username: item.username } })" />
              </span>
              <span class="icon-hover">
                <a-popconfirm content="确定要删除吗?" type="warning" :onCancel="handleUserAdd" :onOk="handleUserDelete">
                  <a-button><icon-delete /></a-button>
                </a-popconfirm>
              </span>
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
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <a-card
            hoverable
            :style="{ height: '320px' }"
            class="flex items-center justify-center"
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
