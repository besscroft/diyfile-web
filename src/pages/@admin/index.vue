<script setup lang="ts">
import { Warning } from '@element-plus/icons-vue'
import { getServerInfo, getTotalInfo } from '~/api/modules/monitor'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const { t } = useI18n()
const loadingTotal = ref<boolean>(true)
const serverInfo = ref({
  memoryInfo: {
    total: 0,
    used: 0,
    free: 0,
  },
  cpuInfo: {
    cpuNum: 0,
  },
  diskInfos: [],
  systemInfo: {
    computerIp: '',
    computerName: '',
    osArch: '',
    osName: '',
    userDir: '',
  },
})
const totalInfo = ref({
  storageActiveCount: 0,
  storageCount: 0,
  userCount: 0,
  userDisableCount: 0,
})

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

const handServerInfo = async () => {
  loadingTotal.value = true
  await getTotalInfo().then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      totalInfo.value = res.data
    }
    loadingTotal.value = false
  })
  await getServerInfo().then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      serverInfo.value = res.data
    }
  })
}

onBeforeMount(() => {
  handServerInfo()
})

const timer = setInterval(() => {
  handServerInfo()
}, 5000)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <n-card content-style="padding: 0;" class="my-0.5">
    <n-page-header :title="t('menu.index')" class="mx-0.5">
      <template #extra>
        <div class="flex items-center">
          <v-btn icon="sync" variant="text" size="x-small" @click="handServerInfo"></v-btn>
        </div>
      </template>
    </n-page-header>
  </n-card>
  <n-card content-style="padding: 0;" class="box-card h-full w-full overflow-auto" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8" class="mx-0.5">
      <n-grid-item>
        <n-card content-style="padding: 0.25rem;" class="box-card h-36">
          <div class="statistic-card flex h-full">
            <el-statistic class="flex-grow ml-1" :value="`${(serverInfo.memoryInfo.used / 1024 / 1024 / 1024).toFixed(2)}GB`">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  已用内存
                  <el-tooltip
                    effect="dark"
                    content="服务器当前已使用内存"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <n-progress
              type="dashboard"
              gap-position="bottom"
              :percentage="((serverInfo.memoryInfo.used / 1024 / 1024).toFixed(2) / (serverInfo.memoryInfo.total / 1024 / 1024).toFixed(2)).toFixed(2) * 100"
            />
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card content-style="padding: 0.25rem;" class="box-card h-36">
          <div class="statistic-card flex h-full">
            <el-statistic class="flex-grow" :value="`${(serverInfo.memoryInfo.total / 1024 / 1024 / 1024).toFixed(2)}GB`">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  总内存
                  <el-tooltip
                    effect="dark"
                    content="服务器总内存"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <el-statistic class="flex-grow" :value="`${(serverInfo.memoryInfo.free / 1024 / 1024 / 1024).toFixed(2)}GB`" title="New transactions today">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  剩余内存
                  <el-tooltip
                    effect="dark"
                    content="服务器当前可使用内存"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card content-style="padding: 0.25rem;" class="box-card h-36">
          <div class="statistic-card flex h-full">
            <el-statistic class="flex-grow" :value="totalInfo.userCount">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  用户总数
                  <el-tooltip
                    effect="dark"
                    content="用户总数量"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <el-statistic class="flex-grow mx-1" :value="totalInfo.userDisableCount">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  禁用数量
                  <el-tooltip
                    effect="dark"
                    content="已经禁用的用户数量"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card content-style="padding: 0.25rem;" class="box-card h-36">
          <div class="statistic-card flex h-full">
            <el-statistic class="flex-grow" :value="totalInfo.storageCount">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  存储总数
                  <el-tooltip
                    effect="dark"
                    content="存储总数量"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <el-statistic class="flex-grow mx-1" :value="totalInfo.storageActiveCount">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  启用数量
                  <el-tooltip
                    effect="dark"
                    content="启用的存储数量"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-descriptions v-if="serverInfo" title="服务器信息" label-placement="left" bordered :column="1">
          <n-descriptions-item label="服务器名称">
            {{ serverInfo.systemInfo.computerName }}
          </n-descriptions-item>
          <n-descriptions-item label="服务器IP">
            {{ serverInfo.systemInfo.computerIp }}
          </n-descriptions-item>
          <n-descriptions-item label="操作系统">
            {{ serverInfo.systemInfo.osName }}
          </n-descriptions-item>
          <n-descriptions-item label="系统架构">
            {{ serverInfo.systemInfo.osArch }}
          </n-descriptions-item>
          <n-descriptions-item label="CPU 核心数">
            {{ serverInfo.cpuInfo.cpuNum }}
          </n-descriptions-item>
          <n-descriptions-item label="总内存">
            {{ (serverInfo.memoryInfo.total / 1024 / 1024).toFixed(2) }} MB
          </n-descriptions-item>
          <n-descriptions-item label="已用内存">
            {{ (serverInfo.memoryInfo.used / 1024 / 1024).toFixed(2) }} MB
          </n-descriptions-item>
          <n-descriptions-item label="剩余内存">
            {{ (serverInfo.memoryInfo.free / 1024 / 1024).toFixed(2) }} MB
          </n-descriptions-item>
        </n-descriptions>
      </n-grid-item>
      <n-grid-item>
        <el-divider content-position="left">提建议/问题反馈</el-divider>
        <span>欢迎通过 issues 提交建议或问题反馈，我们会尽快处理！</span>
        <el-divider content-position="left">技术支持</el-divider>
        <span>我提供免费技术支持，你可以通过邮邮件与我取得联系，非工作时间我会尽快回复。
            Email: <a href="mailto:besscroft@foxmail.com"><b>旅行者</b></a></span>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 16px;
  border-radius: 4px;
}
</style>

<route lang="yaml">
meta:
  layout: admin
</route>
