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
        <v-simple-table>
          <tbody>
            <tr
              v-for="(n, i) in notifications"
              :key="`item-${i}`">
              <td>
                <v-list-item-title
                  v-text="alertTypeCheck(n.alert_type)"/>
              </td>
              <td>
                <router-link
                  class="link"
                  :to="{name: '게시판',  params: {boardId: n.board_id}, query: { board: n.board_type.toLowerCase()}}"
                  >
                  <v-list-item-subtitle
                    v-text="n.message" />
                </router-link>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-divider></v-divider>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    notifications: [],
    yetCount: 0,
    ws: undefined,
  }),
  computed: {
    alertCountIsEmpty() {
      this.alertCount();
      return this.notifications.filter(e => e.status==='YET').length === 0;
    }
  },
  created() {
    // 웹 소켓 설정
    let sock = new this.$SockJs(`${process.env.VUE_APP_API_URL}/ws-stomp`);
    this.ws = this.$Stomp.over(sock);
    this.ws.debug = () => {};

    this.userId = this.$store.state.userId;
    this.stompStart();
  },
  methods: {
    alertCount() {
      this.yetCount = this.notifications.filter(e => e.status==='YET').length;
    },
    stompStart() {
      this.ws.connect(
        {},
        () => {
          this.ws.subscribe('/sub/alert/'+this.userId, (reponse) => {
            this.getAlert(JSON.parse(reponse.body))
          });
          this.ws.send('/pub/alert/user', {}, JSON.stringify({ user_id: this.userId, status: 'YET'}));
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
      this.ws.send('/pub/alert/user', {}, JSON.stringify({ user_id: this.userId, status: 'READ'}));
      this.alertCount();
    },
    alertTypeCheck(type) {
      let typeData = {
        COMMENT: '댓글',
        RAFFLE: '래플',
        SUGGESTION: '제안',
        KEYWORD: '키워드'
      }
      if(type in typeData) return typeData[type];
    }
  },
};
</script>
<style>
.link:visited {
  color: black;
}
.link:link {
  color: black;
}
.link:active {
  color: black;
}
.link:hover {
   color: grey;
}
table td + td { border-left:1px solid #dddddd; }
</style>