<template>
  <div />
</template>

<script lang="ts" setup>
  const config = useAppConfig();

  defineRouteRules({
    redirect: config.defaultRedirectPath,
  });
</script>
