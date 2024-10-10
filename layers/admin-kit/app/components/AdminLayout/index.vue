<template>
  <el-container size-full>
    <!-- 顶部导航栏 -->
    <el-header flex="~ items-center" b-b="1 solid [var(--el-border-color)]" style="--el-header-padding: 0">
      <el-container size-full b-b="1 solid [var(--el-border-color)]">
        <!-- Logo -->
        <el-aside :width="config.adminMenuWidth" flex="~ items-center gap-5" pl-5>
          <Logo size="size-10" />
          {{ t(config.defaultTitle) }}
        </el-aside>
        <!-- 导航栏内容区域 -->
        <el-main class="flex! gap-5 pr-5!" style="--el-main-padding: 0">
          <!-- 顶部菜单栏 -->
          <div flex-grow overflow-hidden>
            <AdminMenu
              v-if="['top', 'mix'].includes(config.adminMenuMode)"
              :is-mix-top="config.adminMenuMode === 'mix'" horizontal
              @select-mix-top="item => mixSideMenu = item"
            />
          </div>
          <!-- 工具栏 -->
          <div h-full flex="~ items-center none gap-3">
            <HeaderToolbar />
          </div>
        </el-main>
      </el-container>
    </el-header>
    <el-container size-full>
      <!-- 左侧菜单栏 -->
      <el-aside
        v-if="config.adminMenuMode === 'left' || (config.adminMenuMode === 'mix' && mixSideMenu)"
        :width="config.adminMenuWidth"
        b-r="1 solid [var(--el-border-color)]" p-2
      >
        <AdminMenu :is-mix-side="config.adminMenuMode === 'mix'" :mix-side-menu="mixSideMenu" />
      </el-aside>
      <!-- 页面主体内容 -->
      <el-main flex="important:~ col" bg="#f2f3f5 dark:#3a3a3d" style="--el-main-padding: 0">
        <!-- 多页签 -->
        <MultiTabs v-if="config.adminMultiTabs" />
        <!-- 页面内容 -->
        <div flex-grow>
          <slot />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import type { MenuItem } from '../../types/menu';
  import MultiTabs from '../AdminMultiTabs/index.vue';
  import HeaderToolbar from './HeaderToolbar.vue';

  const config = useAppConfig();

  const route = useRoute();

  const { t } = useI18n();

  /** 混合模式的侧边菜单 */
  const mixSideMenu = ref<MenuItem>();

  useHead({
    title: () => t(route.meta.title ?? config.defaultTitle, 1, { missingWarn: false }),
  });
</script>
