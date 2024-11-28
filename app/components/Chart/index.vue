<template>
  <div v-if="isMounted" relative :style="pick(props, ['width', 'height'])">
    <div size-full absolute top-0 left-0>
      <VCharts
        :option="option"
        :autoresize="autoResize"
        :style="{ width: '100%', height: '100%' }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { EChartsOption } from 'echarts';
  import { pick } from 'lodash-unified';
  import VCharts from 'vue-echarts';
  import './import-charts';

  interface Props {
    option?: EChartsOption;
    autoResize?: boolean;
    width?: string;
    height?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    option: () => ({}),
    autoResize: true,
    width: '100%',
    height: '300px',
  });

  const isMounted = useMounted();
</script>
