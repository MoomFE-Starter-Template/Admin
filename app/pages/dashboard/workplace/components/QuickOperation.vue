<template>
  <div flex="~ justify-between items-center">
    快捷操作
    <el-button class="h-auto! py-1! px-1.5!" type="primary" text>管理</el-button>
  </div>
  <div grid="~ cols-[auto_1fr_auto] gap-y-4" p="t6 x3">
    <div class="operation">
      <div class="icon"><i-ant-design-file-text-outlined /></div>
      <div class="text">内容管理</div>
    </div>
    <div class="operation">
      <div class="icon"><i-ant-design-database-outlined /></div>
      <div class="text">内容分析</div>
    </div>
    <div class="operation">
      <div class="icon"><i-ant-design-setting-outlined /></div>
      <div class="text">高级管理</div>
    </div>
    <div class="operation">
      <div class="icon"><i-ant-design-mobile-outlined /></div>
      <div class="text">线上推广</div>
    </div>
    <div class="operation">
      <div class="icon"><i-ant-design-fire-outlined /></div>
      <div class="text">内容投放</div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .operation
    @apply flex flex-col items-center gap-2 cursor-pointer

    .icon
      @apply size-8 flex justify-center items-center
      @apply rounded bg-[var(--el-fill-color)]
    .text
      @apply text-xs

    &:hover
      .icon
        @apply c-[var(--el-color-primary)] bg-[var(--el-color-primary-light-9)]
      .text
        @apply c-[var(--el-color-primary)]
</style>
