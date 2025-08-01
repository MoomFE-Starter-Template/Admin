<template>
  <slot name="prepend" />

  <!-- 跳转到 Github -->
  <nuxt-link v-if="showGithub" to="https://github.com/MoomFE-Starter-Template/Admin" target="_blank">
    <el-button size="large" text bg circle :title="t('github')">
      <i-mdi-github />
    </el-button>
  </nuxt-link>

  <!-- 全屏 -->
  <el-tooltip v-if="showFullscreen && fullscreen.isSupported" content="全屏" placement="bottom">
    <el-button size="large" text bg circle @click="fullscreen.toggle()">
      <i-ant-design-fullscreen-exit-outlined v-if="fullscreen.isFullscreen" class="size-5" />
      <i-ant-design-fullscreen-outlined v-else class="size-5" />
    </el-button>
  </el-tooltip>

  <!-- 切换深色模式 -->
  <el-tooltip
    :content="{ system: '跟随系统', dark: '深色模式', light: '浅色模式' }[theme.value]"
    placement="bottom"
  >
    <el-button v-if="showDarkMode" size="large" text bg circle :title="t('toggle-dark-mode')" @click="theme.toggle">
      <i-mdi-theme-light-dark v-if="theme.value === 'system'" />
      <i-ph-moon v-else-if="theme.value === 'dark'" />
      <i-ic-outline-wb-sunny v-else />
    </el-button>
  </el-tooltip>

  <!-- 切换语言 -->
  <el-dropdown v-if="showLanguage" :title="t('toggle-language')" @command="code => setLocale(code)">
    <el-button size="large" text bg circle>
      <i-ion-language />
    </el-button>

    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="item in locales" :key="item.code">
          <el-dropdown-item :command="item.code" :disabled="item.code === locale">{{ item.name }}</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <slot name="center" />

  <!-- 用户信息 -->
  <el-dropdown v-if="showUser" @command="onCommand">
    <el-button class="pl-5px! pr-3!" size="large" text bg round>
      <div flex="~ items-center gap-2">
        <el-avatar :size="30" :src="auth.info.data?.avatar" :icon="UserFilled" />
        {{ auth.info.data?.name }}
      </div>
    </el-button>

    <template #dropdown>
      <el-dropdown-menu>
        <slot name="userDropdownPrepend" />
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        <slot name="userDropdownAppend" />
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <slot name="append" />
</template>

<script lang="ts" setup>
  import UserFilled from '~icons/ep/user-filled';

  export interface Props {
    showGithub?: boolean;
    showFullscreen?: boolean;
    showDarkMode?: boolean;
    showLanguage?: boolean;
    showUser?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showGithub: true,
    showFullscreen: true,
    showDarkMode: true,
    showLanguage: true,
    showUser: true,
  });

  const { t, locale, locales, setLocale } = useI18n({ useScope: 'local' });
  const theme = useTheme();
  const auth = useAuthStore();

  const fullscreen = reactive(useFullscreen());

  async function onCommand(command: string) {
    // 退出登录
    if (command === 'logout') {
      await ElMessageBox({
        title: '提示',
        message: '确定要退出登录吗?',
        showCancelButton: true,
      })
        .then(() => {
          auth.logout.execute(true);
        });
    }
  }
</script>

<style lang="sass" scoped>
  .el-button + .el-button
    @apply ml-0
  .el-button svg
    @apply text-lg
</style>

<i18n lang="yaml">
  cn:
    toggle-dark-mode: 切换深色模式
    toggle-language: 切换语言
    github: 跳转到 Github
  en:
    toggle-dark-mode: Toggle Dark Mode
    toggle-language: Toggle Language
    github: Go to Github
  </i18n>
