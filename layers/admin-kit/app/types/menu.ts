/**
 * 菜单项配置
 */
export interface MenuItem {
  /** 菜单名称 */
  label: string;
  /**
   * 菜单路径
   *  - 有子菜单时不需要配置
   */
  to?: string;
  /** 菜单图标 */
  icon?: string;
  /** 子菜单 */
  children?: MenuItem[];
}
