<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />
    
    <v-icon>
      mdi-brightness-4
    </v-icon>

    <v-switch
      v-model="$vuetify.theme.dark"
      class="mr-4 px-2"
      color="secondary"
      hide-details
    />

    <base-alert-button></base-alert-button>
    <!-- 전체 검색용 text field, 추후 개발 -->
    <!-- <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 300px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-1" /> -->

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/profile"
    >
      <v-icon
        v-if="!$store.getters.isSignedIn">mdi-account</v-icon>
      <v-text-field
        v-else
        v-text="$store.state.userName">
      </v-text-field>
    </v-btn>
  </v-app-bar>
</template>

<script>
// Components
// import { VHover, VListItem } from 'vuetify/lib'

// Utilities
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DashboardCoreAppBar',

  components: {
    // AppBarItem: {
    //   render (h) {
    //     return h(VHover, {
    //       scopedSlots: {
    //         default: ({ hover }) => {
    //           return h(VListItem, {
    //             attrs: this.$attrs,
    //             class: {
    //               'black--text': !hover,
    //               'white--text secondary elevation-12': hover,
    //             },
    //             props: {
    //               activeClass: '',
    //               dark: hover,
    //               link: true,
    //               ...this.$attrs,
    //             },
    //           }, this.$slots.default)
    //         },
    //       },
    //     })
    //   },
    // },
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },


  computed: {
    ...mapState(['drawer']),
  },

  methods: {
    ...mapMutations({
      setDrawer: 'SET_DRAWER',
    }),
  },
}
</script>
