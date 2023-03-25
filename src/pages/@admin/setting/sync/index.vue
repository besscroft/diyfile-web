<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
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
      Message.success(res.message)
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
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '0.25rem',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ height: '100%' }" :title="t('menu.setting.sync')">
      <template #extra>
        <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="taskAddHandle">{{ t('button.submit') }}</button>
      </template>
      <a-row>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
        <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-space direction="vertical" fill>
            <a-select
              v-model="beforeStorageKey"
              placeholder="请选择需要同步的存储 ..."
            >
              <a-option
                v-for="item in storageList"
                :key="item"
                :value="item.storageKey"
              >
                {{ item.name }}
              </a-option>
            </a-select>
            <a-input
              v-model="beforePath"
              placeholder="请输入需要同步的文件或文件夹路径"
              allow-clear
            />
            <a-select
              v-model="afterStorageKey"
              placeholder="请选择同步到哪个存储 ..."
            >
              <a-option
                v-for="item in storageList"
                :key="item"
                :value="item.storageKey"
              >
                {{ item.name }}
              </a-option>
            </a-select>
            <a-input
              v-model="afterPath"
              placeholder="请输入同步到的文件夹路径"
              allow-clear
            />
            <a-alert type="warning">目前仅支持 OneDrive 同步，一般情况下需要填写正确的绝对路径。
              比如说 /test/temp 文件夹同步到 /new 文件夹，或者 /test/123.txt 同步到 /new 文件夹</a-alert>
            <a-alert type="warning">避免重复请求，以免造成资源浪费！同步前也请考量下配置，比如 512M 内存的小机器和 IO 性能极差的机器，就不建议跨存储同步大量大文件了...</a-alert>
          </a-space>
        </a-col>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
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
