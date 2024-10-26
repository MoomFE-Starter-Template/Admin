<template>
  <el-container size-full>
    <!-- 顶部导航栏 -->
    <el-header flex="~ items-center" b-b="1 solid [var(--el-border-color)]" style="--el-header-padding: 0">
      <el-container size-full b-b="1 solid [var(--el-border-color)]">
        <!-- Logo -->
        <el-aside class="flex-(~ items-center)" :width="logoWidth">
          <slot name="logo">
            <Logo size="size-10 ml-5" />
            <span ml-5>{{ t(config.defaultTitle) }}</span>
          </slot>
        </el-aside>
        <!-- 导航栏内容区域 -->
        <el-main class="flex! gap-5 pr-5!" style="--el-main-padding: 0">
          <!-- 顶部菜单栏 -->
          <div flex-grow overflow-hidden>
            <AdminMenu
              v-if="['top', 'mix'].includes(config.adminMenuMode)"
              :is-mix-top="config.adminMenuMode === 'mix'" :menu horizontal
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
        v-if="['left', 'mix'].includes(config.adminMenuMode)"
        :width="leftMenuWidth"
        b-r="1 solid [var(--el-border-color)]" p-2
      >
        <AdminMenu :is-mix-side="config.adminMenuMode === 'mix'" :menu />
      </el-aside>
      <!-- 页面主体内容 -->
      <el-main flex="important:~ col" bg="#f2f3f5 dark:#3a3a3d" style="--el-main-padding: 0">
        <!-- 多页签 -->
        <MultiTabs v-if="config.adminMultiTabs" />
        <!-- 页面内容 -->
        <div flex-grow relative>
          <div size-full absolute top-0 left-0 overflow-auto>
            <slot />
          </div>
        </div>
        <!-- 底部内容插槽 -->
        <slot name="footer" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import type { MenuItem } from '../../types/menu';
  import MultiTabs from '../AdminMultiTabs/index.vue';
  import HeaderToolbar from './HeaderToolbar.vue';

  interface Props {
    /** 外部传入的菜单, 可用于传入来自服务器的菜单 */
    menu?: MenuItem[];
    /** Logo 容器宽度 */
    logoWidth?: string;
    /** 左侧菜单栏宽度 */
    leftMenuWidth?: string;
  }

  withDefaults(defineProps<Props>(), {
    logoWidth: '220px',
    leftMenuWidth: '220px',
  });

  const config = useAppConfig();

  const { t } = useI18n();
</script>
