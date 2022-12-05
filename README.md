<h1 align="center">后台管理系统模板</h1>
<h3 align="center">目前仅是一个基础的实例</h3>

<br>

## 特性

- ⚡️ [Vite 3](https://github.com/vitejs/vite), [pnpm](https://pnpm.io), [Vue 3](https://github.com/vuejs/core) 优先 - 就是快！
- 📲 [组件自动加载](https://github.com/antfu/unplugin-vue-components)
- 📥 [API 自动加载](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 无需引入
- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的原子化 CSS 引擎
- 😃 [各种图标集为你所用](https://github.com/iconify/icon-sets) - 120+ 图标集, 150000+ 图标为你所用, 从不妥协
- 🍍 [使用 Pinia 的状态管理](https://pinia.vuejs.org)
- 🗂 [基于文件的路由](https://github.com/hannoeru/vite-plugin-pages)
- 📑 [布局系统](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
- 🔥 使用 [新的 `<script setup>` 语法](https://github.com/vuejs/rfcs/pull/227)
- 🌍 [I18n 国际化开箱即用](https://github.com/intlify/vue-i18n-next), 使用插件[自动加载](https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n)
- 🖨 使用 [Vite SSG](https://github.com/antfu/vite-ssg) 进行服务端生成 ( SSG )
- 🦔 使用 [critters](https://github.com/GoogleChromeLabs/critters) 的生成关键 CSS
- 🌙 深色模式
- 🦾 TypeScript 支持

<br>

## 预配置

### UI 框架
  - [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

### Icons
  - [Iconify](https://iconify.design/) - 使用任意的图标集, 使用 [Icônes](https://icones.netlify.app/) 或 [iconify](https://icon-sets.iconify.design/) 查看或搜索图标
    - [用组件的方式使用图标](https://github.com/antfu/unplugin-icons)
    - [用 CSS 的方式使用图标](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### 插件
  - [Vue Router](https://github.com/vuejs/router)
    - [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) - 以文件系统为基础的路由
    - [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - 页面布局系统
  - [Pinia](https://pinia.vuejs.org) - 直接的, 类型安全的, 使用 Composition API 的轻便灵活的 Vue 状态管理
  - [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - 自动加载组件
  - [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 等，无需导入
  - [Vue I18n](https://github.com/intlify/vue-i18n-next) - 国际化
    - [vite-plugin-vue-i18n](https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n) - Vue I18n 的 Vite 插件
  - [VueUse](https://github.com/antfu/vueuse) - 实用的 Composition API 工具合集
  - [vite-ssg-sitemap](https://github.com/jbaubree/vite-ssg-sitemap) - 站点地图生成器
  - [@vueuse/head](https://github.com/vueuse/head) - 响应式地操作文档头信息

### 编码风格
  - 使用 Composition API 的 [\<script setup\> SFC 语法](https://github.com/vuejs/rfcs/pull/227)
  - [ESLint](https://eslint.org/) 配置为 [@moomfe/eslint-config](https://github.com/MoomFE/eslint-config), 单引号, 有分号

### 开发工具

- [TypeScript](https://www.typescriptlang.org)
- [pnpm](https://pnpm.js.org/) - 快, 节省磁盘空间的包管理器
- [vite-ssg](https://github.com/antfu/vite-ssg) - 服务端生成
  - [critters](https://github.com/GoogleChromeLabs/critters) - 关键 CSS 生成器
- [VS Code](https://code.visualstudio.com/)- IDE
- VS Code 扩展
  - [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - Vue 3 `<script setup>` IDE 支持
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 代码风格检查及修正
  - [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) - UnoCSS 样式提示及自动补全
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - 图标内联显示及自动补全
  - [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - 多合一的 I18n 支持

<br>

## 项目目录结构

- **\*\*\*.code-workspace**: VsCode 工作区文件, 使用这个打开项目
- **public**: 打包后需要放到根目录的文件
- **locales**: 国际化文件
- **dist**: 打包后的代码
- **src**: 源码
  - **assets**: 存放静态资源
  - **styles**: 公共样式
  - **shared**: 公用变量 or 函数
  - **lib**: 外部依赖库 ( 不满足需求需要重构时或者外部依赖库有 BUG 时, 从 node_modules 移至这里 )
  - **utils**: 工具函数
  - **modules**: 项目依赖类库的配置
  - **workers**: 存放独立的 Web Worker 应用
  - **stores**: 状态存储
  - **composables**: 组合式函数
  - **components**: 公共组件 ( 相对独立的组件, 离开当前项目也能使用的组件 )
  - **components-private**: 私有组件 ( 只能在当前项目中使用的组件, 比如说包含了业务代码的组件 )
  - **layouts**: 布局组件
  - **pages**: 页面

<br>

## 开始

使用项目根目录的 `***.code-workspace` 文件进入 VsCode 工作区

安装相应的 VsCode 扩展 ( 首次进入工作区时, 右下角会提示安装 ), 可以在扩展界面, 输入 `@recommended` 检查安装状态

执行以下命令就可以启动项目

```bash
  pnpm dev # 如果你没装过 pnpm, 可以先运行: npm install -g pnpm
```