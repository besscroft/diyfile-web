<script setup lang="ts">
const { t } = useI18n()

// 开发者信息
const devList = ref<Array<Object>>([
  {
    avatar: 'https://besscroft.com/uploads/avatar.jpeg',
    name: 'Bess Croft',
    job: 'Full Stack Developer',
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
    <a-card hoverable :style="{ height: '100%' }" :title="t('menu.system.about')">
      <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              DiyFile Team
            </p>
          </div>
          <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span class="relative inline-block">
              <svg viewBox="0 0 52 24" fill="currentColor" class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                <defs>
                  <pattern id="247432cb-6e6c-4bec-9766-564ed7c230dc" x="0" y="0" width=".135" height=".30">
                    <circle cx="1" cy="1" r=".7"></circle>
                  </pattern>
                </defs>
                <rect fill="url(#247432cb-6e6c-4bec-9766-564ed7c230dc)" width="52" height="24"></rect>
              </svg>
              <span class="relative">Welcome</span>
            </span>
            our talented team of professionals
          </h2>
          <p class="text-base text-gray-700 md:text-lg">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque rem aperiam, eaque ipsa quae.
          </p>
        </div>
        <div class="grid gap-10 row-gap-8 mx-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3">
          <div :key="item" v-for="item in devList" class="flex">
            <img class="object-cover w-20 h-20 mr-4 rounded-full shadow" :src="`${item.avatar}` + '?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260'" alt="Person" />
            <div class="flex flex-col justify-center">
              <p :class="isDark ? 'text-lg text-gray-100' : 'text-lg text-gray-800'">{{ item.name }}</p>
              <p :class="isDark ? 'text-sm text-gray-100' : 'text-sm text-gray-800'">{{ item.job }}</p>
            </div>
          </div>
        </div>
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
