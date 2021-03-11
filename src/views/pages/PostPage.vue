<template>
  <v-container>
    <v-card
      class="mx-auto my-6"
      max-width="1000">
      <v-container>
        <v-row
          class="px-5">
          <v-col
            v-if="board.board_type !== 'NOTICE'"
            cols="4">
            <v-img
              lazy-src="http://www.visioncyber.kr/rtimages/n_sub/no_detail_img.gif"></v-img>
          </v-col>
          <v-col
            cols="8">
            <v-card-title
              class="pt-5 mt-10 ml-3 headline"
              v-text="board.title"></v-card-title>
            <v-container
              class="d-flex">
              <v-card-subtitle
                v-text="board.name"></v-card-subtitle>
              <v-card-subtitle
                v-text="dateFormatter"></v-card-subtitle>
              <!-- <v-card-subtitle>
                FIXME API create date
              </v-card-subtitle> -->
            </v-container>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container
        class="pa-12">
        <v-textarea
          readonly
          v-html="descriptionFormatter"
          rows="15">
        </v-textarea>
      </v-container>
      <v-card-subtitle>댓글</v-card-subtitle>
      <v-divider></v-divider>
      <base-write-comment-card
        :boardId="boardId"
        :board="$route.query.board"
        v-on:reloadComments="getComments"></base-write-comment-card>
      <base-comment-card
        v-for="comment in comments"
        :key="comment.comment_id"
        :comment="comment"></base-comment-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    boardId: null,
  },
  data: () => ({
    board: {
      board_type: '',
      description: '',
      created_at: '',
    },
    comments: []
  }),
  computed: {
    dateFormatter() {
      return this.$moment(new Date(this.board.created_at)).format('YYYY-MM-DD HH:mm:ss')
    },
    descriptionFormatter() {
      return this.board.description.replace(/\n/g, '<br/>');
    }
  },
  methods: {
    async getPost() {

      const APIURL = `${process.env.VUE_APP_API_URL}/boards/${this.$route.query.board}`;

      try {
        const postData = await this.$axios.get(`${APIURL}/posts/${this.boardId}`)
        this.board = postData.data.data;
      } catch(err) {
        alert(`글 조회 실패\nerr: ${err}`)
      }
    },
    async getComments() {

      const APIURL = `${process.env.VUE_APP_API_URL}/boards/${this.$route.query.board}`;

      try {
        const commentData = await this.$axios.get(`${APIURL}/comments?boardId=${this.boardId}`)
        this.comments = commentData.data.data
      } catch(err) {
        alert(`댓글 조회 실패\nerr: ${err}`)
      }
    },
  },
  mounted() {
    this.getPost();
    this.getComments();
  }
}
</script>

<style>

</style>