<template>
  <v-container>
    <v-card
      class="mx-auto my-6"
      max-width="1000">
      <v-container>
        <v-row
          class="px-5">
          <v-col
            v-if="board.board_type !== 'NOTICE'"
            cols="4">
            <v-img
              lazy-src="http://www.visioncyber.kr/rtimages/n_sub/no_detail_img.gif"></v-img>
          </v-col>
          <v-col
            cols="8">
            <v-card-title
              class="pt-5 mt-10 ml-3 headline"
              v-text="board.title"></v-card-title>
            <v-container
              class="d-flex flex-wrap">
              <v-card-subtitle
                v-text="board.name"/>
              <v-card-subtitle
                v-text="dateFormatter(board.created_at)"/>
              <p
                class="ma-auto"
                style="font-size: 20px;"
                v-if="board.board_type === 'USED'"
                v-text="currencyFormatter"/>
              <v-btn
                v-if="board.board_type === 'PRESENT' && isJoinedRaffle === false"
                color="#1976D2"
                @click="joinRaffle"
                class="ma-auto">나눔받기 참여</v-btn>
              <v-btn
                v-if="board.board_type === 'PRESENT' && isJoinedRaffle === true"
                color="#EC407A"
                @click="cancelRaffle"
                class="ma-auto">나눔받기 취소</v-btn>
            </v-container>
            <v-row
              class="pl-2">
              <v-container
                v-if="board.board_type === 'USED'"
                class="d-flex flex-wrap">
                <v-card-subtitle>가격제시 : </v-card-subtitle>
                <v-card-subtitle v-text="priceSuggestionFormatter"/>
                <v-btn
                  v-if="board.price_suggestion"
                  color="#1976D2"
                  class="ma-auto">가격제시</v-btn>
                <v-btn
                  color="#1976D2"
                  @click="chattingRequest"
                  class="ma-auto">채팅으로 거래하기</v-btn>
              </v-container>
              <v-container
                v-if="board.board_type === 'PRESENT'"
                class="d-flex flex-wrap">
                <v-card-subtitle
                  v-text="leftTime"/>
                <p
                  class="ma-auto"
                  style="font-size: 20px;"
                  v-if="board.board_type === 'PRESENT'"
                  v-text="raffleParticipantsToText"/>
              </v-container>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container
        class="pa-12">
        <v-textarea
          readonly
          v-html="descriptionFormatter"
          rows="15">
        </v-textarea>
      </v-container>
      <v-card-subtitle>댓글</v-card-subtitle>
      <v-divider></v-divider>
      <base-write-comment-card
        :boardId="boardId"
        :board="$route.query.board"
        v-on:reloadComments="getComments"></base-write-comment-card>
      <base-comment-card
        v-for="comment in comments"
        :key="comment.comment_id"
        :comment="comment"></base-comment-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    boardId: null,
  },
  data: () => ({
    board: {
      board_type: '',
      description: '',
    },
    leftTimeInterval: '',
    leftTime: '',
    comments: [],
    isJoinedRaffle: false,
    raffleParticipants : 50,
  }),
  computed: {
    descriptionFormatter() {
      return this.board.description.replace(/\n/g, '<br/>');
    },
    priceSuggestionFormatter() {
      return this.board.price_suggestion ? '받음' : '안받음';
    },
    currencyFormatter() {
      return Intl.NumberFormat('ko-kR', {style: 'currency', currency: 'KRW'}).format(this.board.sell_price);
    },
    raffleParticipantsToText() {
      return this.raffleParticipants + ' 명';
    }
  },
  methods: {
    async chattingRequest() {
      if(confirm('거래를 신청할까요?')) {
        try {
          if(!this.$store.state.isChattingListShow) {
            await this.$store.dispatch('CHATTINGLISTSHOW');
          }
        } catch(err) {
          alert(`채팅 리스트 조회 실패\nerr:${err}`);
        }
      }
    },
    dateFormatter(date) {
      if(date === null || date === '') {
        return 'error';
      }

      return this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    async getPost() {
      // FIXME : 재택 인터넷 이슈 / 아래 코드로 교체
      // this.board = {
      //   board_id: 1,
      //   board_type: 'PRESENT',
      //   name: 'DINO',
      //   title: 'test',
      //   description: 'test',
      //   raffle_closed_at: '2021-03-14T17:30:00',
      //   created_at: '2021-03-12T18:40:30',

      // }
      const APIURL = `${process.env.VUE_APP_API_URL}/boards/${this.$route.query.board}`;

      try {
        const postData = await this.$axios.get(`${APIURL}/posts/${this.boardId}`)
        this.board = postData.data.data;
        console.log(this.board)
      } catch(err) {
        alert(`글 조회 실패\n${err}`)
      }
    },
    async getComments() {

      const APIURL = `${process.env.VUE_APP_API_URL}/boards/${this.$route.query.board}`;

      try {
        const commentData = await this.$axios.get(`${APIURL}/comments?boardId=${this.boardId}`)
        this.comments = commentData.data.data
      } catch(err) {
        alert(`댓글 조회 실패\n${err}`)
      }
    },
    leftTimeSetter() {
      let raffleClose = this.$moment(this.board.raffle_closed_at);
      let now = this.$moment()

      if(raffleClose.diff(now, 'second') <= 0) {
        this.leftTime = '끝났음'
        return;
      }

      let leftTimeSecond = raffleClose.diff(now)
      this.leftTime = `${this.$moment.duration(leftTimeSecond).locale('ko').humanize()} 남았음`;
    },
    joinRaffle() {
      if(this.leftTime === '끝났음') {
        alert('신청이 마감되었습니다.');
        return;
      }
      // FIXME : API 연결로 수정
      this.isJoinedRaffle = true;
    },
    cancelRaffle() {
      if(this.leftTime === '끝났음') {
        alert('신청이 마감되었습니다.');
        return;
      }
      this.isJoinedRaffle = false;
    }
  },
  async mounted() {
    await this.getPost();
    this.getComments();

    // 컴포넌트가 Mount 되고 나서 지연없이 바로 한 번 실행
    this.leftTimeSetter();
    // 그 후 Interval
    let leftTimeInterval = setInterval(() => {
      if(this.leftTime === '끝났음') {
        clearInterval(leftTimeInterval);
      }
      this.leftTimeSetter();
    }, 1000)
  }
}
</script>