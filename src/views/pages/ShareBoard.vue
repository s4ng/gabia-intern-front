<template>
  <v-container>
    <v-container
      class="d-flex justify-end ma-1 px-16">
      <base-raffle-dialog/>
      <base-write-post-button
        fromBoard="present">
      </base-write-post-button>
    </v-container>
    <v-card
      class="mx-auto"
      max-width="1000">
      <v-simple-table>
        <tbody>
          <tr>
            <td>나눔상태</td>
            <td>
              <v-checkbox
                v-model="statusCreated">
                 <span slot="label" class="black--text">나눔중</span>
              </v-checkbox>
            </td>
            <td>
              <v-checkbox
                v-model="statusClosed">
                 <span slot="label" class="black--text">나눔종료</span>
              </v-checkbox>
            </td>
          </tr>
          <tr>
            <td>상품상태</td>
            <td>
              <v-checkbox
                v-model="itemStatusNew">
                 <span slot="label" class="black--text">새 것</span>
              </v-checkbox>
            </td>
            <td>
              <v-checkbox
                v-model="itemStatusUsed">
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
    <div id="top"></div>
    <v-card
      max-width="1000"
      class="mx-auto">
      <v-container
        class="d-flex flex-wrap item-list">
        <base-item-card
          v-for="item in shareItems"
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
    shareItems: [],
    sort: 'time',
    searchKeyword: '',
    statusCreated: false,
    statusClosed: false,
    itemStatusNew: false,
    itemStatusUsed: false,
  }),
  computed: {
    searchChangeChecker() {
      // computed에서 각 변수에 담긴 값을 확인하고 어떤 값이든지 변경사항이 생길경우 리턴함.
      // 그리고 이 값을 watch 함수로 지켜보고 있다가 값이 변경되면 함수 실행
      const {
        page,
        sort,
        searchKeyword,
        statusCreated,
        statusClosed,
        itemStatusNew,
        itemStatusUsed
      } = this

      return {
        page,
        sort,
        searchKeyword,
        statusCreated,
        statusClosed,
        itemStatusNew,
        itemStatusUsed
      }
    }
  },
  watch: {
    async searchChangeChecker() {
      await this.getShareBoard();
    },
  },
  methods: {
    async getShareBoard() {
      const APIURL = `${process.env.VUE_APP_API_URL}/boards/present/posts?page=${this.page}`
      try {
        const { data } = await this.$axios.get(APIURL);
        this.shareItems = data.data.board_list;
        this.pageLength = data.data.page_count;
      } catch(err) {
        alert(`나눔 게시판 조회 오류\nerr: ${err}`);
      }
    },
    initSearch() {
      this.sort = 'time';
      this.searchKeyword = '';
      this.presentStatusCreated= false;
      this.presentStatusClosed= false;
      this.itemStatusNew= false;
      this.itemStatusUsed= false;
    },
    scrollToTop() {
      let el = document.getElementById('top');
      el.scrollIntoView(false);
    }
  },
  mounted() {
    this.getShareBoard();
  }
}
</script>
<style>
  .v-checkbox /deep/ label {
    color: black
  }
</style>