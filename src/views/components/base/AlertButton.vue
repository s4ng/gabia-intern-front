<template>
  <v-menu bottom left offset-y origin="top right" transition="scale-transition">
    <template v-slot:activator="{ attrs, on }">
      <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on" @click="updateAlert">
        <v-badge color="red" v-if="!alertCountIsEmpty" overlap bordered>
          <template v-if="!alertCountIsEmpty" v-slot:badge>
            <span>{{ yetCount }}</span>
          </template>

          <v-icon>mdi-bell</v-icon>
        </v-badge>
        <v-icon v-if="alertCountIsEmpty">mdi-bell</v-icon>
      </v-btn>
    </template>

    <v-list max-height="500" :tile="false" nav>
      <div>
        <v-container
          v-for="(n, i) in notifications"
          :key="`item-${i}`">
          <v-list-item-title
            v-text="n.message" />
        </v-container>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    notifications: [],
    yetCount: 0,
  }),
  computed: {
    alertCountIsEmpty() {
      this.alertCount();
      return this.notifications.filter(e => e.status==='YET').length === 0;
    }
  },
  created() {
    this.userId = this.$store.state.userId;
    this.stompStart();
  },
  methods: {
    alertCount() {
      this.yetCount = this.notifications.filter(e => e.status==='YET').length;
    },
    stompStart() {
      this.$ws.subscribe('/sub/alert/'+this.userId, (reponse) => {
        this.getAlert(JSON.parse(reponse.body))
      });
      this.$ws.send('/pub/alert/user', {}, JSON.stringify({ user_id: this.userId, status: 'YET'}));
    },
    getAlert(alerts) {
      if(Array.isArray(alerts)) {
        this.notifications = alerts;
        return;
      }
      this.notifications.unshift(alerts);
    },
    updateAlert() {
      this.$ws.send('/pub/alert/user', {}, JSON.stringify({ user_id: this.userId, status: 'READ'}));
      this.alertCount();
    }
  },
};
</script>