<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              회원 정보 수정
            </div>

            <div class="subtitle-1 font-weight-light">
              회원 정보 수정 페이지입니다.
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  class="ma-10 pr-16"
                >
                  <v-text-field
                    v-model="userName"
                    label="닉네임"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="ma-10 pr-16"
                >
                  <v-text-field
                    v-model="userName"
                    label="닉네임"
                    class="purple-input"
                  />
                  <v-text-field
                    v-model="userName"
                    label="닉네임"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                  >
                    정보 수정
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              회원 정보
            </div>
          </template>
          <v-card-text class="text-center">
            <h4 class="display-2 font-weight-light mb-3 black--text" v-text="userName + ' 님'">
            </h4>

            <h5 
              class="display-2 font-weight-light mb-3 black--text"
              v-text="pointToString">
            </h5>
            <v-btn
              color="error"
              rounded
              class="mr-0"
              @click="signOut"
            >
            Log out
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    userId: '',
    userName: '',
    userType: '',
    userPoint: null,
  }),
  async created() {
    this.userId = await this.$store.state.userId;
    this.userName = await this.$store.state.userName;
    this.userType = await this.$store.state.userType;
    await this.getUser();
  },
  computed: {
    pointToString() {
      return `래플 점수 : ${this.userPoint}` 
    }
  },
  methods: {
    signOut() {
      this.$store
        .dispatch('SIGNOUT')
        .then(() => this.redirect())
        .catch(({ message }) => (this.msg = message))
    },
    redirect() {
      this.$router.push('/')
    },
    async getUser() {
      const APIURL = process.env.VUE_APP_API_URL;

      try {
        const { data } = await this.$axios.get(`${APIURL}/users/${this.userType.toLowerCase()}?userId=${this.userId}`)
        console.log(data);
        this.userPoint = data.data.point;
      } catch(err) {
        console.log('user api error')
      }
    }
  }
}
</script>
