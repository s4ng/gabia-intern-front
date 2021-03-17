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

    <v-list width="300" max-height="500" :tile="false" nav>
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
import Stomp from 'stomp-websocket';
import SockJS from 'sockjs-client';

let sock = new SockJS(`${process.env.VUE_APP_API_URL}/ws-stomp`);
let ws = Stomp.over(sock);

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
      ws.connect(
        {},
        () => {
          ws.subscribe('/sub/alert/'+this.userId, (reponse) => {
            this.getAlert(JSON.parse(reponse.body))
          });
          ws.send('/pub/alert/user', {}, JSON.stringify({ user_id: this.userId, status: 'YET'}));
        },
        function (error) {
          alert('error ' + error);
        }
      );
    },
    getAlert(alerts) {
      if(Array.isArray(alerts)) {
        this.notifications = alerts;
        return;
      }
      this.notifications.unshift(alerts);
    },
    updateAlert() {
      ws.send('/pub/alert/user', {}, JSON.stringify({ user_id: this.userId, status: 'READ'}));
      this.alertCount();
    }
  },
};
</script>