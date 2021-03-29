<template>
  <v-content>
    <router-view :key="$route.fullPath"/>

    <dashboard-core-footer />
  </v-content>
</template>

<script>
export default {
  name: 'DashboardCoreView',

  components: {
    DashboardCoreFooter: () => import('./Footer'),
  },

}
</script>
