<script lang="ts">
import { defineComponent } from 'vue'
import { NDialogProvider, NMessageProvider, NNotificationProvider } from 'naive-ui'

export default defineComponent({
  name: 'Application',
  components: {
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <NDialogProvider>
    <NNotificationProvider>
      <NMessageProvider>
        <slot name="default"></slot>
      </NMessageProvider>
    </NNotificationProvider>
  </NDialogProvider>
</template>
