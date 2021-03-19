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
            </v-badge> 
            <v-row>
              <v-col
                cols="3">
                <v-img
                  class="mx-3"
                  width="100"
                  height="100"
                  :src="imgUrlSetter(chatRoomNameSplitter(room.chat_room_name)[5])">
                </v-img>
              </v-col>
              <v-col
                cols="9">
                <h4 
                  class="pa-2"
                  v-text="chatRoomNameSplitter(room.chat_room_name)[2]"></h4>
                <div
                  class="pa-2"
                  v-text="chatRoomUserNameSetter(room)">
                </div>
                <div
                  class="d-flex pa-1">
                <v-card 
                  :color="chatRoomColorSetter(room)"
                  class="ma-0 pa-1"
                  v-text="chatRoomStatusSetter(room)">
                </v-card>
                </div>
              </v-col>
            </v-row>
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
    // this.ws.debug = () => {};

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
    chatRoomNameSplitter(chatRoom) {
      return chatRoom.split('|');
    },
    imgUrlSetter(imgUrl) {
      return `${process.env.VUE_APP_API_URL}/images/${imgUrl}`;
    },
    chatRoomUserNameSetter(room) {
      let seller = `판매자 : ${this.chatRoomNameSplitter(room.chat_room_name)[0]}`;
      let buyer = `구매자 : ${this.chatRoomNameSplitter(room.chat_room_name)[1]}`
      return `${seller} / ${buyer}` 
    },
    chatRoomStatusSetter(room) {
      let status = this.chatRoomNameSplitter(room.chat_room_name)[4];

      if(status === 'CREATED') {
        return '판매중'
      }
      if(status === 'MODIFIED') {
        return '판매중'
      }
      if(status === 'CLOSED') {
        return '판매완료'
      }
    },
    chatRoomColorSetter(room) {
      let status = this.chatRoomNameSplitter(room.chat_room_name)[4];

      if(status === 'CREATED') {
        return '#A5D6A7'
      }
      if(status === 'MODIFIED') {
        return '#A5D6A7'
      }
      if(status === 'CLOSED') {
        return '#EF9A9A'
      }
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