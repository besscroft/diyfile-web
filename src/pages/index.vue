<script setup lang="ts">
const user = useUserStore()

const router = useRouter()

const { t } = useI18n()
</script>

<template>
  <v-list nav>
    <v-list-item prepend-icon="home" title="Inbox" value="inbox"></v-list-item>
    <v-list-item prepend-icon="home" title="Supervisors" value="supervisors"></v-list-item>
    <v-list-item prepend-icon="home" title="Clock-in" value="clockin"></v-list-item>
  </v-list>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
