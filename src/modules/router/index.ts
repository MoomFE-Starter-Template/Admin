import type { UserModule } from '@/types';
import { settings } from '@/settings';
import { app } from '@/shared/env';

export const install: UserModule = ({ router }) => {
  // 路由鉴权
  router.beforeEach(async (to, from, next) => {
    const meta = to.meta || {};
    const requiresAuth = meta.requiresAuth ?? true;

    const auth = useAuthStore();

    // 页面需要登录
    if (requiresAuth && !auth.isLogin) {
      app.message?.error('请先登录');

      return next({
        name: 'Login',
      });
    }

    next();
  });

  // 设置页面标题
  router.afterEach((to) => {
    const meta = to.meta || {};
    const titleTemplate = (meta.titleTemplate ?? settings.titleTemplate ?? `:title | ${settings.name}`) as string;

    document.title = titleTemplate.replaceAll(':title', `${meta.title ?? ''}`);
  });
};
