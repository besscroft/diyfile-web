<script setup lang="ts">
import { getBeian } from '~/api/modules/systemConfig'

const beian = ref<string>('')

const handleGetBeian = () => {
  getBeian().then((res) => {
    if (res.code === 200) {
      beian.value = res.data
    }
  })
}

handleGetBeian()
</script>

<template>
  <a-card hoverable :style="{ width: '100%' }">
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }"
    >
      <span
        :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
      >
        <a-typography-text>Made with ❤ by Bess Croft.</a-typography-text>
      </span>
      <a v-if="beian" href="https://beian.miit.gov.cn/" target="_blank">{{ beian }}</a>
      <a-tag color="gray">
        <template #icon>
          <icon-github />
        </template>
        <a-link href="https://github.com/besscroft">
          GitHub
        </a-link>
      </a-tag>
    </div>
  </a-card>
</template>
