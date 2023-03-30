<script setup lang="ts">
const user = useUserStore()
const router = useRouter()
const { t } = useI18n()

const desserts = ref(
  [
    {
      name: '《原神》EP - 仙泽麟行之迹.mkv',
      size: '306.25 MB',
    },
    {
      name: 'Ice cream sandwich',
      size: '159',
    },
  ],
)
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4" :xxl="4"></el-col>
    <el-col :xs="24" :sm="22" :md="22" :lg="18" :xl="16" :xxl="16">
      <v-table>
        <thead>
        <tr>
          <th class="text-left">
            {{ t('table.index.fileName') }}
          </th>
          <th class="text-left">
            {{ t('table.index.fileSize') }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.size }}</td>
        </tr>
        </tbody>
      </v-table>
    </el-col>
    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4" :xxl="4"></el-col>
  </el-row>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
