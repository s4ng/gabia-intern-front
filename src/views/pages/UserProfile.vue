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
                  class="mx-10 my-5 pr-16"
                >
                  <v-text-field
                    v-model="userName"
                    label="닉네임"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  class="text-center"
                  v-if="!passwordChange">
                  <v-btn
                    rounded
                    color="primary"
                    @click="passwordChange = true"
                    class="ma-auto">
                    비밀번호 수정
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  class="mx-10 my-5 pr-16"
                  v-if="passwordChange">
                  <v-text-field
                    v-model="oldPassword"
                    label="기존 비밀번호"
                    class="purple-input"
                  />
                  <v-text-field
                    v-model="oldPasswordCheck"
                    label="기존 비밀번호 확인"
                    class="purple-input"
                  />
                  <v-text-field
                    v-model="newPassword"
                    label="새로운 비밀번호"
                    class="my-5 purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="updateUser"
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
            <h4 class="display-2 font-weight-light mb-3 black--text" v-text="$store.state.userName + ' 님'">
            </h4>

            <h5 
              class="display-2 font-weight-light mb-3 black--text"
              v-text="pointToString">
            </h5>
            <div class="mt-10 d-flex flex-wrap">
              <div>알림 키워드</div>
            </div>
            <div
              class="d-flex flex-wrap mb-3">
              <div
                v-for="keyword in keywords"
                :key="keyword.alert_keyword_id">
                <v-badge 
                  class="my-2 mx-1 pointer" 
                  color="grey" 
                  overlap 
                  bordered 
                  @click.native="removeKeyword(keyword.alert_keyword_id)"
                  content="x">
                  <v-card
                    color="grey lighten-2"
                    class="pa-1 ma-1"
                    v-text="keyword.keyword">
                  </v-card>
                </v-badge>
              </div>
            </div>
            <v-snackbar
              v-model="snackbar"
              :timeout="timeout"
            >
              {{ snackbarText }}
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
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
    passwordChange: false,
    oldPassword: '',
    oldPasswordCheck: '',
    newPassword: '',
    keywords: [],
    snackbar: false,
    snackbarText: '삭제되었습니다',
    timeout: 1500,
  }),
  async created() {
    this.userId = await this.$store.state.userId;
    this.userName = await this.$store.state.userName;
    this.userType = await this.$store.state.userType;
    this.keywords = await this.$store.state.alertKeyword.data;
    await this.getUser();
    await this.getAlertKeyword();
  },
  computed: {
    pointToString() {
      return `활동 점수 : ${this.userPoint}` 
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
        this.userPoint = data.data.point;
      } catch(err) {
        console.log('user api error')
      }
    },
    async getAlertKeyword() {
      try {
        await this.$store.dispatch('GETALERTKEYWORD', this.$store.state.userId);
      } catch(err) {
        console.log(err)
      }
    },
    async updateUser() {
      let userData = {
        user_type: this.userType,
        user_id: this.userId,
        gabia_id: this.$store.state.gabiaId,
        name: this.userName,
      }

      const APIURL = process.env.VUE_APP_API_URL;

      if(this.passwordChange) {
        if(this.oldPassword !== this.oldPasswordCheck) {
          alert('비밀번호 확인을 확인해주세요.')
          return;
        }
        userData.origin_password = this.oldPassword;
        userData.new_password = this.newPassword;
      } 
      try {
        await this.$axios.put(`${APIURL}/users/${this.userType.toLowerCase()}`, userData);
        this.setUserData(userData)
      } catch(err) {
        console.log(err);
      }
      
      await this.getUser();
    },
    async setUserData(userData) {
      let data = {
        data: userData
      }
      try {
        await this.$store.dispatch('SETUSERDATA', data);
      } catch({ message }) {
        console.log(message)
      }
    },
    async removeKeyword(keywordId) {
      const APIURL = process.env.VUE_APP_API_URL;

      try {
        await this.$axios.delete(`${APIURL}/alert-keyword?id=${keywordId}`)
        await this.getAlertKeyword();
        this.snackbar = true;
        this.keywords = this.$store.state.alertKeyword.data;
      } catch(err) {
        console.log(err);
      }
    },
  }
}
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>