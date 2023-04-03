<script setup lang="ts">
import { getServerInfo, getTotalInfo } from '~/api/modules/monitor'
import { ResultEnum } from '~/enums/httpEnum'

const router = useRouter()
const { t } = useI18n()
const visible = ref<Boolean>(false)
const loadingServer = ref<Boolean>(true)
const loadingTotal = ref<Boolean>(true)
const serverInfo = ref()
const totalInfo = ref()

const percentage = ref(0)
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
  loadingServer.value = true
  await getServerInfo().then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      serverInfo.value = res.data
    }
    loadingServer.value = false
  })
}

const handleOk = () => {
  visible.value = false
}

onBeforeMount(() => {
  handServerInfo()
})

setInterval(() => {
  handServerInfo()
}, 5000)
</script>

<template>
  <el-card :body-style="{ padding: '0.25rem' }" class="my-1" shadow="never">
    <el-page-header @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-400 mr-2"> {{ t('menu.index') }} </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <v-btn icon="sync" variant="text" size="x-small" @click="handServerInfo"></v-btn>
        </div>
      </template>
    </el-page-header>
  </el-card>
  <el-card :body-style="{ padding: '0px' }" class="box-card h-full w-full overflow-auto" style="height: calc(100% - 4rem); -ms-overflow-style: none;" shadow="never">
    <div class="flex flex-wrap flex-col sm:flex-row">
      <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
        <el-descriptions
          v-loading="loadingServer"
          v-if="serverInfo"
          class="margin-top"
          title="服务器信息"
          :column="1"
          border
        >
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                服务器名称
              </div>
            </template>
            {{ serverInfo.systemInfo.computerName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                服务器IP
              </div>
            </template>
            {{ serverInfo.systemInfo.computerIp }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                操作系统
              </div>
            </template>
            {{ serverInfo.systemInfo.osName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                系统架构
              </div>
            </template>
            {{ serverInfo.systemInfo.osArch }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                CPU 核心数
              </div>
            </template>
            {{ serverInfo.cpuInfo.cpuNum }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                总内存
              </div>
            </template>
            {{ (serverInfo.memoryInfo.total / 1024 / 1024).toFixed(2) }} MB
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                已用内存
              </div>
            </template>
            {{ (serverInfo.memoryInfo.used / 1024 / 1024).toFixed(2) }} MB
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                剩余内存
              </div>
            </template>
            {{ (serverInfo.memoryInfo.free / 1024 / 1024).toFixed(2) }} MB
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                内存图表
              </div>
            </template>
            <el-progress
              type="dashboard"
              :percentage="((serverInfo.memoryInfo.used / 1024 / 1024).toFixed(2) / (serverInfo.memoryInfo.total / 1024 / 1024).toFixed(2)).toFixed(2) * 100"
              :color="colors"
            />
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
        <el-descriptions
          v-loading="loadingTotal"
          v-if="totalInfo"
          class="margin-top"
          title="概览"
          :column="2"
          border
        >
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                用户总数
              </div>
            </template>
            {{ totalInfo.userCount }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                禁用数量
              </div>
            </template>
            {{ totalInfo.userDisableCount }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                存储总数
              </div>
            </template>
            {{ totalInfo.storageCount }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                启用数量
              </div>
            </template>
            {{ totalInfo.storageActiveCount }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
        <el-divider content-position="left">提建议/问题反馈</el-divider>
        <span>欢迎通过 issues 提交建议或问题反馈，我们会尽快处理！</span>
        <el-divider content-position="left">技术支持</el-divider>
        <span>我提供免费技术支持，你可以通过邮邮件与我取得联系，非工作时间我会尽快回复。
            Email: <a href="mailto:besscroft@foxmail.com"><b>旅行者</b></a></span>
      </div>
      <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
        <el-divider content-position="left">...</el-divider>
      </div>
    </div>
  </el-card>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
