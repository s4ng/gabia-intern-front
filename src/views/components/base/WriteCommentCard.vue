<template>
  <v-card
    class="my-0 pa-3 px-10">
    <v-row>
      <v-col
        cols="10"
        class="d-flex align-center">
        <v-textarea
          v-if="$store.state.userId !== ''"
          outlined
          v-model="comment"
          class="mt-5"
          rows="2"></v-textarea>
        <v-card-subtitle
          v-else>
          댓글을 남기려면 로그인 해주세요.
        </v-card-subtitle>
      </v-col>
      <v-col
        cols="2"
        class="d-flex align-center">
        <v-btn
          color="success"
          v-if="$store.state.userId !== ''"
          @click="saveComment"
          class="">댓글 남기기</v-btn>
        <router-link
          v-else
          :to="{name: '로그인'}">
          <v-btn>로그인</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ['boardId', 'board'],
  data: () => ({
    comment: '',
  }),
  methods: {
    async saveCommentRequest(commentData) {
      try {
        const APIURL = `${process.env.VUE_APP_API_URL}/boards/${this.board}/comments`

        await this.$axios.post(APIURL, commentData);
        this.$emit('reloadComments');
        this.comment = '';
      } catch(err) {
        alert(`댓글 저장 실패\nerr: ${err}`);
      }
    },
    saveComment() {

      const commentData = {
        user_id: this.$store.state.userId,
        board_id: this.boardId,
        comment: this.comment,
        board_type: this.board.toUpperCase()
      }
      
      this.saveCommentRequest(commentData);
    }
  }
}
</script>