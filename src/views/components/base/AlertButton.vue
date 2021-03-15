<template>
  <v-menu
    bottom
    left
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-badge
          color="red"
          v-if="notifications.length !== 0"
          overlap
          bordered
        >
          <template 
            v-if="notifications.length !== 0"
            v-slot:badge>
            <span>{{notifications.length}}</span>
          </template>

          <v-icon>mdi-bell</v-icon>
        </v-badge>
        <v-icon
          v-if="notifications.length === 0">mdi-bell</v-icon>
      </v-btn>
    </template>

    <v-list
      :tile="false"
      nav
    >
      <div>
        <app-bar-item
          v-for="(n, i) in notifications"
          :key="`item-${i}`"
        >
          <v-list-item-title v-text="n" />
        </app-bar-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    userId : null,
    notifications: [],
  }),
  created() {
    this.userId = this.$store.state.userId;
  },
  mounted() {
    this.$ws.connect({}, function() {
      this.$ws.subscribe('sub/alert/' + this.userId, function(message) {
        console.log(message)
      })
    }, function(err) {
      alert('error', + err);
    })
  }
}
</script>