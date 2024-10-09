<template>
  <el-container size-full>
    <el-header style="--el-header-padding: 0">
      <el-container size-full b="1 solid [var(--el-border-color)]">
        <el-aside flex="~ items-center gap-5" pl-5>
          <Logo />
          {{ t(config.defaultTitle) }}
        </el-aside>
        <el-main style="--el-main-padding: 0" />
      </el-container>
    </el-header>
    <el-container size-full>
      <el-aside>
        234
      </el-aside>
      <el-main style="--el-main-padding: 0">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  const config = useAppConfig();

  const { t } = useI18n();
</script>
