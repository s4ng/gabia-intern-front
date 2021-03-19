<template>
  <v-container>
    <v-card
      class="mx-auto my-6 pa-5"
      max-width="1000">
      <v-form
        v-model="valid">
        <v-row>
          <v-col
            cols="2">
            <v-select
              outlined
              required
              :rules="[v => !!v || '입력해주세요']"
              label="게시판 종류"
              v-model="selectBoardType"
              :items="boards">
            </v-select>
          </v-col>
          <v-col
            v-if="boardType === 'notice'"
            cols="4">
            <v-select
              :items="detailBoardTypeCheck"
              :rules="[v => !!v || '입력해주세요']"
              required
              outlined
              label="세부 카테고리."
              v-model="detailBoardType">
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
                  :rules="[v => !!v || '입력해주세요']"
                  required
                  label="세부 카테고리"
                  v-model="selectDetailBoardType"
                  :items="detailBoardTypeCheck">
                </v-select>
              </v-col>
              <v-col
                cols="6">
                <v-select
                  :rules="[v => !!v || '입력해주세요']"
                  required
                  outlined
                  label="제품 상태"
                  v-model="selectItemStatus"
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
              required
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
              :rules="[v => !!v || '입력해주세요']"
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
                  :rules="[v => !!v || '입력해주세요']"
                  required
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
              ref="menu2"
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
                  :rules="[v => !!v || '입력해주세요']"
                  required
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
                @click:minute="$refs.menu2.save(time)"
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
          :rules="[v => !!v || '입력해주세요']"
          required
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
            :disabled="!valid"
            color="success"
            @click="savePost">글쓰기</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    menu: false,
    menu2: false,
    boards: ['공지사항', '중고게시판', '나눔게시판'],
    itemStatusList: ['새 것', '사용감 있음'],
    boolSelects: ['예', '아니오'],
    title: '',
    description: '',
    priceSuggestion: '',
    price: 1000,
    date: null,
    time: null,
    selectBoardType: null,
    selectDetailBoardType: null,
    selectItemStatus: null,
    imgFile: undefined,
    imgName:'',
    priceRules: [
      value => !!value || '필수 입력값입니다.',
      value => (value && value >= 1000) || '1000원 이상 입력해주세요.',
    ]
  }),
  computed: {
    itemStatus() {
      let itemStatusData = {
        '새 것': 'NEW',
        '사용감 있음': 'USED'
      }
      if(this.selectItemStatus in itemStatusData) return itemStatusData[this.selectItemStatus];
      return '';
    },
    detailBoardType() {
      let detailBoardTypeData = {
        업데이트: 'UPDATE',
        일반: 'GENERAL',
        이벤트: 'EVENT',

        디지털: 'DIGITAL',
        책: 'BOOK',
        식료품: 'FOOD',
        '티켓/상품권': 'TICKET'
      }
      if(this.selectDetailBoardType in detailBoardTypeData) return detailBoardTypeData[this.selectDetailBoardType];
      return '';
    },
    boardType() {
      let boardTypeData = {
        공지사항: 'notice',
        중고게시판: 'used',
        나눔게시판: 'present'
      }
      return boardTypeData[this.selectBoardType]
    },
    detailBoardTypeCheck() {

      if(!this.$store.state.boardType.includes(this.boardType)) {
        return [];
      }

      const BOARDTYPE = {
        notice: [
          '업데이트', '일반', '이벤트'
        ],
        used: [
          '디지털', '책', '식료품', '티켓/상품권'
        ],
        present: [
          '디지털', '책', '식료품', '티켓/상품권'
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
      return this.$moment(`${this.date}T${this.time}:00`).format('YYYY-MM-DDTHH:mm:ss');
    },
  },
  methods: {
    detailBoardTypeError() {
      if(this.selectDetailBoardType === null) true
      
      return false;
    },
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

        boardData.price_suggestion = this.priceSuggestionChecker;
        boardData.sell_price = this.price;
        boardData.used_goods_category = this.detailBoardType;
        boardData.used_goods_status = this.itemStatus;
        boardData.img = this.imgName;
      }

      return boardData;
    },
    async savePost() {
      if(this.imgFile !== undefined) {
        await this.saveImage();
      }

      // if(this.)

      const APIURL = process.env.VUE_APP_API_URL;
      const form = this.postForm(this.boardType);

      try {
        await this.$axios.post(`${APIURL}/boards/${this.boardType}/posts`, form);
        this.redirect();
      } catch(err) {
        alert(`글 쓰기 에러\n${err}`)
      }
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
    let boardTypeData = {
      notice: '공지사항',
      present: '나눔게시판',
      used: '중고게시판'
    }
    this.selectBoardType = boardTypeData[this.$route.query.board];
  }
}
</script>