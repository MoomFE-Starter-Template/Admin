<template>
  <div class="w-full h-16 items-center px-5" flex="~ gap-3">
    <!-- 面包屑导航 -->
    <n-breadcrumb>
      <template v-for="item in breadcrumb" :key="item.name">
        <n-breadcrumb-item>{{ item.meta?.title }}</n-breadcrumb-item>
      </template>
    </n-breadcrumb>

    <div class="flex-grow" />

    <!-- 用户信息展示 -->
    <n-dropdown :options="dropdownOptions">
      <div class="flex items-center gap-2 cursor-pointer">
        <n-avatar>
          <i-ph-user-bold class="text-xl" />
        </n-avatar>
        {{ auth.info.username }}
      </div>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute();

  const auth = useAuthStore();

  /** 面包屑 */
  const breadcrumb = computed(() => {
    return route.matched.filter(item => item.meta?.title);
  });

  /** 用户下拉菜单 */
  const dropdownOptions = reactive([
    {
      label: '退出登录',
      value: 'logout',
      props: {
        onclick: () => auth.logout(),
      },
    },
  ]);
</script>

<style lang="scss" scoped>
  // 屏蔽面包屑默认样式
  .n-breadcrumb :deep(.n-breadcrumb-item:not(:last-child)) .n-breadcrumb-item__link{
    background-color: transparent !important;
    color: var(--n-separator-color);
    cursor: auto;
  }
</style>
