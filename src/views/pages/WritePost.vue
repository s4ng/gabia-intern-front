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
        <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                outlined
                v-model="date"
                label="래플 종료일"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col
          cols="3"
          v-if="boardType === 'present'">
          <v-menu
            ref="menu"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                outlined
                v-model="time"
                label="래플 종료시간"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              v-model="time"
              full-width
              @click:minute="$refs.menu.save(time)"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-container
        v-if="boardType !== 'notice'">
        <v-file-input 
          outlined
          label="이미지를 업로드하려면 클릭하세요"
          show-size
          v-model="imgFile"/>
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
    menu: false,
    menu2: false,
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
    imgFile: undefined,
    imgName:'',
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
      if(this.boardType !== 'used') {
        return;
      }

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
        img: '',

        //used
        price_suggestion:null,
        sell_price: null,
        used_goods_category: null,
        used_goods_status: null,
      }

      if(boardType === 'notice') {
        boardData.notice_category = this.detailBoardType;
      } 
      if(boardType === 'present') {

        boardData.present_goods_category = this.detailBoardType;
        boardData.present_goods_status = this.itemStatus;
        boardData.raffle_closed_at = this.dateTimeFormatter;
        boardData.img = this.imgName;
      } 
      if(boardType === 'used') {

        console.log(this.priceSuggestionChecker)
        boardData.price_suggestion = this.priceSuggestionChecker;
        boardData.sell_price = this.price;
        boardData.used_goods_category = this.detailBoardType;
        boardData.used_goods_status = this.itemStatus;
        boardData.img = this.imgName;
      }

      return boardData;
    },
    async savePost() {

      console.log(this.date + ' ' + this.time)
      // if(this.imgFile !== undefined) {
      //   await this.saveImage();
      // }
      // const APIURL = process.env.VUE_APP_API_URL;
      // const form = this.postForm(this.boardType);

      // try {
      //   await this.$axios.post(`${APIURL}/boards/${this.boardType}/posts`, form);
      //   this.redirect();
      // } catch(err) {
      //   alert(`글 쓰기 에러\n${err}`)
      // }
    },
    async saveImage() {
      let form = new FormData();
      form.append('file', this.imgFile)

      const APIURL = process.env.VUE_APP_API_URL;

      try {
        let saveImageResult= await this.$axios.post(`${APIURL}/images`, form, {
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        });

        this.imgName = saveImageResult.data;
      } catch(err) {
        alert(`이미지 업로드 실패\n${err}`)
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