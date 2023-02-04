<script setup lang="ts">
const { t } = useI18n()

const dataList = ref<Array<any>>([
  {
    id: 1,
    title: '系统有哪些角色，分别能干什么？',
    content: '超级管理员：管理系统平台中的所有资源，<b>但不允许删除自己。</b><br />\n'
      + '            平台管理员：管理系统平台中的大部分资源，<b>但不允许删除用户。</b><br />\n'
      + '            平台运维员：管理平台中的运维资源，查看系统平台中的大部分资源。<br />\n'
      + '            平台观察员：查看系统平台中的所有<b>非机密</b>资源。<br />\n'
      + '            游客：查看系统平台中除后台外所有<b>非机密</b>资源。',
  },
  {
    id: 2,
    title: '超级管理员为什么不能删除？',
    content: '超级管理员是系统最高权限用户，如果允许删除自己，将<b>会导致系统无法管理。</b>同时我们也在后端进行了拦截判断，如果您直接操作数据库，那您开心就好！',
  },
  {
    id: 3,
    title: '有哪些部署方式？',
    content: '目前打算采用容器化部署，并且是前后端分离部署。当然，我们也支持前后端一起部署的方式，不过这种方式不推荐，而且我也懒得写文件支持。<br />\n'
      + '            不过，前端已经支持部署在 CloudFlare、Vercel 等 Edge Network 上，当然 Nginx 也是没问题的，后端可以部署在任何支持容器的地方。方便用户白嫖部署，是我们的开发目标之一！',
  },
  {
    id: 4,
    title: '支持本地文件管理吗？',
    content: '目前已支持 OneDrive，其它将在后续开发中跟进。我们决定支持本地文件管理，但前提是您部署的方式支持！',
  },
  {
    id: 5,
    title: '你这程序开源、免费吗？',
    content: '我们决定在开发完成、并且经过测试后进行<b>开源</b>！我们承诺程序<b>永久免费</b>，只对服务收费，比如收费部署、收费维护、收费咨询等！但是我们仍然会提供<b>完善的文档</b>供您阅读！\n'
      + '            也就是说，您<b>永远都不需要花钱</b>即可像使用其它开源软件那样使用本程序，当然您如果愿意打赏一杯咖啡那就再好不过了！',
  },
  {
    id: 6,
    title: '你打算支持哪些功能？',
    content: '后台管理功能如您所见，还在逐步新增中，我们会根据用户的需求进行开发，如果您有什么好的建议，欢迎分享给我们！\n'
      + '            首页文件列表和预览，将慢慢完善，目前已支持视频播放、音频播放、图片预览、文本预览等，其它的预览将在后续开发中跟进！',
  },
])
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
        <details v-for="item in dataList" :key="item.id" class="group [&_summary::-webkit-details-marker]:hidden" :open="item.id === 1">
          <summary
            :class="isDark ? 'flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-400' : 'flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50'"
          >
            <h2 :class="isDark ? 'font-medium text-gray-100' : 'font-medium text-gray-900'">
              {{ item.title }}
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

          <p :class="isDark ? 'px-4 mt-4 leading-relaxed text-gray-100' : 'px-4 mt-4 leading-relaxed text-gray-700'" v-html="item.content"></p>
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
