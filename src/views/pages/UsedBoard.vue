<template>
  <v-container>
    <v-container
      class="d-flex justify-end ma-1 px-16">
      <base-write-post-button
        fromBoard="used">
      </base-write-post-button>
    </v-container>
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    pageLength: 1,
    usedItems: [],
  }),
  watch: {
    page: function() {
      this.getUsedBoard();
      this.$vuetify.goTo('#header');
    }
  },
  methods: {
    async getUsedBoard() {
      const APIURL = `${process.env.VUE_APP_API_URL}/boards/used/posts?page=${this.page}`

      try {
        const { data } = await this.$axios.get(APIURL);
        this.usedItems = data.data.board_list;
        this.pageLength = data.data.page_count;
      } catch(err) {
        alert(`중고 게시판 조회 오류\n${err}`);
      }
    }
  },
  mounted() {
    this.getUsedBoard();
  }
}
</script>

<style>

</style>