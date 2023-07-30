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
  <div flex grid justify-start justify-center items-center h-8>
    <p mr-auto text-base font-medium ml-0.25rem>{{ t('menu.index') }}</p>
    <div>
      <n-icon size="22" @click="handServerInfo" class="cursor-pointer mr-0.25rem">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
          <path d="M26 18A10 10 0 1 1 16 8h4v5l6-6l-6-6v5h-4a12 12 0 1 0 12 12z" fill="currentColor"></path>
          <path d="M18.58 15.58h-3.45L15 18.15a4.83 4.83 0 0 1 .26-.45a1.59 1.59 0 0 1 .33-.35a1.53 1.53 0 0 1 .44-.23a2 2 0 0 1 .6-.08a2.54 2.54 0 0 1 .92.16a2.06 2.06 0 0 1 .74.48a2.28 2.28 0 0 1 .5.77a2.73 2.73 0 0 1 .18 1a2.87 2.87 0 0 1-.19 1.07a2.36 2.36 0 0 1-.55.84a2.44 2.44 0 0 1-.89.55a3.23 3.23 0 0 1-1.21.2a3.79 3.79 0 0 1-.94-.11a3 3 0 0 1-.74-.32a2.45 2.45 0 0 1-.55-.45a4.13 4.13 0 0 1-.41-.55l1.06-.81l.27.41a1.82 1.82 0 0 0 .34.34a1.59 1.59 0 0 0 .43.22a1.52 1.52 0 0 0 .55.08a1.29 1.29 0 0 0 1-.36a1.41 1.41 0 0 0 .33-1v-.06a1.18 1.18 0 0 0-1.28-1.27a1.44 1.44 0 0 0-.77.18a1.94 1.94 0 0 0-.48.39l-1.19-.17l.29-4.31h4.52z" fill="currentColor"></path>
        </svg>
      </n-icon>
    </div>
  </div>
  <div content-style="padding: 0;" h-full w-full mt-1 of-auto style="height: calc(100% - 4rem); -ms-overflow-style: none;">
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
              :percentage="serverInfo.memoryInfo.total === 0 ? 0 : (serverInfo.memoryInfo.used / serverInfo.memoryInfo.total * 100).toFixed(2)"
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
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                    <path d="M30 30h-2v-5a5.006 5.006 0 0 0-5-5v-2a7.008 7.008 0 0 1 7 7z" fill="currentColor"></path>
                    <path d="M22 30h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7z" fill="currentColor"></path>
                    <path d="M20 2v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14z" fill="currentColor"></path>
                    <path d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z" fill="currentColor"></path>
                  </svg>
                </n-icon>
              </template>
              <n-number-animation :from="0" :to="totalInfo.userCount" />
            </n-statistic>
            <n-statistic label="禁用数量" class="flex-grow">
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                    <path d="M30 30h-2v-5a5.006 5.006 0 0 0-5-5v-2a7.008 7.008 0 0 1 7 7z" fill="currentColor"></path>
                    <path d="M22 30h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7z" fill="currentColor"></path>
                    <path d="M20 2v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14z" fill="currentColor"></path>
                    <path d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z" fill="currentColor"></path>
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
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                    <path d="M4 21H2v3a2.006 2.006 0 0 0 2 2h3v-2H4z" fill="currentColor"></path>
                    <path d="M4 8h3V6H4a2.006 2.006 0 0 0-2 2v3h2z" fill="currentColor"></path>
                    <path d="M17 6h6v2h-6z" fill="currentColor"></path>
                    <path d="M9 6h6v2H9z" fill="currentColor"></path>
                    <path d="M17 24h6v2h-6z" fill="currentColor"></path>
                    <path d="M28 15H4v-2H2v6h2v-2h24v2h2v-6h-2v2z" fill="currentColor"></path>
                    <path d="M28 24h-3v2h3a2.006 2.006 0 0 0 2-2v-3h-2z" fill="currentColor"></path>
                    <path d="M28 6h-3v2h3v3h2V8a2.006 2.006 0 0 0-2-2z" fill="currentColor"></path>
                    <path d="M9 24h6v2H9z" fill="currentColor"></path>
                    <circle cx="7" cy="12" r="1" fill="currentColor"></circle>
                    <circle cx="7" cy="20" r="1" fill="currentColor"></circle>
                  </svg>
                </n-icon>
              </template>
              <n-number-animation :from="0" :to="totalInfo.storageCount" />
            </n-statistic>
            <n-statistic label="启用数量" class="flex-grow">
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                    <path d="M4 21H2v3a2.006 2.006 0 0 0 2 2h3v-2H4z" fill="currentColor"></path>
                    <path d="M4 8h3V6H4a2.006 2.006 0 0 0-2 2v3h2z" fill="currentColor"></path>
                    <path d="M17 6h6v2h-6z" fill="currentColor"></path>
                    <path d="M9 6h6v2H9z" fill="currentColor"></path>
                    <path d="M17 24h6v2h-6z" fill="currentColor"></path>
                    <path d="M28 15H4v-2H2v6h2v-2h24v2h2v-6h-2v2z" fill="currentColor"></path>
                    <path d="M28 24h-3v2h3a2.006 2.006 0 0 0 2-2v-3h-2z" fill="currentColor"></path>
                    <path d="M28 6h-3v2h3v3h2V8a2.006 2.006 0 0 0-2-2z" fill="currentColor"></path>
                    <path d="M9 24h6v2H9z" fill="currentColor"></path>
                    <circle cx="7" cy="12" r="1" fill="currentColor"></circle>
                    <circle cx="7" cy="20" r="1" fill="currentColor"></circle>
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
  </div>
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
