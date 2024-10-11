<template>
  <div class="admin-menu" :class="{ horizontal, isMixTop, isMixSide }">
    <el-menu
      class="b-r-none! b-b-none!"
      :default-active="activeMenu"
      v-bind="{
        ...(horizontal ? { mode: 'horizontal' } : {}),
      }"
      @select="onMenuSelect"
    >
      <RenderSubMenu v-for="item in menu" :key="item.label" :item="item" />
    </el-menu>
  </div>
</template>

<script lang="tsx" setup>
  import type { MenuItem } from '../../types/menu';
  import { ElIcon, ElMenuItem, ElSubMenu } from 'element-plus';
  import { isString, toArray } from 'mixte';
  import { getMenuFirstLink, initMenu, isMenuChildrenActive } from './utils';

  interface Props {
    /** 水平模式的菜单 */
    horizontal?: boolean;
    /** 是否是混合模式的顶部菜单 ( 仅显示一级菜单 ) */
    isMixTop?: boolean;
    /** 是否是混合模式的侧边菜单 ( 仅显示当前激活的一级菜单 ) */
    isMixSide?: boolean;
    /** 混合模式的侧边菜单 */
    mixSideMenu?: MenuItem | MenuItem[];
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    selectMixTop: [MenuItem?];
  }>();

  const config = useAppConfig();

  const { t } = useI18n();

  const route = useRoute();
  const router = useRouter();

  const configMenu = computed(() => {
    return initMenu(config.adminMenu ?? [], router);
  });

  const menu = computed((): MenuItem[] => {
    if (props.isMixSide) {
      return toArray(props.mixSideMenu);
    }
    return configMenu.value;
  });

  const activeMenu = computed(() => {
    // 混合模式的顶部菜单仅显示一级菜单, 那么子节点的激活状态也需要计算
    if (props.isMixTop) {
      const activeMenu = configMenu.value.find((item) => {
        return Array.isArray(item.children) ? isMenuChildrenActive(item.children, route.path) : item.to === route.path;
      });
      return `0-${activeMenu?.to || activeMenu?.label}`;
    }
    return route.path;
  });

  if (props.isMixTop) {
    emit('selectMixTop', configMenu.value.find(item => Array.isArray(item.children) && isMenuChildrenActive(item.children, route.path)));
  }

  /**
   * 递归渲染子菜单
   */
  function RenderSubMenu({ item, level = 0 }: { item: MenuItem; level?: number }) {
    // 有子菜单
    if (Array.isArray(item.children)) {
      // 混合模式的顶部菜单 ( 仅显示一级菜单 )
      if (props.isMixTop) {
        return (
          <ElMenuItem
            index={`${level}-${item.label}`}
            onClick={() => {
              emit('selectMixTop', item);
              const link = getMenuFirstLink(item.children!);
              if (link) navigateTo(link);
            }}
          >
            {item.icon && <ElIcon><i class={item.icon} /></ElIcon>}
            {t(item.label!, 1, { missingWarn: false })}
          </ElMenuItem>
        );
      }

      // 正常递归渲染子菜单
      return (
        <ElSubMenu index={`${level}-${item.label}`}>
          {{
            title: () => (
              <>
                <ElIcon><i class={item.icon ?? 'i-ant-design-appstore-outlined'} /></ElIcon>
                {t(item.label!, 1, { missingWarn: false })}
              </>
            ),
            default: () => item.children!.map(child => <RenderSubMenu item={child} level={level + 1} />),
          }}
        </ElSubMenu>
      );
    }
    // 没有子菜单
    else {
      return (
        <ElMenuItem index={item.to}>
          {item.icon && <ElIcon><i class={item.icon} /></ElIcon>}
          {t(item.label!, 1, { missingWarn: false })}
        </ElMenuItem>
      );
    }
  }

  /**
   * 菜单选中事件
   */
  function onMenuSelect(index: string) {
    // 点的是混合模式的一级菜单, 无需处理
    if (isString(index) && /^\d+-/.test(index)) return;

    // 外链
    try {
      new URL(index); // eslint-disable-line no-new
      window.open(index, '_blank');
    }
    catch {
      navigateTo(index);
    }
  }
</script>

<style lang="sass" scoped>
  .admin-menu
    // 修改菜单栏背景色
    --el-menu-hover-bg-color: var(--el-fill-color)

  .admin-menu:not(.horizontal)
    // 修改菜单栏高度
    --el-menu-item-height: 40px
    --el-menu-sub-item-height: 40px

    // 为菜单栏添加圆角
    :deep(:where(.el-sub-menu > .el-sub-menu__title, .el-menu-item))
      @apply rounded

    :deep(.el-menu-item)
      // 为激活的菜单显示一个常驻背景色
      &.is-active
        background-color: var(--el-fill-color)
      // 为激活的菜单显示一个聚焦条
      &.is-active::after
        @apply content-empty w-3px h-full absolute top-0 right-0 rounded bg-[var(--el-color-primary)]

    // 子菜单激活时, 父菜单也显示激活字体色
    :deep(.el-sub-menu.is-active) > .el-sub-menu__title
      color: var(--el-menu-active-color)

    // 为菜单间增加间距
    :deep(.el-menu) :where(.el-sub-menu, .el-sub-menu > .el-sub-menu__title, .el-menu-item)
      @apply important:mb-1

  // 菜单显示在顶部时, 高度和父元素相同
  .admin-menu:where(.horizontal, .isMixTop)
    --el-menu-horizontal-height: 100%
    height: 100%
</style>
