import type { App } from 'vue';
import type { Router } from 'vue-router';

interface UserModuleContext {
  app: App<Element>
  router: Router
}

/**
 * 用户模块定义方法
 */
export type UserModule = (ctx: UserModuleContext) => void;

/**
 * 项目配置
 */
export interface Settings {
  /** 项目名称 */
  name: string
  /**
   * 标题名称模板
   * @default `:title | ${settings.name}`
   */
  titleTemplate?: string
}
