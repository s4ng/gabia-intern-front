<template>
  <v-container>
    <v-container
      class="d-flex justify-end ma-1 px-16">
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    shareItems: []
  }),
  methods: {
    async getShareBoard() {
      const APIURL = `${process.env.VUE_APP_API_URL}/boards/present/posts?page=${this.page}`

      try {
        const { data } = await this.$axios.get(APIURL);
        this.shareItems = data.data;
      } catch(err) {
        alert(`나눔 게시판 조회 오류\nerr: ${err}`);
      }
    }
  },
  mounted() {
    this.getShareBoard();
  }
}
</script>