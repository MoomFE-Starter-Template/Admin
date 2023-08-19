import type { UserModule } from '@/types';
import { app } from '@/shared/env';

export const install: UserModule = ({ router }) => {
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
};
