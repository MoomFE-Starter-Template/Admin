import type { Router } from 'vue-router';
import type { MenuItem } from '../../types/menu';

/**
 * 递归判断子菜单是否激活
 */
export function isMenuChildrenActive(children: MenuItem[], currentPath: string) {
  for (const child of children) {
    if (Array.isArray(child.children) && isMenuChildrenActive(child.children, currentPath)) {
      return true;
    }
    if (child.to === currentPath) {
      return true;
    }
  }
}

/**
 * 递归获取第一个可跳转的菜单
 *  - 优先在当前层查找, 未找到后去子级查找
 */
export function getMenuFirstLink(children: MenuItem[]): string | undefined {
  let link = children.find(item => item.to)?.to;

  if (!link) {
    for (const child of children) {
      if (Array.isArray(child.children)) {
        if ((link = getMenuFirstLink(child.children)))
          break;
      }
    }
  }

  return link;
}

/**
 * 初始化菜单信息
 *  - 用于初始化菜单的 label 信息
 */
export function initMenu(menu: MenuItem[], router: Router): MenuItem[] {
  return menu.map((item) => {
    if (Array.isArray(item.children)) {
      return {
        ...item,
        children: initMenu(item.children, router),
      };
    }

    return {
      ...item,
      label: item.label ?? router.resolve(item.to!).meta.title ?? item.to,
    };
  });
};
