<template>
  <v-container
    class="d-flex align-start flex-column">
    <div
      class="px-1 d-flex flex-wrap">
      <v-btn
          class="ml-auto"
          small
          fab
          @click="goToChatList"
          color="deep-orange">
          <v-icon>
          mdi-backspace-outline
          </v-icon>
      </v-btn>
      <router-link
        class="text-lg-h3 ma-2 link"
        v-html="roomNameSetter"
        :to="{name: '게시판',  params: {boardId: room.board_id}, query: { board: 'used'}}"
        >
      </router-link>
    </div>

    <v-list id="chatList">
      <div>
        <div
          style="padding-top: 0"
          class="d-flex"
          v-for="item in chatting"
          :key="item.chat_message_id">
          <v-card
            max-width="250"
            class="pa-3 mr-2 my-2 d-inline-flex"
            :class="item.user_id === userId && 'ml-auto yellow lighten-4' || 'gray lighten-4'"
            v-if="item.message !== ''"
            v-text="item.message">
          </v-card>
        </div>
      </div>
    </v-list>

    <div
      class="mt-auto">
      <v-row>
        <v-col
          cols="9">
          <v-text-field
          v-model="message"
            outlined
            class="my-auto"
            @keyup.enter="sendMessage"></v-text-field>
        </v-col>
        <v-col
          cols="3">
          <v-btn
            v-if="room.seller_status === 'DELETED' || room.buyer_status === 'DELETED'"
            width="20"
            class="my-auto"
            color="gray">send</v-btn>
          <v-btn
            v-else
            width="20"
            class="my-auto"
            color="success"
            @click="sendMessage">send</v-btn>
        </v-col>
      </v-row>
      <div>
        <a 
          @click="leaveChat"
          style="margin-right: 100px">채팅 나가기</a>
        <a 
          v-if="room.seller_id === userId && (room.buyer_status !== 'CLOSED' || room.seller_status !== 'CLOSED')"
      
          @click="completeDeal"
          style="margin-left: 100px">거래 완료</a> 
      </div>

    </div>
    
  </v-container>
</template>

<script>
export default {
  props: ['room'],
  data: () => ({
    userId: null,
    message: '',
    chatting: [],
    ws: undefined,
    a: 0,
  }),
  created() {
    // 웹 소켓 설정
    let sock = new this.$SockJs(`${process.env.VUE_APP_API_URL}/ws-stomp`);
    this.ws = this.$Stomp.over(sock);
    this.ws.debug = () => {};

    this.userId = this.$store.state.userId;
    this.stompStart();
  },
  methods: {
    goToChatList() {
      this.$emit('go-to-chat-list');
    },
    sendMessage() {
      if(this.message === '') {
        return;
      }
      this.ws.send('/pub/chat/room', {}, JSON.stringify({ user_id: this.userId, message: this.message, chat_message_type:'TALK', chat_room_id: this.room.chat_room_id }));
      this.message = '';
    },
    stompStart() {
      this.ws.connect(
        {},
        () => {
          this.ws.subscribe('/sub/chat/room/'+this.room.chat_room_id, (reponse) => {
            this.chatting = JSON.parse(reponse.body);
          });
          this.ws.send('/pub/chat/room/start', {}, JSON.stringify({ user_id: this.userId, message: this.message, chat_message_type:'ENTER', chat_room_id: this.room.chat_room_id }));
        }
      )
    },
    leaveChat() {
      if(confirm('채팅방을 나가시겠습니까?')) {
        this.goToChatList();
        this.ws.send('/pub/chat/room/leave', {}, JSON.stringify({ user_id: this.userId, message: this.message, chat_message_type:'LEAVE', chat_room_id: this.room.chat_room_id }));
      }
    },
    completeDeal() {
      if(confirm('거래가 완료되었습니까?')) {
        this.goToChatList();
        this.ws.send('/pub/chat/room/close', {}, JSON.stringify({ user_id: this.userId, message: this.message, chat_message_type:'CLOSE', chat_room_id: this.room.chat_room_id }));
        this.a++;
        this.$router.push({ path : this.$route.fullPath, query: {a : this.a}});
      }
    },
  },
  computed: {
    roomNameSetter() {
      return this.room.chat_room_name.split('|')[2]
    },
  }
}
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
#chatList{
  height:410px;/* or any height you want */
  width:350px;
  overflow-y:auto;
  display: flex;
  flex-direction: column-reverse;
}
.v-card {
  margin: 0;
}
</style>