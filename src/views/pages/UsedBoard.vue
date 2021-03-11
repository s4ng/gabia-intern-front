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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    usedItems: [],
  }),
  methods: {
    async getUsedBoard() {
      const APIURL = `${process.env.VUE_APP_API_URL}/boards/used/posts?page=${this.page}`

      try {
        const { data } = await this.$axios.get(APIURL);
        this.usedItems = data.data;
      } catch(err) {
        alert(`중고 게시판 조회 오류\nerr: ${err}`);
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