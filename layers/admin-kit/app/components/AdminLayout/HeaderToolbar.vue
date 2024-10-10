<template>
  <!-- 跳转到 Github -->
  <el-button text bg circle :title="t('github')">
    <a href="https://github.com/MoomFE-Starter-Template/Admin" target="_blank" rel="noopener noreferrer">
      <i-mdi-github />
    </a>
  </el-button>

  <!-- 切换深色模式 -->
  <el-button text bg circle :title="t('toggle-dark-mode')" @click="theme.toggle">
    <i-mdi-theme-light-dark v-if="theme.value === 'system'" />
    <i-ph-moon v-else-if="theme.value === 'dark'" />
    <i-ic-outline-wb-sunny v-else />
  </el-button>

  <!-- 切换语言 -->
  <el-dropdown :title="t('toggle-language')" @command="code => setLocale(code)">
    <el-button text bg circle>
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

  <!-- 用户信息 -->
  <el-dropdown @command="onCommand">
    <el-avatar :size="32" :src="auth.info.data?.avatar" :icon="UserFilled" />

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
  import UserFilled from '~icons/ep/user-filled';

  const { t, locale, locales, setLocale } = useI18n({ useScope: 'local' });
  const theme = useTheme();
  const auth = useAuthStore();

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
