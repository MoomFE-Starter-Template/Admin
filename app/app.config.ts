// @unocss-include

import type { MenuItem } from '~~/layers/admin-kit/app/types/menu';

/** 默认网站标题 */
const defaultTitle = 'index.title';

export default defineAppConfig({
  /**
   * 默认网站标题
   */
  defaultTitle,
  /**
   * 网站标题模板
   *  - 用于自定义拼接网站标题生成最终的网站标题 ( 比如全局添加前缀后缀等 )
   */
  titleTemplate: (title?: string) => `${title ?? defaultTitle} - MoomFE Admin`,

  /**
   * 默认跳转页
   *  - 用于登录后的默认跳转
   */
  defaultRedirectPath: '/dashboard/workplace',

  /**
   * 登录页
   *  - 用户用户鉴权失效时的跳转
   */
  loginPath: '/login',

  /**
   * 路由鉴权的白名单页面列表
   */
  requiresAuthWhiteList: ['/login'],

  /**
   * 接口请求基础路径
   */
  API_BASE_URL: 'https://apifoxmock.com/m1/4781098-4434938-default',

  /**
   * 后台管理菜单栏模式
   *  - left: 左侧菜单栏
   *  - top: 顶部菜单栏
   *  - mix: 混合菜单栏
   */
  adminMenuMode: 'left' as 'left' | 'top' | 'mix',
  /**
   * 后台管理菜单列表
   */
  adminMenu: <MenuItem[]>[
    {
      label: '仪表盘',
      icon: 'i-ant-design-dashboard-outlined',
      children: [
        { to: '/dashboard/workplace' },
        { to: '/dashboard/statistics' },
      ],
    },
    {
      label: 'Github',
      to: 'https://github.com/MoomFE-Starter-Template/Admin',
      icon: 'i-logos-github-icon',
    },
  ],

  /**
   * 后台管理启用多页签
   */
  adminMultiTabs: true,
  /**
   * 后台管理多页签是否保存在浏览器缓存中 ( 刷新页面不丢失页签列表 )
   */
  adminMultiTabsCache: true,
  /**
   * 后台管理首页页签路径
   */
  adminMultiTabsHomePath: '/dashboard/workplace',
  /**
   * 后台管理多页签是否固定首页页签
   */
  adminMultiTabsFixedHome: true,
});
