<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const visible = ref<Boolean>(false)

const handleClick = () => {
  visible.value = true
}

const handleOk = () => {
  visible.value = false
}
</script>

<template>
  <div
    class="layout-demo" :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '12px',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ height: '100%' }">
      <div class="flex flex-row flex-wrap">
        <div class="flex-1 w-64 m-1">
          <a-card title="运行信息">
            Memory Usage: 0 MB
            <br />
            CPU Usage: 0%
            <br />
            Run Time: 0 hour(s)
          </a-card>
        </div>
        <div class="flex-1 w-64 m-1">
          <a-card title="关于">
            <template #extra>
              <a-button type="text" @click="handleClick">More</a-button>
            </template>
            🧪 Working in Progress
            <br />
            一款好看的文件交互管理。
            <br />
            积极开发、错误修复和增强功能！
          </a-card>
        </div>
        <div class="flex-1 w-64 m-1">
          <a-card title="Todo List">
            <a-list>
              <a-list-item><icon-subscribe />MySQL 存储适配</a-list-item>
              <a-list-item><icon-subscribe />OneDrive 支持</a-list-item>
              <a-list-item><icon-subscribe />基于 openJDK 17 的 SpringBoot3 开发</a-list-item>
              <a-list-item><icon-subscribe />多元化存储支持</a-list-item>
              <a-list-item><icon-subscribe />多平台部署支持</a-list-item>
              <a-list-item><icon-subscribe />对接更多存储/驱动</a-list-item>
            </a-list>
          </a-card>
        </div>
        <div class="flex-1 w-64 m-1">
          <a-card title="Deployment Support">
            <a-list>
              <a-list-item><icon-subscribed /><a-link href="https://vercel.com/">Vercel</a-link></a-list-item>
              <a-list-item><icon-subscribed /><a-link href="https://www.netlify.com/">Netlify</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://workers.cloudflare.com/">CloudFlare</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://aws.amazon.com/lambda/">AWS Lambda</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://learn.microsoft.com/en-us/azure/static-web-apps/">Azure</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://docs.digitalocean.com/products/app-platform/">DigitalOcean</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://heroku.com/">Heroku</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://firebase.google.com/docs/hosting">Firebase</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://render.com/">Render.com</a-link></a-list-item>
              <a-list-item><icon-subscribe /><a-link href="https://app.stormkit.io/apps/new">StormKit</a-link></a-list-item>
            </a-list>
          </a-card>
        </div>
      </div>
    </a-card>
    <a-drawer
      :visible="visible.value"
      placement="top"
      @ok="handleOk"
      unmountOnClose
      hideCancel
      :closable="false"
    >
      <template #title>
        Oops!
      </template>
      <div>如你所见，还有诸多问题，所以还在闭源开发中，请耐心等待！如果你想一起参与，可联系我！</div>
    </a-drawer>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
