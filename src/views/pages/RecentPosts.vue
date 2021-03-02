<template>
  <v-container>
    <v-row
      max-width="1000"
      class="ma-auto">
      <h1 class="ma-1 ml-5">최근 중고게시물</h1>
      <v-row class="d-flex flex-wrap ma-3">
        <base-item-card
          type="used"
          img="https://kr.vuejs.org/images/logo.png"
          title="testItem"
          price="50000"
          status="CREATE"
          seller="dino">
        </base-item-card>
        <base-item-card
          type="used"
          img="https://kr.vuejs.org/images/logo.png"
          title="testItem"
          price="50000"
          status="CLOSE"
          seller="dino">
        </base-item-card>
        <base-item-card
          type="used"
          img="https://kr.vuejs.org/images/logo.png"
          title="testItem"
          price="50000"
          status="DELETE"
          seller="dino">
        </base-item-card>
        <base-item-card
          type="used"
          img="https://kr.vuejs.org/images/logo.png"
          title="testItem"
          price="50000"
          status="CREATE"
          seller="dino">
        </base-item-card>
      </v-row>
      <h1 class="ml-5">최근 나눔게시물</h1>
      <v-row class="d-flex flex-wrap ma-3">
        <base-item-card
          type="share"
          img="https://kr.vuejs.org/images/logo.png"
          title="testItem"
          deadline="2021-03-23 13:13:05.34234"
          status="CREATE"
          seller="dino">
        </base-item-card>
        <base-item-card
          type="share"
          img="https://kr.vuejs.org/images/logo.png"
          title="testItem"
          deadline="21년 3월 1일 15:30:00"
          status="CLOSE"
          seller="dino">
        </base-item-card>
        <base-item-card
          type="share"
          img="https://kr.vuejs.org/images/logo.png"
          title="testItem"
          deadline="21년 3월 1일 15:30:00"
          status="DELETE"
          seller="dino">
        </base-item-card>
        <base-item-card
          type="share"
          img="https://kr.vuejs.org/images/logo.png"
          title="testItem"
          deadline="21년 3월 1일 15:30:00"
          status="CREATE"
          seller="dino">
        </base-item-card>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>