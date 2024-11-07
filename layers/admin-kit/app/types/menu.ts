/**
 * 菜单项配置
 */
export interface MenuItem {
  id?: string;
  /**
   * 菜单名称, 也可传入 i18n 的 key
   *  - 有子菜单和当前菜单为外联时必填
   *  - 是项目内页面时可不填, 会自动从 meta.title 中获取
   */
  label?: string;
  /**
   * 菜单路径, 也可传入外链地址
   *  - 有子菜单时不需要配置
   */
  to?: string;
  /**
   * 菜单图标
   */
  icon?: string;
  /** 子菜单 */
  children?: MenuItem[];
}
