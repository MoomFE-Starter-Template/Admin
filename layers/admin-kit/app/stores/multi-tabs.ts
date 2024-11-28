import type { Promisable } from 'type-fest';
import type { RouteLocationNormalized } from 'vue-router';
import { parsePath } from 'ufo';

interface MultiTab {
  fullPath: string;
  title?: string;
}

/** 多页签持久化缓存 */
const localMultiTabs = useLocalStorage<MultiTab[]>('admin-multi-tabs', []);

export const useAdminMultiTabsStore = defineStore('admin-multi-tabs', () => {
  const config = useAppConfig();

  const router = useRouter();

  const auth = useAuthStore();

  /** 多页签容器, 用于判断当前页面是否有多页签, 有的话才会进行多页签相关操作 */
  const multiTabsWrapRef = ref<HTMLDivElement>();

  const tabs = ref<MultiTab[]>([]);

  const activeTabIndex = computed({
    get: () => tabs.value.findIndex(tab => tab.fullPath === router.currentRoute.value.fullPath),
    set: (index: number) => {
      tabs.value[index] && navigateTo(tabs.value[index].fullPath);
    },
  });
  const activeTab = computed(() => tabs.value[activeTabIndex.value]);

  let isWillUpdate = false;

  /** 新增/更新页签 */
  function update(route: RouteLocationNormalized, tabIndex?: number) {
    const tab = tabIndex != null ? tabs.value[tabIndex] : tabs.value.find(tab => tab.fullPath === route.fullPath);
    const tabInfo: MultiTab = {
      fullPath: route.fullPath,
      title: route.meta.title,
    };

    if (tab) {
      let anotherIndex: number;

      // 移除重复页签
      if (tabIndex != null && (anotherIndex = tabs.value.findIndex((tab, i) => tab.fullPath === tabInfo.fullPath && i !== tabIndex)) > -1) {
        tabs.value.splice(anotherIndex, 1);
      }

      return Object.assign(tab, tabInfo);
    }

    // todo:
    //   - 实时更新路由信息

    if (!isWillUpdate)
      tabs.value.push(tabInfo);
  }

  /**
   * 标记即将更新当前页签的路径信息
   *  - 在传入的方法内执行路由跳转, 将会在方法执行后更新当前页签的路径信息
   */
  async function willUpdate(fn: () => Promisable<any>) {
    update(router.currentRoute.value);
    const index = activeTabIndex.value;
    isWillUpdate = true;
    await fn();
    isWillUpdate = false;
    update(router.currentRoute.value, index);
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

  // 退出登录后清空页签
  wheneverEffectScopeImmediate(() => !auth.isLogin, () => {
    localMultiTabs.value = [];
    tabs.value = [];
  });

  const isEnable = computed(() => config.adminMultiTabs && auth.isLogin);

  wheneverEffectScopeImmediate(isEnable, () => {
    // 配置了页签缓存
    wheneverEffectScopeImmediate(() => config.adminMultiTabsCache, () => {
      syncRef(localMultiTabs, tabs);
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

  wheneverEffectScopeImmediate(() => isEnable.value && !!multiTabsWrapRef.value, () => {
    // 多页签被清空时, 打开主页页签
    wheneverEffectScopeImmediate(() => !tabs.value.length, () => {
      router
        .push(config.adminMultiTabsHomePath)
        .finally(() => {
          update(router.currentRoute.value);
        });
    });
    // 不记录登录页页签
    wheneverImmediate(() => tabs.value.find(tab => parsePath(tab.fullPath).pathname === parsePath(config.loginPath).pathname), (tab) => {
      remove(tab.fullPath);
    });
  });

  return {
    multiTabsWrapRef,

    tabs,

    activeTabIndex,
    activeTab,

    /**
     * 重新渲染标识
     *  - 用于强制重新渲染多页签, 可用于解决某些边界情况下的渲染问题
     *
     * @example
     * tabs.reRenderFlag = false;
     * nextTick(() => {
     *  tabs.reRenderFlag = true;
     * });
     */
    reRenderFlag: ref(true),

    update,
    willUpdate,
    remove,
    removeLeft,
    removeRight,
    removeOther,
    removeAll,

    updateSortByFullPaths,
  };
});
