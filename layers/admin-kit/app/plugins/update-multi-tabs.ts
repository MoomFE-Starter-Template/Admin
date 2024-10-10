import { useAdminMultiTabsStore } from '../stores/multi-tabs';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useAppConfig();

  nuxtApp.hook('page:finish', () => {
    if (config.adminMultiTabs) {
      const route = useRoute();
      const multiTabs = useAdminMultiTabsStore();

      multiTabs.update(route);
    }
  });
});
