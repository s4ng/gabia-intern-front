<template>
  <v-container>
    <v-card
      max-width="1000"
      class="mx-auto py-6">
      <v-row
        max-width="1000"
        class="ma-auto">
        <h2 data-test="recent-used-title" class="ma-1 ml-5">최근 중고게시물</h2>
      </v-row>
      
      <v-container
        class="d-flex flex-wrap">
        <base-item-card
          v-for="item in usedItems"
          :key="item.id"
          :board="item"/>
      </v-container>
      <v-row
        max-width="1000"
        class="ma-auto">
        <h2 data-test="recent-share-title" class="ma-1 ml-5">최근 나눔게시물</h2>
      </v-row>
      <v-container
        class="d-flex flex-wrap">
        <base-item-card
          v-for="item in shareItems"
          :key="item.id"
          :board="item"/>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    page : 1,
    usedItems: [],
    shareItems: []
  }),
  methods: {
    async getUsedBoard() {
      const APIURL = `${process.env.VUE_APP_API_URL}/boards/used/posts?page=${this.page}`

      try {
        const { data } = await this.$axios.get(APIURL);
        this.usedItems = data.data.board_list.slice(0, 6);
      } catch(err) {
        alert(`중고 게시판 조회 오류\nerr: ${err}`);
      }
    },
    async getShareBoard() {
      const APIURL = `${process.env.VUE_APP_API_URL}/boards/present/posts?page=${this.page}`

      try {
        const { data } = await this.$axios.get(APIURL);
        this.shareItems = data.data.board_list.slice(0, 6);
      } catch(err) {
        alert(`나눔 게시판 조회 오류\nerr: ${err}`);
      }
    }
  },
  mounted() {
    this.getUsedBoard();
    this.getShareBoard();
  }
}
</script>