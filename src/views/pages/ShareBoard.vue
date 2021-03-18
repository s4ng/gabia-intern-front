<template>
  <v-container>
    <v-container
      class="d-flex justify-end ma-1 px-16">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="white"
            class="mr-auto">
            래플?
            <v-icon
              class="ml-1">
              mdi-help-circle
            </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">
            래플이란?
          </v-card-title>

            <v-card-text>
              <p>
                래플은 무료나눔을 효과적으로 할 수 있는 시스템입니다. 나눔 주최자가 미리 설정한 기한을 기점으로 신청자를 모집하고 당첨이 된 사람에게 물건을 나눠주는 방식입니다.
              </p>
              <p>
                만약 무료 나눔의 주최자가 되어 물건을 무료나눔 한 적이 있다면, 회원님의 래플 점수가 올라가고 다른 사람의 무료나눔에서 당첨될 확률이 올라갑니다!.
              </p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
                알겠습니다!
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <base-write-post-button
        fromBoard="present">
      </base-write-post-button>
    </v-container>
    <v-container
      class="d-flex flex-wrap">
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    pageLength: 1,
    shareItems: [],
    dialog: false,
  }),
  watch: {
    page: function() {
      this.getShareBoard();
      this.scrollToTop();
    }
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
    scrollToTop() {
      window.scrollTo(0, 0)
    }
  },
  mounted() {
    this.getShareBoard();
  }
}
</script>