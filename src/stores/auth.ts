import { defineStore } from 'pinia';
import { delay, onceRun, random } from 'mixte';
import { app } from '@/shared/env';

/** 用户信息状态管理 */
export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  /** 本地存储的用户信息 */
  const info = toReactive(
    useLocalStorage('auth', {
      username: '',
    }),
  );

  /** 是否已登录 */
  const isLogin = computed(() => !!info.username);

  /** 登录 */
  const login = onceRun(async (data: any) => {
    await delay(
      random(360, 1000),
    );

    if (data.username && data.password === '123456')
      info.username = data.username;
  });

  const logout = onceRun(async () => {
    app.message?.loading('正在退出登录...');

    await delay(
      random(360, 1000),
    );

    info.username = '';

    router.push({ name: 'Login' });
  });

  return {
    info,
    isLogin,
    login,
    logout,
  };
});
