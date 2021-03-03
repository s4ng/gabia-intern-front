<template>
  <v-container>
    <v-row
      max-width="1000"
      class="ma-auto">
      <h1 data-test="recent-used-title" class="ma-1 ml-5">최근 중고게시물</h1>
    </v-row>
    <v-container
      class="d-flex flex-wrap">
      <base-item-card
        v-for="item in usedItems.slice(0, 6)"
        :key="item.id"
        :board="item"/>
    </v-container>
    <v-row
      max-width="1000"
      class="ma-auto">
      <h1 data-test="recent-share-title" class="ma-1 ml-5">최근 나눔게시물</h1>
    </v-row>
    <v-container
      class="d-flex flex-wrap">
      <base-item-card
        v-for="item in shareItems.slice(0, 6)"
        :key="item.id"
        :board="item"/>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    // FIX : 추후 api 완성되면 axios로 data 요청 후 대체하도록 함 
    usedItems: [],
    shareItems: []
  }),
  // FIX axios 코드 넣어야함
  mounted() {
    // FIX : CORS 크로스 도메인 해제 후 수정
    // const apiUrl = process.env.VUE_APP_API_URL;
    // this.$axios
    //   .get(apiUrl + '/boards/share/posts?page=1')
    //   .then((res) => {
    //     this.shareItems = res.data;
    //   })
    //   .catch((e) =>  {
    //     console.error(e.message());
    //   })

    // this.$axios
    //   .get(apiUrl + '/boards/used/posts?page=1')
    //   .then((res) => {
    //     this.usedItem = red.data;
    //   })
    //   .catch((e) => {
    //     console.error(e.message());
    //   })
    this.usedItems = [{
      id: 1,
      type:"used",
      img:"https://kr.vuejs.org/images/logo.png",
      title:"testItem",
      price: "50000",
      status:"CREATE",
      seller:"dino"
    }, 
    {
      id: 2,
      type:"used",
      img:"https://kr.vuejs.org/images/logo.png",
      title:"testItem",
      price: 4500,
      status:"CREATE",
      seller:"dino"
    },
    {
      id: 3,
      type:"used",
      img:"https://kr.vuejs.org/images/logo.png",
      title:"testItem",
      price: "50000",
      status:"CREATE",
      seller:"dino"
    }, 
    {
      id: 4,
      type:"used",
      img:"https://kr.vuejs.org/images/logo.png",
      title:"testItem",
      price: 4500,
      status:"CREATE",
      seller:"dino"
    }]

    this.shareItems = [{
      type:"share",
      title:"testItem",
      deadline:'2021-03-23 13:13:05.34234',
      status:"CREATE",
      seller:"dino"
    }, 
    {
      id: 2,
      type:"share",
      img:"https://kr.vuejs.org/images/logo.png",
      title:"testItem",
      deadline:'2021-03-23 13:13:05.34234',
      status:"CREATE",
      seller:"dino"
    }]
  }
}
</script>