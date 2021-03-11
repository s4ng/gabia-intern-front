<template>
  <v-card
    class="my-0 pa-5">
    <v-row
      class="ma-auto">
      <v-col
        cols="3"
        class="ma-auto">
        <!-- FIXME : user name으로 변경-->
        <div>{{comment.name}}</div>
        <div>{{dateFormatter(comment.created_at)}}</div>
      </v-col>
      <v-col
        cols="9">
        <v-textarea
          readonly
          solo
          rows="3"
          v-text="comment.comment">
        </v-textarea>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ['comment'],
  methods: {
    dateFormatter(date) {
      if(date === null || date === '') {
        return 'error';
      }

      return this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>