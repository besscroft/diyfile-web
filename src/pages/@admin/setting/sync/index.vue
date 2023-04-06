<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { Sync } from '~/api/interface/Sync'
import { getEnableStorage } from '~/api/modules/storage'
import { taskAdd } from '~/api/modules/sync'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const { t } = useI18n()

// 同步前存储 key
const beforeStorageKey = ref<string>('')
// 同步前存储路径
const beforePath = ref<string>('')
// 同步后存储 key
const afterStorageKey = ref<string>('')
// 同步后存储路径
const afterPath = ref<string>('')
// 可用存储列表
const storageList = ref()
const taskAddParam = reactive<Sync.TaskAddParam>({
  beforeStorageKey: '',
  beforePath: '',
  afterStorageKey: '',
  afterPath: '',
})

/** 添加同步任务处理 */
const taskAddHandle = () => {
  taskAddParam.beforeStorageKey = beforeStorageKey.value
  taskAddParam.beforePath = beforePath.value
  taskAddParam.afterStorageKey = afterStorageKey.value
  taskAddParam.afterPath = afterPath.value
  taskAdd(taskAddParam).then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      ElMessage.success(res.message)
    }
  }).catch((err) => {
    console.log(err)
  })
}

onMounted(() => {
  // 获取存储下拉框数据
  getEnableStorage().then((res) => {
    if (res.code === ResultEnum.SUCCESS && Array.isArray(res.data)) {
      storageList.value = res.data
    }
  }).catch((err) => {
    console.log(err)
  })
})
</script>

<template>
  <el-card :body-style="{ padding: '0.25rem' }" class="my-1 h-10" shadow="never">
    <el-page-header @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-400 mr-2"> {{ t('menu.setting.sync') }} </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <v-btn icon="done" variant="text" size="x-small" @click="taskAddHandle" />
        </div>
      </template>
    </el-page-header>
  </el-card>
  <el-card :body-style="{ padding: '0px' }" class="box-card h-full w-full overflow-auto" style="height: calc(100% - 4rem); -ms-overflow-style: none;" shadow="never">
    <el-row :gutter="10">
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
      <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
        <div class="flex flex-col space-y-3">
          <el-select v-model="beforeStorageKey" class="mt-4" placeholder="请选择需要同步的存储 ...">
            <el-option
              v-for="item in storageList"
              :key="item.value"
              :label="item.name"
              :value="item.storageKey"
            />
          </el-select>
          <el-input v-model="beforePath" placeholder="请输入需要同步的文件或文件夹路径" clearable />
          <el-select v-model="afterStorageKey" class="mt-4" placeholder="请选择同步到哪个存储 ...">
            <el-option
              v-for="item in storageList"
              :key="item.value"
              :label="item.name"
              :value="item.storageKey"
            />
          </el-select>
          <el-input v-model="afterPath" placeholder="请输入同步到的文件夹路径" clearable />
          <el-alert
            type="warning"
            description="目前仅支持 OneDrive 同步，一般情况下需要填写正确的绝对路径。
              比如说 /test/temp 文件夹同步到 /new 文件夹，或者 /test/123.txt 同步到 /new 文件夹"
            show-icon
            :closable="false"
          />
          <el-alert
            type="warning"
            description="避免重复请求，以免造成资源浪费！同步前也请考量下配置，比如 512M 内存的小机器和 IO 性能极差的机器，就不建议跨存储同步大量大文件了..."
            show-icon
            :closable="false"
          />
        </div>
      </el-col>
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
    </el-row>
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
