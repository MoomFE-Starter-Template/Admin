<template>
  <div ref="multiTabsWrapRef" class="admin-multi-tabs" bg="[var(--el-bg-color)]">
    <EleTabs
      v-if="multiTabs.reRenderFlag"
      type="simple" sortable
      :model-value="multiTabs.activeTab?.fullPath"
      :items="tabsItems"
      :context-menu="{
        popperStyle: {
          '--ele-popper-radius': '8px',
        },
      }"
      :context-menus="getContextMenus"
      @tab-item-click="tab => navigateTo(tab.item!.name as string)"
      @tab-remove="name => multiTabs.remove(name as string)"
      @tab-sort-change="data => multiTabs.updateSortByFullPaths(data.map(item => item.name as string))"
      @tab-context-menu="onContextMenusClick"
    >
      <template #label="{ label, item }">
        <!-- 固定的首页页签 -->
        <template v-if="config.adminMultiTabsFixedHome && config.adminMultiTabsHomePath === item.name">
          <i-ant-design-home-outlined class="inline-flex size-4.5" />
        </template>
        <!-- 正常页签 -->
        <template v-else>
          {{ label }}
        </template>
      </template>
    </EleTabs>
  </div>
</template>

<script lang="ts" setup>
  import type { DropdownItem } from 'ele-admin-plus/es/ele-dropdown/types';
  import type { TabEventOption, TabPaneItem } from 'ele-admin-plus/es/ele-tabs/types';
  import EleTabs from 'ele-admin-plus/es/ele-tabs/index';
  import { useAdminMultiTabsStore } from '../../stores/multi-tabs';
  import 'ele-admin-plus/es/ele-tabs/style/index';

  const config = useAppConfig();

  const multiTabs = useAdminMultiTabsStore();

  const tabsItems = computed((): TabPaneItem[] => {
    return multiTabs.tabs.map((tab): TabPaneItem => {
      return {
        key: tab.fullPath,
        name: tab.fullPath,
        label: tab.title ?? tab.fullPath,
        closable: !(config.adminMultiTabsFixedHome && config.adminMultiTabsHomePath === tab.fullPath),
      };
    });
  });

  function getContextMenus(tab?: TabPaneItem, name?: string): DropdownItem[] { // eslint-disable-line unused-imports/no-unused-vars
    return [
      { title: '关闭左侧页签', command: 'left' },
      { title: '关闭右侧页签', command: 'right' },
      { title: '关闭其他页签', command: 'other', divided: true },
      { title: '关闭全部页签', command: 'all' },
    ];
  }

  function onContextMenusClick({ item, command }: TabEventOption) {
    if (command === 'left') return multiTabs.removeLeft(item!.name as string);
    if (command === 'right') return multiTabs.removeRight(item!.name as string);
    if (command === 'other') return multiTabs.removeOther(item!.name as string);
    if (command === 'all') return multiTabs.removeAll();
  }

  const multiTabsWrapRef = ref<HTMLDivElement>();

  onMounted(() => {
    multiTabs.multiTabsWrapRef = multiTabsWrapRef.value;

    onUnmounted(() => {
      multiTabs.multiTabsWrapRef = undefined;
    });
  });
</script>

<style lang="scss" scoped>
  .ele-tabs-wrap {
    --ele-tab-close-size: 18px;
    --ele-tab-close-radius: var(--el-border-radius-small);
    --ele-tab-close-hover-color: var(--el-text-color-primary);
    --ele-tab-close-hover-bg: hsla(0, 0%, 60%, .15);
    --ele-tab-active-close-hover-color: var(--el-text-color-primary);
    --ele-tab-active-close-hover-bg: hsla(0, 0%, 60%, .15);
    --ele-tab-sm-close-size: 14px;
    --ele-tab-lg-close-size: 20px;
    --ele-tab-simple-radius: 10px 10px 0px 0px;
    --ele-tab-simple-active-weight: bold;
    --ele-tab-simple-active-line: 0px;
    --ele-tab-simple-line-display: none;
    --ele-tab-simple-angle-size: 12px;
    --ele-tab-simple-angle-display: block;
    --ele-tab-simple-tool-hover-bg: transparent;
    --ele-tab-button-radius: 8px;
    --ele-tab-button-active-shadow: 0 0 4px 2px rgba(0, 0, 0, .04);
    --ele-tab-button-active-weight: bold;

    :deep(.ele-tab-title) {
      @apply h-full flex items-center gap-1
    }
  }
</style>
