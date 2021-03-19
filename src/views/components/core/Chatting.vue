<template>
  <v-container
    class="pa-0"
    style="background-color: #eee">
    <v-card
      height="650"
      min-width="370"
      style="overflow-y:auto;"
      v-show="$store.state.isChattingListShow"
      id="chatting">

      <base-chatting-room
        v-if="isChatting"
        v-on:go-to-chat-list="goToChatList"
        :room="room">
      </base-chatting-room>

      <v-container
        v-if="!isChatting">
        <v-container
          class="d-flex flex-wrap">
          <v-card-title
            class="ma-2">채팅 목록
          </v-card-title>
        </v-container>
        <!-- FIXME : 채팅 리스트용 카드 넣는 부분 -->
        
          <v-card
            class="px-1 py-4"
            v-for="room in rooms"
            :key="room.chat_room_id"
            
            @click="goToChatRoom(room)">
            <v-badge color="red" overlap bordered v-if="yetCount(room) !== 0">
              <template v-slot:badge>
                <span>{{ yetCount(room) }}</span>
              </template>
              <v-card-text v-html="chatRoomNameSetter(room)"></v-card-text>
            </v-badge> 
            <v-card-text v-else v-html="chatRoomNameSetter(room)"></v-card-text>
          </v-card>
         
      </v-container>
      
    </v-card>
    
    <v-btn
      id="chatButton"
      color="indigo"
      fab
      large
      @click="openChatList">
      <v-badge color="red" v-if="yetCountSum !== 0" overlap bordered>
        <template v-slot:badge>
          <span>{{ yetCountSum }}</span>
        </template>

        <v-icon>mdi-message-processing</v-icon>
      </v-badge>
      <v-icon v-else>mdi-message-processing</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'DashboardCoreChatting',
  data: () => ({
    isChatting: false,
    roomId: null,
    roomName: '',
    rooms: [],
    room: {},
    userId: null,
    ws: undefined,
  }),
  created() {
    // 웹 소켓 설정
    let sock = new this.$SockJs(`${process.env.VUE_APP_API_URL}/ws-stomp`);
    this.ws = this.$Stomp.over(sock);

    this.userId = this.$store.state.userId;
    this.stompStart();
  },
  computed: {
    yetCountSum() {
      let sum = 0;
      this.rooms.forEach(e => {
        if(e.seller_id === this.userId) {
          sum += e.seller_count;
        } else {
          sum += e.buyer_count;
        }
      })
      return sum;
    },
  },
  methods: {
    async openChatList() {
      try {
        await this.$store.dispatch('CHATTINGLISTSHOW');
      } catch(err) {
        alert(`채팅 리스트 조회 실패\n${err}`);
      }
    },
    goToChatRoom(room) {
      this.isChatting = true;
      this.room = room
    },
    goToChatList() {
      this.isChatting = false;
    },
    getChatList(roomList) {
      this.rooms = roomList;
    },
    alertCount() {
      this.yetCount = this.notifications.filter(e => e.status==='YET').length;
    },
    stompStart() {
      this.ws.connect(
        {},
        () => {
          this.ws.subscribe('/sub/chat/user/'+this.userId, (reponse) => {
            this.getChatList(JSON.parse(reponse.body));
          });
          this.ws.send('/pub/chat/user', {}, JSON.stringify({ user_id: this.userId }));
        }
      );
    },
    yetCount(chatRoom) {
      if(chatRoom.seller_id === this.userId) {
        return chatRoom.seller_count;
      } else {
        return chatRoom.buyer_count;
      }
    },
    chatRoomNameSetter(room) {
      let roomName = room.chat_room_name;
      if(roomName === '' || roomName === undefined) {
        return 'err'
      }
      let split = roomName.split('/');
      return split[2]+ '<br>' + split[0] + '&nbsp&nbsp&nbsp&nbsp' + split[1]; 
    }
  }
}
</script>

<style>
  #chatting {
    position: fixed;
    margin:35px;
    margin-bottom: 90px;
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