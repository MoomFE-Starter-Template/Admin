<template>
  <VCharts
    v-if="isMounted"
    :option="options"
    :autoresize="autoResize"
    :style="{ width, height }"
  />
</template>

<script lang="ts" setup>
  import type { EChartsOption } from 'echarts';
  import VCharts from 'vue-echarts';
  import './import-charts';

  interface Props {
    options?: EChartsOption;
    autoResize?: boolean;
    width?: string;
    height?: string;
  }

  withDefaults(defineProps<Props>(), {
    options: () => ({}),
    autoResize: true,
    width: '100%',
    height: '300px',
  });

  const isMounted = useMounted();
</script>
