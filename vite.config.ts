import path from 'node:path';
import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Inspect from 'vite-plugin-inspect';
import { MixteUseAutoImport } from '@mixte/use/register';

export default defineConfig(({ mode }) => {
  /** 是否是开发模式 */
  const isDev = mode === 'development';
  /** 环境变量 */
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'APP_']);

  return {
    // 环境变量前缀
    envPrefix: 'APP_',
    // 路径别名
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
        '@': path.resolve(__dirname, './src'),
        '@@': path.resolve(__dirname, './'),
      },
    },
    // 插件
    plugins: [
      // Vue 3 支持
      Vue(),
      // JSX 支持
      VueJsx(),
      // 以文件系统为基础的路由
      Pages({
        dirs: path.resolve(__dirname, './src/pages'),
        extensions: ['vue'],
        exclude: ['**/components', '**/composables'],
      }),
      // 页面布局系统
      Layouts(),
      // 原子化 CSS 引擎
      Unocss(),
      // 将图标作为图标组件可进行导入
      Icons({
        scale: 1,
        compiler: 'vue3',
      }),
      // 自动导入使用到的组件
      Components({
        dts: path.resolve(__dirname, './types/components.d.ts'),
        dirs: [
          path.resolve(__dirname, './src/components'),
          path.resolve(__dirname, './src/components-private'),
        ],
        resolvers: [
          // 自动导入图标组件
          IconsResolver({ prefix: 'i' }),
          // 自动导入 Naive UI 组件
          NaiveUiResolver(),
        ],
      }),
      // API 自动加载
      AutoImport({
        dts: path.resolve(__dirname, './types/auto-imports.d.ts'),
        vueTemplate: true,
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          '@vueuse/math',
          MixteUseAutoImport({ useWithVueUseCore: true }),
        ],
        dirs: [
          path.resolve(__dirname, './src/composables'),
          path.resolve(__dirname, './src/stores'),
        ],
        eslintrc: {
          enabled: true,
          filepath: path.resolve(__dirname, './.eslintrc-auto-import.json'),
        },
      }),
      // 插件调试
      Inspect(),
    ],
    // 开发服务器选项
    server: {
      port: 666,
    },
    // 预览选项
    preview: {
      port: 888,
    },
  };
});
