<script setup lang="ts">
import { getDefaultStorage } from '~/api/modules/file'
import { ResultEnum } from '~/enums/httpEnum'

const { t } = useI18n()
const user = useUserStore()
const router = useRouter()
const loading = ref<boolean>(true)
const routes = ref<Array<any>>([
  {
    href: '/',
    title: 'Home',
  },
])

const desserts = ref(
  [
    {
      name: '《原神》EP - 仙泽麟行之迹.mkv',
      size: '306.25 MB',
    },
    {
      name: 'Ice cream sandwich',
      size: '159',
    },
  ],
)

onBeforeMount(() => {
  getDefaultStorage().then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      if (res.data.storageKey) {
        router.push({ path: `/${res.data.storageKey}` })
      } else {
        loading.value = false
      }
    }
  }).catch((err) => {
    console.log(err)
    loading.value = false
  })
})
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4" :xxl="4"></el-col>
    <el-col :xs="24" :sm="22" :md="22" :lg="18" :xl="16" :xxl="16">
      <v-breadcrumbs :items="routes">
        <template v-slot:prepend>
          <v-icon size="small" icon="public"></v-icon>
        </template>
      </v-breadcrumbs>
      什么都没有呢！请登录后进入后台进行配置！
    </el-col>
    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4" :xxl="4"></el-col>
  </el-row>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
