<script setup lang="ts">
const { t } = useI18n()
const user = useUserStore()
const router = useRouter()
</script>

<template>
  <section>
    <div
      class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center"
    >
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          Xanadu
          <strong class="font-extrabold text-red-700 sm:block">
            一款好看的文件交互管理。
          </strong>
        </h1>

        <p class="mt-4 sm:text-xl sm:leading-relaxed">
          🧪 Working in Progress. 积极开发、错误修复和增强功能！
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a
            v-if="user.token"
            class="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            @click="router.push('/@admin')"
          >
            Get Started
          </a>
          <a
            v-else
            class="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            @click="router.push('/@login')"
          >
            Get Started
          </a>

          <a
            class="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
            href="https://docs.besscroft.com/"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
