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
              lazy-src="http://www.visioncyber.kr/rtimages/n_sub/no_detail_img.gif"
              max-height="200"
              max-width="200"
              v-bind:src="board.img"></v-img>
          </div>
        </v-col>
        <v-col cols="8">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline ml-3"
                v-text="board.title"></v-card-title>

              <v-spacer></v-spacer>
              
              <v-card-text
                v-html="switchSubtitleByBoardType" class="h3 ma-4"></v-card-text>
            </div>
          </div>
          <v-row>
            <v-col class="" cols="6">
              <v-card 
                :color="switchStatusColor"
                width="120"
                height="50"
                class="ml-2 pa-4">
                <v-row
                  class="ma-auto subtitle-2"
                  justify="center"
                  v-text="switchStatus">
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card
                width="120"
                height="50"
                class="mr-5 pa-4">
                <v-row
                  class="ma-auto subtitle-2"
                  justify="center"
                  v-text="board.name">
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
    switchStatus() {

      const boardType = this.board.board_type;
      const boardStatus = this.board.status;

      if(!this.$store.state.boardType.includes(boardType.toLowerCase())) {
        return 'error'
      }

      let boardStatusEnum = {
        CREATED : boardType === 'USED' ? '판매중' : '나눔중',
        CLOSED : boardType === 'USED' ? '판매종료' : '나눔종료'
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
        CLOSED : '#EF9A9A',
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
