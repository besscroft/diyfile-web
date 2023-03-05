<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getServerInfo, getTotalInfo } from '~/api/modules/monitor'

const router = useRouter()
const { t } = useI18n()
const visible = ref<Boolean>(false)
const loadingServer = ref<Boolean>(true)
const loadingTotal = ref<Boolean>(true)
const serverInfo = ref()
const totalInfo = ref()

const handServerInfo = async () => {
  loadingTotal.value = true
  await getTotalInfo().then((res) => {
    if (res.code === 200) {
      totalInfo.value = res.data
    }
    loadingTotal.value = false
  })
  loadingServer.value = true
  await getServerInfo().then((res) => {
    if (res.code === 200) {
      serverInfo.value = res.data
    }
    loadingServer.value = false
  })
}

const handleOk = () => {
  visible.value = false
}

handServerInfo()
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
    <a-card hoverable :style="{ height: '100%' }" :title="t('menu.index')">
      <template #extra>
        <a-space>
          <a-button :loading="loadingServer" @click="handServerInfo">
            <template #icon>
              <icon-sync />
            </template>
          </a-button>
        </a-space>
      </template>
      <div class="flex flex-wrap flex-col sm:flex-row">
        <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[21rem] m-1">
          <a-card :loading="loadingServer" title="运行信息" hoverable>
            <a-list>
              <a-list-item>服务器名称: {{ serverInfo.systemInfo.computerName }}</a-list-item>
              <a-list-item>服务器IP: {{ serverInfo.systemInfo.computerIp }}</a-list-item>
              <a-list-item>操作系统: {{ serverInfo.systemInfo.osName }}</a-list-item>
              <a-list-item>系统架构: {{ serverInfo.systemInfo.osArch }}</a-list-item>
              <a-list-item>CPU 核心数: {{ serverInfo.cpuInfo.cpuNum }}</a-list-item>
              <a-list-item>总内存: {{ (serverInfo.memoryInfo.total / 1024 / 1024).toFixed(2) }} MB</a-list-item>
              <a-list-item>已用内存: {{ (serverInfo.memoryInfo.used / 1024 / 1024).toFixed(2) }} MB</a-list-item>
              <a-list-item>剩余内存: {{ (serverInfo.memoryInfo.free / 1024 / 1024).toFixed(2) }} MB</a-list-item>
              <a-list-item>
                <a-progress :percent="((serverInfo.memoryInfo.used / 1024 / 1024).toFixed(2) / (serverInfo.memoryInfo.total / 1024 / 1024).toFixed(2)).toFixed(2)">
                  <template v-slot:text="scope" >
                    内存使用率 {{scope.percent * 100}}%
                  </template>
                </a-progress>
              </a-list-item>
            </a-list>
          </a-card>
        </div>
        <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
          <a-card :loading="loadingTotal" title="概览" hoverable>
            <a-card title="用户数量" :bordered="false" :style="{ width: '100%' }">
              <a-statistic title="用户总数" :value="totalInfo.userCount" show-group-separator />
              <a-divider direction="vertical" />
              <a-statistic title="禁用数量" :value="totalInfo.userDisableCount" show-group-separator />
            </a-card>
            <a-card title="存储数量" :bordered="false" :style="{ width: '100%' }">
              <a-statistic title="存储总数" :value="totalInfo.storageCount" show-group-separator />
              <a-divider direction="vertical" />
              <a-statistic title="启用数量" :value="totalInfo.storageActiveCount" show-group-separator />
            </a-card>
          </a-card>
        </div>
        <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
          <a-card title="Todo List" hoverable>
            <a-list>
              <a-list-item><icon-subscribed />MySQL 存储适配</a-list-item>
              <a-list-item><icon-subscribed />基于 openJDK 17 的 SpringBoot3 开发</a-list-item>
              <a-list-item><icon-subscribed />OneDrive 支持</a-list-item>
              <a-list-item><icon-subscribed />多元化存储支持</a-list-item>
              <a-list-item><icon-subscribed />多平台部署支持</a-list-item>
              <a-list-item><icon-subscribe />前端用 Vuetify 3 重写</a-list-item>
              <a-list-item><icon-github />更多请查看 issues 计划列表</a-list-item>
            </a-list>
          </a-card>
        </div>
        <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
          <a-card title="支持" hoverable>
            <a-divider orientation="left">提建议/问题反馈</a-divider>
            欢迎通过 issues 提交建议或问题反馈，我们会尽快处理！
            <a-divider orientation="left">技术支持</a-divider>
            我提供免费技术支持，你可以通过邮邮件与我取得联系，非工作时间我会尽快回复。
            Email: <a href="mailto:besscroft@foxmail.com"><b>旅行者</b></a>
          </a-card>
        </div>
      </div>
    </a-card>
    <a-drawer
      :visible="visible.value"
      placement="top"
      :closable="false"
      @ok="handleOk"
      unmountOnClose
      hideCancel
    >
      <template #title>
        Oops!
      </template>
      <div>如你所见，还有诸多问题，积极修复中，请耐心等待！如果你想一起参与，可联系我！</div>
    </a-drawer>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
