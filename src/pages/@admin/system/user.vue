<script setup lang="ts">
import { userPage } from '~/api/modules/user'

const loading = ref<Boolean>(true)
const { t } = useI18n()
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

useUserPage()
</script>

<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '12px',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ width: '100%', height: '100%', marginBottom: '16px' }">
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
      >
        <a-space v-if="loading" direction="vertical" size="large" :style="{ width: '100%' }">
          <a-skeleton animation="animation">
            <a-space direction="vertical" :style="{ width: '100%' }" size="large">
              <a-skeleton-line :rows="10" />
            </a-space>
          </a-skeleton>
        </a-space>
        <a-table v-else :data="dataList" :style="{ width: '100%' }">
          <template #columns>
            <a-table-column :title="t('table.user.userName')" data-index="name"></a-table-column>
            <a-table-column :title="t('table.user.role')" data-index="role"></a-table-column>
            <a-table-column :title="t('table.user.avatar')">
              <template #cell="{ record }">
                <a-avatar>
                  <img
                    alt="avatar"
                    :src="record.avatar"
                  />
                </a-avatar>
              </template>
            </a-table-column>
            <a-table-column :title="t('table.user.loginTime')" data-index="loginTime"></a-table-column>
            <a-table-column :title="t('table.Optional')">
              <template #cell="{ record }">
                <a-button @click="handleClickDetail(record)" shape="circle"><icon-user /></a-button>
              </template>
            </a-table-column>
          </template>
        </a-table>
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
