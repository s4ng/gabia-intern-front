<template>
  <router-link
    :to="{name: '글쓰기', query: {board: fromBoard}}">
    <v-btn 
      color="success"
      >글쓰기</v-btn>
  </router-link>
</template>

<script>
export default {
  props: ['fromBoard']
}
</script>