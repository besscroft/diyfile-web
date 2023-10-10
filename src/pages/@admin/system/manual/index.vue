<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div flex grid justify-start justify-center items-center h-8>
    <p mr-auto text-base font-medium ml-0.25rem>{{ t('menu.system.manual') }}</p>
    <div>
    </div>
  </div>
  <div content-style="padding: 0;" h-full w-full mt-1 of-auto onscroll style="height: calc(100% - 4rem); -ms-overflow-style: none;">
    <n-collapse mx2 my4 :default-expanded-names="['1']">
      <n-collapse-item title="系统有哪些角色，分别能干什么？" name="1">
        <div>超级管理员：管理系统平台中的所有资源，<b>但不允许删除自己。</b></div>
        <div>平台管理员：管理系统平台中的大部分资源，<b>但不允许删除用户。</b></div>
        <div>平台运维员：管理平台中的运维资源，查看系统平台中的大部分资源。</div>
        <div>平台观察员：查看系统平台中的所有<b>非机密</b>资源。</div>
        <div>游客：查看系统平台中除后台外所有<b>非机密</b>资源。</div>
      </n-collapse-item>
      <n-collapse-item title="超级管理员为什么不能删除？" name="2">
        <div>超级管理员是系统最高权限用户，如果允许删除自己，<b>将会导致系统无法管理</b>。同时我们也在后端进行了拦截判断，如果您直接操作数据库，那您开心就好！</div>
      </n-collapse-item>
      <n-collapse-item title="有哪些部署方式？" name="3">
        <div>
          目前打算采用容器化部署，并且是前后端分离部署。当然，我们也支持<b>👉<a href="https://doc.diyfile.besscroft.com/deploy/compose.html" target="_blank">前后端一起部署</a></b>的方式。<br />
          不过，前端已经支持部署在 Netlify、Vercel 等 Edge Network 上，当然 Nginx 也是没问题的，后端可以部署在任何支持容器的地方。<br />
          方便用户白嫖部署，是我们的开发目标之一！
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
