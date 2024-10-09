<template>
  <div />
</template>

<script lang="ts" setup>
  const config = useAppConfig();
  const router = useRouter();

  router.replace(config.defaultRedirectPath);
</script>
