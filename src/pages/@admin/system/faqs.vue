<script setup lang="ts">
const { t } = useI18n()
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
    <a-card hoverable :style="{ height: '100%' }" :title="t('menu.system.faqs')">
      <div class="space-y-4">
        <details class="group [&_summary::-webkit-details-marker]:hidden" open>
          <summary
            class="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50"
          >
            <h2 class="font-medium text-gray-900">
              系统有哪些角色，分别能干什么？
            </h2>

            <svg
              class="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p class="px-4 mt-4 leading-relaxed text-gray-700">
            超级管理员：管理系统平台中的所有资源，<b>但不允许删除自己。</b><br />
            平台管理员：管理系统平台中的大部分资源，<b>但不允许删除用户。</b><br />
            平台运维员：管理平台中的运维资源，查看系统平台中的大部分资源。<br />
            平台观察员：查看系统平台中的所有<b>非机密</b>资源。<br />
            游客：查看系统平台中处后台外所有<b>非机密</b>资源。
          </p>
        </details>

        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50"
          >
            <h2 class="font-medium text-gray-900">
              超级管理员为什么不能删除？
            </h2>

            <svg
              class="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p class="px-4 mt-4 leading-relaxed text-gray-700">
            超级管理员是系统最高权限用户，如果允许删除自己，将会导致系统无法管理。
          </p>
        </details>

        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50"
          >
            <h2 class="font-medium text-gray-900">
              有哪些部署方式？
            </h2>

            <svg
              class="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p class="px-4 mt-4 leading-relaxed text-gray-700">
            目前打算采用容器化部署，并且是前后端分离部署。当然，我们也支持前后端一起部署的方式，不过这种方式不推荐，而且我也懒得写文件支持。<br />
            不过，前端可以部署在 CloudFlare、Vercel、Netlify 等 CDN 上，后端可以部署在任何支持容器的地方。
          </p>
        </details>

        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50"
          >
            <h2 class="font-medium text-gray-900">
              支持本地文件管理吗？
            </h2>

            <svg
              class="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p class="px-4 mt-4 leading-relaxed text-gray-700">
            我们决定支持本地文件管理，但前提是您部署的方式支持！
          </p>
        </details>
      </div>

    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>
