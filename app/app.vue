<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import { ElLoading } from 'element-plus';

  const nuxtApp = useNuxtApp();

  const config = useAppConfig();

  const { t } = useI18n();

  const route = useRoute();

  useHead({
    title: () => t(route.meta.title ?? config.defaultTitle, 1, { missingWarn: false }),
    // titleTemplate: config.titleTemplate, // 在 i18n 中有做处理, 详见此处的说明: ../layers/module-i18n/README.md
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  });

  nuxtApp.vueApp.use(ElLoading);
</script>
