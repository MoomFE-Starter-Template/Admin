import type { ResponseData } from './types';

/** 获取日期折线图 */
export function getDatesLineChart() {
  return $fetch<
    ResponseData<
      { date: string; value: number }[]
    >
  >('/chart/dates-line-chart', {
    method: 'POST',
  });
}
