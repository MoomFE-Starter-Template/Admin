<template>
  <MixteAutoGrid :list="data" item-width="180" gap="16">
    <template #default="{ item }">
      <div flex gap-2>
        <el-avatar :src="item.icon" size="large" class="bg-#f2f3f5!" />
        <el-statistic :title="item.title" :value="item.value">
          <template #suffix>
            <span text="sm [var(--el-text-color-regular)]">{{ item.label }}</span>
          </template>
        </el-statistic>
      </div>
    </template>
  </MixteAutoGrid>
</template>

<script lang="ts" setup>
  import { MixteAutoGrid } from '@mixte/components/auto-grid';

  const data = [
    {
      title: '线上总内容',
      icon: '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image',
      value: 373.5,
      label: 'w+ 个',
    },
    {
      title: '投放中内容',
      icon: '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image',
      value: 368,
      label: '个',
    },
    {
      title: '日新增评论',
      icon: '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image',
      value: 8874,
      label: '条',
    },
    {
      title: '较昨日新增',
      icon: '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image',
      value: 2.8,
      label: '%',
    },
  ];
</script>
