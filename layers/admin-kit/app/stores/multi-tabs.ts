import type { RouteLocationNormalized } from 'vue-router';

interface MultiTab {
  fullPath: string;
  title?: string;
}

/** 多页签持久化缓存 */
const localMultiTabs = useLocalStorage<MultiTab[]>('admin-multi-tabs', []);

export const useAdminMultiTabsStore = defineStore('admin-multi-tabs', () => {
  const config = useAppConfig();

  const route = useRoute();
  const router = useRouter();

  const tabs = ref<MultiTab[]>([]);

  const activeTabIndex = computed({
    get: () => tabs.value.findIndex(tab => tab.fullPath === route.fullPath),
    set: (index: number) => {
      tabs.value[index] && navigateTo(tabs.value[index].fullPath);
    },
  });
  const activeTab = computed(() => tabs.value[activeTabIndex.value]);

  /** 新增/更新页签 */
  function update(route: RouteLocationNormalized) {
    const tab = tabs.value.find(tab => tab.fullPath === route.fullPath);
    const tabInfo: MultiTab = {
      fullPath: route.fullPath,
      title: route.meta.title,
    };

    if (tab)
      return Object.assign(tab, tabInfo);

    tabs.value.push(tabInfo);
  }

  /** 移除页签 */
  function remove(fullPath: string) {
    const oldActiveTabIndex = activeTabIndex.value;
    const index = tabs.value.findIndex(tab => tab.fullPath === fullPath);

    if (index !== -1)
      tabs.value.splice(index, 1);

    if (oldActiveTabIndex === index) {
      activeTabIndex.value = Math.min(index, tabs.value.length - 1);
    }
  }
  /** 移除左侧页签 */
  function removeLeft(fullPath: string) {
    const oldActiveTabIndex = activeTabIndex.value;
    const index = tabs.value.findIndex(tab => tab.fullPath === fullPath);

    tabs.value.splice(0, index);

    if (oldActiveTabIndex < index)
      activeTabIndex.value = 0;
  }
  /** 移除右侧页签 */
  function removeRight(fullPath: string) {
    const oldActiveTabIndex = activeTabIndex.value;
    const index = tabs.value.findIndex(tab => tab.fullPath === fullPath);

    tabs.value.splice(index + 1);

    if (oldActiveTabIndex > index)
      activeTabIndex.value = index;
  }
  /** 移除其他页签 */
  function removeOther(fullPath: string) {
    tabs.value = [tabs.value.find(tab => tab.fullPath === fullPath)!];
    activeTabIndex.value = 0;
  }
  /** 移除全部页签 */
  function removeAll() {
    tabs.value = [];
  }

  /** 更新页签排序 */
  function updateSortByFullPaths(fullPaths: string[]) {
    tabs.value.sort((a, b) => fullPaths.indexOf(a.fullPath) - fullPaths.indexOf(b.fullPath));
  }

  wheneverEffectScopeImmediate(() => config.adminMultiTabs, () => {
    // 配置了页签缓存
    wheneverEffectScopeImmediate(() => config.adminMultiTabsCache, () => {
      syncRef(localMultiTabs, tabs);
    });
    // 多页签被清空时, 打开主页页签
    wheneverEffectScopeImmediate(() => !tabs.value.length, () => {
      router
        .push(config.adminMultiTabsHomePath)
        .finally(() => {
          update(router.currentRoute.value);
        });
    });
    // 配置了固定首页页签, 那么要保证首页页签始终存在并且在第一个位置
    wheneverEffectScopeImmediate(() => config.adminMultiTabsFixedHome, () => {
      watchEffect(() => {
        const homeTabIndex = tabs.value.findIndex(tab => tab.fullPath === config.adminMultiTabsHomePath);

        // 首页页签不存在时, 添加首页页签
        if (homeTabIndex === -1) {
          tabs.value.unshift({ fullPath: config.adminMultiTabsHomePath });
        }
        // 首页页签不在第一个位置时, 移动首页页签到第一个位置
        else if (homeTabIndex !== 0) {
          tabs.value.unshift(tabs.value.splice(homeTabIndex, 1)[0]!);
        }
      });
    });
  });

  return {
    tabs,

    activeTabIndex,
    activeTab,

    update,
    remove,
    removeLeft,
    removeRight,
    removeOther,
    removeAll,

    updateSortByFullPaths,
  };
});
