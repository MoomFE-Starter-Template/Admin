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
   * 菜单栏模式
   *  - left: 左侧菜单栏
   *  - top: 顶部菜单栏
   *  - mix: 混合菜单栏
   */
  adminMenuMode: 'left' as 'left' | 'top' | 'mix',
  /**
   * 后台管理菜单栏宽度
   *   - 仅在 adminMenuMode 为 left 或 mix 时有效
   */
  adminMenuWidth: '220px',
  /**
   * 后台管理菜单列表
   */
  adminMenu: <MenuItem[]>[
    {
      label: '仪表盘',
      icon: 'i-ant-design-dashboard-outlined',
      children: [
        { label: '工作台', to: '/dashboard/workplace' },
        { label: '统计页', to: '/dashboard/statistics' },
      ],
    },
    {
      label: 'Github',
      to: 'https://github.com/MoomFE-Starter-Template/Admin',
      icon: 'i-logos-github-icon',
    },
  ],
});
