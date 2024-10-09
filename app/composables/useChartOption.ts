import type { EChartsOption } from 'echarts';

interface optionsFn {
  (isDark: boolean): EChartsOption;
}

export function useChartOption(sourceOption: optionsFn) {
  const theme = useTheme();

  const chartOption = computed<EChartsOption>(() => {
    return sourceOption(theme.dark);
  });

  return {
    chartOption,
  };
}
