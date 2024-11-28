import { accessToken } from '~/shared/env';

/**
 * 登录页已登录重定向
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const appConfig = useAppConfig();

  if (to.path === appConfig.loginPath) {
    const auth = useAuthStore();

    if (auth.isLogin && !auth.info.isSuccess) {
      if (!auth.info.isLoading) auth.info.execute();

      try {
        await until(() => auth.info.isFinished).toBeTruthy();

        if (!auth.info.isSuccess) {
          throw new Error('登录失败');
        }

        return navigateTo({
          path: (to.query.redirect as string) || appConfig.defaultRedirectPath,
          replace: true,
        });
      }
      catch {
        accessToken.value = '';
      }
    }
  }
});
