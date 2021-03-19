<template>
  <v-card
    max-width="460"
    class="ma-3">
    <router-link
      style="text-decoration: none; color: inherit;"
      :to="{name : '게시판',
            params : {boardId : board.board_id},
            query : {board: board.board_type.toLowerCase()}}">
      <v-row>
        <v-col cols="4">
          <div class="ml-3 mt-7">
            <v-img
              height="150"
              width="150"
              :src="imgUrlSetter"></v-img>
          </div>
        </v-col>
        <v-col cols="8">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline ml-3 mb-2"
                v-text="board.title"></v-card-title>

              <v-card-text
                v-html="switchSubtitleByBoardType" class="h3 mx-3 mt-4 mb-2"></v-card-text>
              <p
                class="mx-7"
                v-text="userNameSetter"></p>
            </div>
          </div>
          <v-row>
            <v-col cols="6">
              <v-card
                elevation="0"
                width="120"
                height="50"
                class="pa-3 mt-0">
              </v-card>
            </v-col>
            <v-col class="" cols="6">
              <v-card 
                :color="switchStatusColor"
                width="120"
                height="50"
                class="ml-2 pa-3 mt-0">
                <v-row
                  class="ma-auto subtitle-2"
                  justify="center"
                  v-text="switchStatus">
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </router-link>
  </v-card>
</template>

<script>
export default {
  props: {
    board: {}
  },
  //['type', 'img', 'title', 'price', 'deadline', 'status', 'seller'],
  computed: {
    imgUrlSetter() {
      if(this.board.img === '' || this.board.img === undefined) {
        return this.$noImageUrl
      }
      return `${process.env.VUE_APP_API_URL}/images/${this.board.img}`
    },
    switchStatus() {

      const boardType = this.board.board_type;
      const boardStatus = this.board.status;

      if(!this.$store.state.boardType.includes(boardType.toLowerCase())) {
        return 'error'
      }

      let boardStatusEnum = {
        CREATED : boardType === 'USED' ? '판매중' : '나눔중',
        MODIFIED: boardType === 'USED' ? '판매중' : '나눔중',
        CLOSED : boardType === 'USED' ? '판매종료' : '나눔종료'
      }

      if(boardType === 'PRESENT') {
        let raffleClose = this.$moment(this.board.raffle_closed_at);
        let now = this.$moment()

        if(raffleClose.diff(now, 'second') <= 0) {
          boardStatusEnum.CREATED = '나눔종료'
        }
      }

      return boardStatusEnum[boardStatus];
    },
    switchStatusColor() {

      const boardType = this.board.board_type;
      const boardStatus = this.board.status;

      if(!this.$store.state.boardType.includes(boardType.toLowerCase())) {
        return 'error'
      }

      let boardStatusEnum = {
        CREATED : '#A5D6A7',
        MODIFIED : '#A5D6A7',
        CLOSED : '#EF9A9A',
      }

      if(boardType === 'PRESENT') {
        let raffleClose = this.$moment(this.board.raffle_closed_at);
        let now = this.$moment()

        if(raffleClose.diff(now, 'second') <= 0) {
          boardStatusEnum.CREATED = '#EF9A9A'
        }
      }
      return boardStatusEnum[boardStatus];
    },
    switchSubtitleByBoardType() {

      const boardType = this.board.board_type;

      if(!this.$store.state.boardType.includes(boardType.toLowerCase())) {
        return 'error'
      }

      let result = boardType === 'USED' 
        ? this.currencyFormatter(this.board.sell_price)
        :this.dateFormatter(this.board.raffle_closed_at);
      
      return result;
    },
    userNameSetter() {
      return '작성자 : ' + this.board.name
    }
  },
  methods: {
    currencyFormatter(price) {
      return Intl.NumberFormat('ko-kR', {style: 'currency', currency: 'KRW'}).format(price);
    },
    dateFormatter(date) {
      if(date === null || date === '') {
        return 'error';
      }
      
      return this.$moment(date).format('YYYY-MM-DD HH:mm:ss 까지')
    }
  }
}
</script>
