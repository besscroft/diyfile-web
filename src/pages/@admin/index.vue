<script setup lang="ts">
import { getServerInfo, getTotalInfo } from '~/api/modules/monitor'
import { ResultEnum } from '~/enums/httpEnum'

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
          <v-btn icon="sync" variant="text" size="x-small" @click="handServerInfo" />
        </div>
      </template>
    </n-page-header>
  </n-card>
  <n-card content-style="padding: 0;" class="box-card h-full w-full overflow-auto" style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item>
        <n-card content-style="padding: 0.25rem;" class="box-card h-36">
          <div class="statistic-card flex h-full">
            <n-statistic label="已用内存" class="flex-grow">
              {{ (serverInfo.memoryInfo.used / 1024 / 1024 / 1024).toFixed(2) }} GB
            </n-statistic>
            <n-progress
              type="dashboard"
              gap-position="bottom"
              :percentage="((serverInfo.memoryInfo.used / 1024 / 1024).toFixed(2) / (serverInfo.memoryInfo.total / 1024 / 1024).toFixed(2)).toFixed(2) * 100 || 0"
            />
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card content-style="padding: 0.25rem;" class="box-card h-36">
          <div class="statistic-card flex h-full">
            <n-statistic label="总内存" class="flex-grow">
              {{ (serverInfo.memoryInfo.total / 1024 / 1024 / 1024).toFixed(2) }} GB
            </n-statistic>
            <n-statistic label="剩余内存" class="flex-grow">
              {{ (serverInfo.memoryInfo.free / 1024 / 1024 / 1024).toFixed(2) }} GB
            </n-statistic>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card content-style="padding: 0.25rem;" class="box-card h-36">
          <div class="statistic-card flex h-full">
            <n-statistic label="用户总数" class="flex-grow">
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                    <path d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87zM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24zm-6 0c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1z" fill="currentColor"></path>
                  </svg>
                </n-icon>
              </template>
              <n-number-animation :from="0" :to="totalInfo.userCount" />
            </n-statistic>
            <n-statistic label="禁用数量" class="flex-grow">
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                    <circle cx="9" cy="8" opacity=".3" r="2" fill="currentColor"></circle>
                    <path opacity=".3" d="M9 15c-2.7 0-5.8 1.29-6 2.01V18h12v-1c-.2-.71-3.3-2-6-2z" fill="currentColor"></path>
                    <path d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87zM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24zm-6 0c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1z" fill="currentColor"></path>
                  </svg>
                </n-icon>
              </template>
              <n-number-animation :from="0" :to="totalInfo.userDisableCount" />
            </n-statistic>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card content-style="padding: 0.25rem;" class="box-card h-36">
          <div class="statistic-card flex h-full">
            <n-statistic label="存储总数" class="flex-grow">
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                    <path d="M4 20h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2zm0-3h2v2H4v-2zM2 6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2zm4 1H4V5h2v2zm-2 7h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2zm0-3h2v2H4v-2z" fill="currentColor"></path>
                  </svg>
                </n-icon>
              </template>
              <n-number-animation :from="0" :to="totalInfo.storageCount" />
            </n-statistic>
            <n-statistic label="启用数量" class="flex-grow">
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                    <path d="M4 20h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2zm0-3h2v2H4v-2zM2 6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2zm4 1H4V5h2v2zm-2 7h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2zm0-3h2v2H4v-2z" fill="currentColor"></path>
                  </svg>
                </n-icon>
              </template>
              <n-number-animation :from="0" :to="totalInfo.storageActiveCount" />
            </n-statistic>
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
            <n-number-animation :from="0" :to="(serverInfo.memoryInfo.total / 1024 / 1024).toFixed(2)" /> MB
          </n-descriptions-item>
          <n-descriptions-item label="已用内存">
            <n-number-animation :from="0" :to="(serverInfo.memoryInfo.used / 1024 / 1024).toFixed(2)" /> MB
          </n-descriptions-item>
          <n-descriptions-item label="剩余内存">
            <n-number-animation :from="0" :to="(serverInfo.memoryInfo.free / 1024 / 1024).toFixed(2)" /> MB
          </n-descriptions-item>
        </n-descriptions>
      </n-grid-item>
      <n-grid-item>
        <n-divider title-placement="left"> 提建议/问题反馈 </n-divider>
        <span>欢迎通过 issues 提交建议或问题反馈，我们会尽快处理！</span>
        <n-divider title-placement="left"> 技术支持 </n-divider>
        <span>我提供免费技术支持，你可以通过邮邮件与我取得联系，非工作时间我会尽快回复。
          Email: <a href="mailto:besscroft@foxmail.com"><b>旅行者</b></a></span>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<style scoped>
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
