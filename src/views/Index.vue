<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-chatting />
  </v-app>
</template>

<script>
export default {
  name: 'DashboardIndex',

  components: {
    DashboardCoreAppBar: () => import('./components/core/AppBar'),
    DashboardCoreDrawer: () => import('./components/core/Drawer'),
    DashboardCoreView: () => import('./components/core/View'),
    DashboardCoreChatting: () => import('./components/core/Chatting')
  },

  data: () => ({
    expandOnHover: false,
  }),
}
</script>
