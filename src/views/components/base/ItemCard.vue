<template>
    <v-card
      max-width="460"
      class="ma-3">
      <v-row>
        <v-col cols="4">
          <div class="ml-3 mt-7">
            <v-img
              lazy-src="http://www.visioncyber.kr/rtimages/n_sub/no_detail_img.gif"
              max-height="200"
              max-width="200"
              v-bind:src="img"></v-img>
          </div>
        </v-col>
        <v-col cols="8">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline ml-3"
                v-text="title"></v-card-title>

              <v-spacer></v-spacer>
              
              <v-card-text
                v-text="boardTypeCheck" class="h3 ma-4"></v-card-text>
            </div>
          </div>
          <v-row>
            <v-col class="" cols="6">
              <v-card 
                :color="switchStatusColor"
                width="120"
                height="50"
                class="ml-2 pa-4">
                <v-row
                  class="ma-auto subtitle-2"
                  justify="center"
                  v-text="switchStatus">
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card
                width="120"
                height="50"
                class="mr-5 pa-4">
                <v-row
                  class="ma-auto subtitle-2"
                  justify="center"
                  v-text="seller">
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
export default {
  props: ['type', 'img', 'title', 'price', 'deadline', 'status', 'seller'],
  data: () => ({
    statusColor : '',
    // 중고글이면 price, 나눔글이면 deadline
    subTitle : ''
  }),
  computed: {
    switchStatus() {

      if(this.type === 'used') {

        switch(this.status) {
        case 'CREATE':
          return '판매중';
        case 'CLOSE': 
          return '판매종료';
        case 'DELETE':
          return '삭제됨';
        default:
          return '';
        }
      } else if(this.type === 'share') {

        switch(this.status) {
        case 'CREATE':
          return '나눔중';
        case 'CLOSE': 
          return '나눔종료';
        case 'DELETE':
          return '삭제됨';
        default:
          return '';
        }
      }
    },
    switchStatusColor() {

      if(this.type === 'used') {

        switch(this.status) {
        case 'CREATE':
          return '#A5D6A7';
        case 'CLOSE': 
          return '#EF9A9A';
        case 'DELETE':
          return '#BDBDBD';
        default:
          return '';
        }
      } else if(this.type === 'share') {

        switch(this.status) {
        case 'CREATE':
          return '#A5D6A7';
        case 'CLOSE': 
          return '#EF9A9A';
        case 'DELETE':
          return '#BDBDBD';
        default:
          return '';
        }
      }
    },
    boardTypeCheck() {

      if(this.type === 'used') {
        return "가격 : " + this.price;
      } else if(this.type === 'share') {
        return this.deadline + " 까지";
      }
    }
  }
}
</script>