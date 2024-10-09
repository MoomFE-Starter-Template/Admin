<template>
  <el-container size-full>
    <!-- 顶部导航栏 -->
    <el-header flex="~ items-center" b-b="1 solid [var(--el-border-color)]" style="--el-header-padding: 0">
      <el-container size-full b-b="1 solid [var(--el-border-color)]">
        <el-aside flex="~ items-center gap-5" pl-5>
          <Logo />
          {{ t(config.defaultTitle) }}
        </el-aside>
        <el-main style="--el-main-padding: 0" />
      </el-container>
    </el-header>
    <el-container size-full>
      <!-- 菜单栏 -->
      <el-aside :width="config.adminMenuWidth" b-r="1 solid [var(--el-border-color)]" p-2>
        <AdminMenu />
      </el-aside>
      <!-- 页面主体内容 -->
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
