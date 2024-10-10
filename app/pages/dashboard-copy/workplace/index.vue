<!-- 工作台页面 -->

<template>
  <div size-full flex="~ gap-4" bg="#f2f3f5 dark:#3a3a3d" p-5>
    <!-- 左侧区域 -->
    <div flex-grow>
      <el-card shadow="never" class="b-none!">
        <div text-xl>
          欢迎回来! {{ auth.info.data?.name }}
        </div>
        <el-divider class="mt-5!" />
        <DataPanel />
        <el-divider />
        <ContentChart />
      </el-card>
    </div>
    <!-- 右侧区域 -->
    <div w-70 flex-none>
      <el-card shadow="never" class="b-none!">
        <QuickOperation />
        <el-divider />
        <RecentlyVisited />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ContentChart from './components/ContentChart.vue';
  import DataPanel from './components/DataPanel.vue';
  import QuickOperation from './components/QuickOperation.vue';
  import RecentlyVisited from './components/RecentlyVisited.vue';

  useHead({
    title: '工作台',
  });

  const auth = useAuthStore();
</script>
