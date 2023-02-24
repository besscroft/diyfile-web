<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getServerInfo } from '~/api/modules/monitor'

const router = useRouter()
const { t } = useI18n()
const visible = ref<Boolean>(false)
const loading = ref<Boolean>(true)
const serverInfo = ref()
const { isMobile } = useDevice()

const handServerInfo = () => {
  loading.value = true
  getServerInfo().then((res) => {
    if (res.code === 200) {
      serverInfo.value = res.data
    }
    loading.value = false
  })
}

const handleClick = () => {
  visible.value = true
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
          <a-button :loading="loading" @click="handServerInfo">
            <template #icon>
              <icon-sync />
            </template>
          </a-button>
        </a-space>
      </template>
      <div class="flex flex-wrap flex-col sm:flex-row">
        <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[21rem] m-1">
          <a-card :loading="loading" title="运行信息" hoverable>
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
                使用率: {{ ((serverInfo.memoryInfo.used / 1024 / 1024).toFixed(2) / (serverInfo.memoryInfo.total / 1024 / 1024).toFixed(2) * 100).toFixed(2) }} %
              </a-list-item>
            </a-list>
          </a-card>
        </div>
        <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
          <a-card title="关于" hoverable>
            🧪 Working in Progress
            <br>
            一款好看的在线文件列表程序，支持多种存储，支持多种部署方式。
            <br>
            由 Spring Boot 3 和 Vue 驱动，积极开发、错误修复和增强功能！
          </a-card>
        </div>
        <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
          <a-card title="Todo List" hoverable>
            <a-list>
              <a-list-item><icon-subscribed />MySQL 存储适配</a-list-item>
              <a-list-item><icon-subscribed />基于 openJDK 17 的 SpringBoot3 开发</a-list-item>
              <a-list-item><icon-subscribed />OneDrive 支持</a-list-item>
              <a-list-item><icon-subscribe />多元化存储支持</a-list-item>
              <a-list-item><icon-subscribe />多平台部署支持</a-list-item>
              <a-list-item><icon-subscribe />前端用 Vuetify 3 重写</a-list-item>
            </a-list>
          </a-card>
        </div>
        <div class="lg:w-1/4 sm:flex sm:flex-col sm:w-full max-w-[22rem] m-1">
          <a-card title="Deployment Support" hoverable>
            <a-list>
              <a-list-item><icon-subscribed /><a-link href="https://vercel.com/">Vercel</a-link></a-list-item>
              <a-list-item><icon-subscribed /><a-link href="https://www.netlify.com/">Netlify</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://workers.cloudflare.com/">CloudFlare</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://aws.amazon.com/lambda/">AWS Lambda</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://learn.microsoft.com/en-us/azure/static-web-apps/">Azure</a-link></a-list-item>
              <a-list-item><icon-subscribed /><a-link href="https://docs.digitalocean.com/products/app-platform/">DigitalOcean</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://heroku.com/">Heroku</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://firebase.google.com/docs/hosting">Firebase</a-link></a-list-item>
            </a-list>
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
