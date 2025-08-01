<template>
  <div flex="~ justify-between items-center">
    内容数据
    <el-button class="h-auto! py-1! px-1.5!" type="primary" text>查看更多</el-button>
  </div>
  <div v-loading="chartData.isLoading" mt-5>
    <Chart height="289px" :option="chartOption" />
  </div>
</template>

<script lang="ts" setup>
  import type { CallbackDataParams } from 'echarts/types/dist/shared';
  import { getDatesLineChart } from '@/apis/workplace';
  import { graphic } from 'echarts';
  import '@/components/Chart/css/echarts-tooltip-diy.scss';

  const xAxis = ref<string[]>([]);
  const chartsData = ref<number[]>([]);

  const graphicElements = ref([
    graphicFactory({ left: 40 }),
    graphicFactory({ right: 0 }),
  ]);

  const chartData = useRequestReactive(getDatesLineChart, { immediate: true });

  chartData.onSuccess(() => {
    xAxis.value = [];
    chartsData.value = [];

    chartData.data?.forEach((el, index: number) => {
      xAxis.value.push(el.date);
      chartsData.value.push(el.value);

      if (index === 0)
        graphicElements.value[0]!.style.text = el.date;
      if (index === chartData.data!.length - 1)
        graphicElements.value[1]!.style.text = el.date;
    });
  });

  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: '40',
        right: '0',
        top: '10',
        bottom: '30',
      },
      xAxis: {
        type: 'category',
        offset: 2,
        data: xAxis.value,
        boundaryGap: false,
        axisLabel: {
          color: '#4E5969',
          formatter(value: number, idx: number) {
            if (idx === 0) return '';
            if (idx === xAxis.value.length - 1) return '';
            return `${value}`;
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          interval: (idx: number) => {
            if (idx === 0) return false;
            if (idx === xAxis.value.length - 1) return false;
            return true;
          },
          lineStyle: {
            color: '#E5E8EF',
          },
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#23ADFF',
            width: 2,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: any, idx: number) {
            if (idx === 0) return value;
            return `${value}k`;
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#E5E8EF',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[];
          return `<div>
            <p class="tooltip-title">${firstElement!.axisValueLabel}</p>
            <div class="content-panel"><span>总内容量</span><span class="tooltip-value">${(
              Number(firstElement!.value) * 10000
          ).toLocaleString()}</span></div>
          </div>`;
        },
        className: 'echarts-tooltip-diy',
      },
      graphic: {
        elements: graphicElements.value,
      },
      series: [
        {
          data: chartsData.value,
          type: 'line',
          smooth: true,
          // symbol: 'circle',
          symbolSize: 12,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
            },
          },
          lineStyle: {
            width: 3,
            color: new graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(30, 231, 255, 1)',
              },
              {
                offset: 0.5,
                color: 'rgba(36, 154, 255, 1)',
              },
              {
                offset: 1,
                color: 'rgba(111, 66, 251, 1)',
              },
            ]),
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(17, 126, 255, 0.16)',
              },
              {
                offset: 1,
                color: 'rgba(17, 128, 255, 0)',
              },
            ]),
          },
        },
      ],
    };
  });

  function graphicFactory(side: Record<string, string | number>) {
    return {
      type: 'text',
      bottom: '8',
      ...side,
      style: {
        text: '',
        textAlign: 'center',
        fill: '#4E5969',
        fontSize: 12,
      },
    };
  }

  interface ToolTipFormatterParams extends CallbackDataParams {
    axisDim: string;
    axisIndex: number;
    axisType: string;
    axisId: string;
    axisValue: string;
    axisValueLabel: string;
  }
</script>
