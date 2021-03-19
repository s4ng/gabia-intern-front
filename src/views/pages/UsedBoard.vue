<template>
  <v-container>
    <v-container
      class="d-flex justify-end ma-1 px-16">
      <base-write-post-button
        fromBoard="used">
      </base-write-post-button>
    </v-container>
    <v-card
      class="mx-auto"
      max-width="1000">
      <v-simple-table>
        <tbody>
          <tr>
            <td>판매상태</td>
            <td>
              <v-checkbox
                v-model="statusCreated">
                 <span slot="label" class="black--text">판매중</span>
              </v-checkbox>
            </td>
            <td>
              <v-checkbox
                v-model="statusClosed">
                 <span slot="label" class="black--text">판매종료</span>
              </v-checkbox>
            </td>
          </tr>
          <tr>
            <td>상품상태</td>
            <td>
              <v-checkbox
                v-model="usedGoodsStatusNew">
                 <span slot="label" class="black--text">새 것</span>
              </v-checkbox>
            </td>
            <td>
              <v-checkbox
                v-model="usedGoodsStatusUsed">
                 <span slot="label" class="black--text">사용감 있음</span>
              </v-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              검색어
            </td>
            <td
              colspan="2">
              <v-text-field 
                v-model="searchKeyword"
                label="검색어 입력"
                class="mx-3"></v-text-field>
            </td>
          </tr>
          <tr>
            <td>가격대 설정</td>
            <td>
              <v-text-field
                type="number"
                v-model="min"
                label="최소값 입력">
              </v-text-field>
            </td>
            <td>
              <v-text-field
                type="number"
                v-model="max"
                label="최대값 입력">
              </v-text-field>
            </td>
          </tr>
          <tr>
            <td>
              정렬
            </td>
            <td
              colspan="2">
              <div
                class="pl-10">
                <v-radio-group
                  v-model="sort"
                  row>
                  <v-radio
                    value="time">
                    <span slot="label" class="black--text">최신 순</span>
                  </v-radio>
                  <v-radio
                    value="lowPrice">
                    <span slot="label" class="black--text">낮은 가격 순</span>
                  </v-radio>
                  <v-radio
                    value="highPrice">
                    <span slot="label" class="black--text">높은 가격 순</span>
                  </v-radio>
                </v-radio-group>
              </div>
            </td>
          </tr>
          <tr>
            <td
              colspan="3">
              <v-btn
                class="ma-3 mx-6"
                color="indigo"
                @click="initSearch">
                초기화
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    <v-card
      max-width="1000"
      class="mx-auto py-2">
      <v-container
        class="d-flex flex-wrap">
        <base-item-card
          v-for="item in usedItems"
          :key="item.id"
          :board="item"/>
      </v-container>
      <v-divider class="my-1"/>
      <v-pagination
        v-model="page"
        :length="pageLength"
        :total-visible="10">
      </v-pagination>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    pageLength: 1,
    usedItems: [],
    min: null,
    max: null,
    // time, lowPrice, highPrice
    sort: 'time',
    searchKeyword: '',
    // CREATED, CLOSED
    statusCreated: false,
    statusClosed: false,
    // NEW. USED
    usedGoodsStatusNew: false,
    usedGoodsStatusUsed: false,
  }),
  computed:{
    searchChangeChecker() {
      // computed에서 각 변수에 담긴 값을 확인하고 어떤 값이든지 변경사항이 생길경우 리턴함.
      const {
        page,
        min,
        max,
        sort,
        searchKeyword,
        statusCreated,
        statusClosed,
        usedGoodsStatusNew,
        usedGoodsStatusUsed,
      } = this

      return {
        page,
        min,
        max,
        sort,
        searchKeyword,
        statusCreated,
        statusClosed,
        usedGoodsStatusNew,
        usedGoodsStatusUsed,
      }
    }
  },
  watch: {
    searchChangeChecker() {
      this.getUsedBoard();
    },
  },
  methods: {
    async getUsedBoard() {
      // const APIURL = `${process.env.VUE_APP_API_URL}/boards/used/posts/search`

      let params = {
        page: this.page
      };

      if(this.min === null && this.max !== null) {
        params.max = this.max;
      }

      if(this.min !== null && this.max === null) {
        params.min = this.min;
      }

      if(this.min !== null || this.max !== null) {
        if(this.min <= this.max) {
          params.min = this.min;
          params.max = this.max;
        }
      }

      if(this.searchKeyword !== '') {
        params.title = this.searchKeyword;
      }

      if(this.statusCreated ^ this.statusClosed) {
        params.status = this.statusCreated ? 'CREATED' : 'CLOSED'
      }

      if(this.usedGoodsStatusNew ^ this.usedGoodsStatusUsed) {
        params.usedGoodsStatus = this.usedGoodsStatus ? 'new' : 'used'
      }

      if(this.sort !== 'time') {
        params.sort = this.sort;
      }

      console.log(params)

      // try {
      //   const { data } = await this.$axios.get(APIURL, {params: params});
      //   this.usedItems = data.data.board_list;
      //   this.pageLength = data.data.page_count;
      // } catch(err) {
      //   alert(`중고 게시판 조회 오류\n${err}`);
      // }
    },
    initSearch() {
      this.sort = 'time';
      this.searchKeyword = '';
      this.usedStatusCreated= false;
      this.usedStatusClosed= false;
      this.itemStatusNew= false;
      this.itemStatusUsed= false;
      this.range = [1000, 200000];
    }
  },
  mounted() {
    this.getUsedBoard();
  }
}
</script>