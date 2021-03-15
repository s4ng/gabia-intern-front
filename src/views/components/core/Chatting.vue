<template>
  <v-container
    class="pa-0"
    style="background-color: #eee">
    <v-card
      min-height="500"
      min-width="350"
      v-show="$store.state.isChattingListShow"
      id="chatting">
      <v-container
        class="d-flex flex-wrap">
        <v-card-title
          class="ma-2">채팅 목록</v-card-title>
        <v-btn
          class="ml-auto"
          small
          fab
          @click="refreshChatList"
          color="cyan">
          <v-icon>
            mdi-refresh
          </v-icon>
        </v-btn>
      </v-container>
      <!-- FIXME : 채팅 리스트용 카드 넣는 부분 -->
      <v-card>

      </v-card>
    </v-card>
    <v-btn
      id="chatButton"
      color="indigo"
      fab
      large
      @click="openChatList">
      <v-icon>mdi-message-processing</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'DashboardCoreChatting',
  methods: {
    async openChatList() {
      try {
        await this.$store.dispatch('CHATTINGLISTSHOW');
      } catch(err) {
        alert(`채팅 리스트 조회 실패\n${err}`);
      }
    },
    refreshChatList() {
      this.getChatList();
    },
    getChatList() {
      console.log('FIXME : 채팅리스트 받아오는 로직구현')
    }
  }
}
</script>

<style>
  #chatting {
    position: fixed;
    margin:85px;
    right: 0;
    bottom: 0;
  }
  #chatButton {
    position: fixed;
    margin: 30px;
    right: 0;
    bottom: 0;
  }
</style>