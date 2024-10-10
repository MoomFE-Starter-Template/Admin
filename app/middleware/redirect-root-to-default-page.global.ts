/**
 * 重定向根目录到默认跳转页
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const config = useAppConfig();

  if (to.path === '/') {
    return navigateTo({
      path: config.defaultRedirectPath,
      replace: true,
    });
  }
});
