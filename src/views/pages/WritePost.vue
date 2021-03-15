<template>
  <v-container>
    <v-card
      class="mx-auto my-6 pa-5"
      max-width="1000">
      <v-row>
        <v-col
          cols="2">
          <v-select
            outlined
            label="게시판 종류"
            v-model="boardType"
            :items="boards">
          </v-select>
        </v-col>
        <v-col
          v-if="boardType === 'notice'"
          cols="4">
          <v-select
            outlined
            label="세부 카테고리."
            v-model="detailBoardType"
            :items="detailBoardTypeCheck">
          </v-select>
        </v-col>
        <v-col
          v-if="boardType !== 'notice' && $store.state.boardType.includes(boardType)"
          cols="4">
          <v-row>
            <v-col
              cols="6">
              <v-select
                outlined
                label="세부 카테고리"
                v-model="detailBoardType"
                :items="detailBoardTypeCheck">
              </v-select>
            </v-col>
            <v-col
              cols="6">
              <v-select
                outlined
                label="제품 상태"
                v-model="itemStatus"
                :items="itemStatusList">
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="4"
          v-if="boardType === 'used'">
          <v-text-field
            outlined
            type="number"
            :rules="priceRules"
            v-model="price"
            label="가격">
          </v-text-field>
        </v-col>
        <v-col
          cols="2"
          v-if="boardType === 'used'">
          <v-select
            outlined
            label="가격 추천"
            v-model="priceSuggestion"
            :items="boolSelects">
          </v-select>
        </v-col>
        <v-col
          cols="3"
          v-if="boardType === 'present'">
          <v-text-field
            outlined
            v-model="date"
            label="년월일 숫자 8자리">
          <!-- FIXME : 자동으로 시간 포맷 변경되도록 -->
          </v-text-field>
        </v-col>
        <v-col
          cols="3"
          v-if="boardType === 'present'">
          <v-text-field
            outlined
            v-model="time"
            label="시간분 숫자 4자리">
          <!-- FIXME : 자동으로 시간 포맷 변경되도록 -->

          </v-text-field>
        </v-col>
      </v-row>
      <v-container
        v-if="boardType !== 'notice'">
        <input class="mb-2" type="file"/>
      </v-container>
      <v-text-field
        outlined
        label="제목을 입력해주세요."
        v-model="title"></v-text-field>
      <v-divider></v-divider>
      <v-textarea
        outlined
        rows="15"
        label="글을 입력해주세요."
        v-model="description"></v-textarea>
      <v-container
        class="d-flex justify-end">
        <v-btn
          color="success"
          @click="savePost">글쓰기</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    // FIX : item-card 브랜치에 있는 전역 boards type으로 변경
    // 다음 이슈에서 중고 및 나눔 게시판 상세 설정
    boards: [],
    itemStatusList: ['NEW', 'USED'],
    boolSelects: ['예', '아니오'],
    title: '',
    description: '',
    priceSuggestion: '',
    price: 1000,
    date: '',
    time: '',
    boardType: '',
    detailBoardType: '',
    itemStatus: '',
    priceRules: [
      value => !!value || '필수 입력값입니다.',
      value => (value && value >= 1000) || '1000원 이상 입력해주세요.',
    ]
  }),
  computed: {
    detailBoardTypeCheck() {

      if(!this.$store.state.boardType.includes(this.boardType)) {
        return [];
      }

      const BOARDTYPE = {
        notice: [
          'UPDATE', 'GENERAL', 'EVENT'
        ],
        used: [
          'DIGITAL', 'BOOK', 'FOOD', 'TICKET'
        ],
        present: [
          'DIGITAL', 'BOOK', 'FOOD', 'TICKET'
        ]
      }

      return BOARDTYPE[this.boardType];
    },
    priceSuggestionChecker() {
      if(this.boardType !== 'USED') {
        return;
      }

      if(this.priceSuggestion !== '예' && this.priceSuggestion !== '아니오') {
        alert('가격 추천을 정확히 선택해주세요.')
      }

      console.log(this.priceSuggestion === '예' ? 'true' : 'false')
      return this.priceSuggestion === '예' ? true : false;
    },
    dateTimeFormatter() {
      return this.$moment(`${this.date}T${this.time}00`).format('YYYY-MM-DDTHH:mm:ss');
    },
  },
  methods: {
    postForm(boardType) {
      if(!this.$store.state.boardType.includes(boardType)) {
        return null;
      }

      const boardData = {
        board_type: this.boardType.toUpperCase(),
        user_type: this.$store.state.userType,
        user_id: this.$store.state.userId,
        status: 'CREATED',
        title: this.title,
        description: this.description,
        // notice
        notice_category: null,

        //present
        present_goods_category: null,
        present_goods_status: null,
        raffle_closed_at: null,

        //used
        price_suggestion:null,
        sell_price: null,
        used_goods_category: null,
        used_goods_status: null,
      }

      if(boardType === 'notice') {
        boardData.notice_category = this.detailBoardType;
      } else if(boardType === 'present') {

        boardData.present_goods_category = this.detailBoardType;
        boardData.present_goods_status = this.itemStatus;
        boardData.raffle_closed_at = this.dateTimeFormatter;
      } else {

        boardData.price_suggestion = this.priceSuggestionChecker;
        boardData.sell_price = this.price;
        boardData.used_goods_category = this.detailBoardType;
        boardData.used_goods_status = this.itemStatus;
      }

      return boardData;
    },
    async savePost() {
      const APIURL = process.env.VUE_APP_API_URL;
      const form = this.postForm(this.boardType);
      console.log(this.priceSuggestion);
      console.log(form);

      try {
        await this.$axios.post(`${APIURL}/boards/${this.boardType}/posts`, form);
        this.redirect();
      } catch(err) {
        alert(`글 쓰기 에러\n${err}`)
      }
    },
    redirect() {
      this.$router.push(`/${this.$route.query.board}`)
    },
    isNumeric(value) {
      return /^-?\d+$/.test(value);
    }
  },
  mounted() {
    this.boardType = this.$route.query.board;
    this.boards = this.$store.state.boardType;
  }
}
</script>