<script setup lang="ts">
import type { SelectGroupOption, SelectOption } from 'naive-ui'
import type { Sync } from '~/api/interface/Sync'
import { getEnableStorage } from '~/api/modules/storage'
import { taskAdd } from '~/api/modules/sync'
import { ResultEnum } from '~/enums/httpEnum'

const message = useMessage()
const { t } = useI18n()
const { isMobile } = useDevice()

// 同步前存储 key
const beforeStorageKey = ref<string>()
// 同步前存储路径
const beforePath = ref<string>('')
// 同步后存储 key
const afterStorageKey = ref<string>()
// 同步后存储路径
const afterPath = ref<string>('')
const storageOptions = ref<Array<SelectOption | SelectGroupOption>>([])

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
      message.success(res.message)
    }
  }).catch((err) => {
    console.log(err)
  })
}

onBeforeMount(() => {
  // 获取存储下拉框数据
  getEnableStorage().then((res) => {
    if (res.code === ResultEnum.SUCCESS && Array.isArray(res.data)) {
      // 将 res.data 遍历插入 storageOptions
      for (const item of res.data) {
        storageOptions.value.push({
          label: item.name,
          value: item.storageKey,
        })
      }
    }
  }).catch((err) => {
    console.log(err)
  })
})
</script>

<template>
  <div flex grid justify-start justify-center items-center h-8>
    <p mr-auto text-base font-medium ml-0.25rem>{{ t('menu.setting.sync') }}</p>
    <div>
      <n-icon size="22" @click="taskAddHandle" class="cursor-pointer mr-0.25rem">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
          <path d="M13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z" fill="currentColor"></path>
        </svg>
      </n-icon>
    </div>
  </div>
  <div content-style="padding: 0;" h-full w-full mt-1 of-auto onscroll style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-grid cols="5" item-responsive responsive="screen">
      <n-grid-item offset="0 m:1 l:1" span="5 m:3 l:3">
        <div class="flex flex-col space-y-3">
          <n-select
            v-model:value="beforeStorageKey"
            placeholder="请选择需要同步的存储"
            :options="storageOptions"
            class="mt-4"
          />
          <n-input v-model:value="beforePath" type="text" placeholder="请输入需要同步的文件或文件夹路径" clearable />
          <n-select
            v-model:value="afterStorageKey"
            placeholder="请选择同步到哪个存储"
            :options="storageOptions"
            class="mt-4"
          />
          <n-input v-model:value="afterPath" type="text" placeholder="请输入同步到的文件夹路径" clearable />
          <n-alert type="warning">
            目前仅支持 OneDrive 同步，一般情况下需要填写正确的绝对路径。
            比如说 /test/temp 文件夹同步到 /new 文件夹，或者 /test/123.txt 同步到 /new 文件夹
          </n-alert>
          <n-alert type="warning">
            避免重复请求，以免造成资源浪费！同步前也请考量下配置，比如 512M 内存的小机器和 IO 性能极差的机器，就不建议跨存储同步大量大文件了...
          </n-alert>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
