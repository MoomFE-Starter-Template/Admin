<template>
  <div class="admin-menu">
    <el-menu
      class="b-r-none!"
      :default-active="activeMenu"
      active-text-color=""
      @select="onMenuSelect"
    >
      <RenderSubMenu v-for="item in config.adminMenu" :key="item.label" :item="item" />
    </el-menu>
  </div>
</template>

<script lang="tsx" setup>
  import type { MenuItem } from '../../types/menu';
  import { ElIcon, ElMenuItem, ElSubMenu } from 'element-plus';

  const config = useAppConfig();

  const { t } = useI18n();

  const route = useRoute();

  const activeMenu = computed(() => {
    return route.path;
  });

  /**
   * 递归渲染子菜单
   */
  function RenderSubMenu({ item, level = 0 }: { item: MenuItem; level?: number }) {
    // 有子菜单
    if (Array.isArray(item.children)) {
      return (
        <ElSubMenu index={`${level}-${item.label}`}>
          {{
            title: () => (
              <>
                <ElIcon><i class={item.icon ?? 'i-ant-design-appstore-outlined'} /></ElIcon>
                {t(item.label)}
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
          {t(item.label)}
        </ElMenuItem>
      );
    }
  }

  /**
   * 菜单选中事件
   */
  function onMenuSelect(index: string) {
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
    // 修改菜单栏高度
    --el-menu-item-height: 40px
    --el-menu-sub-item-height: 40px
    // 修改菜单栏背景色
    --el-menu-hover-bg-color: var(--el-fill-color)

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
</style>
