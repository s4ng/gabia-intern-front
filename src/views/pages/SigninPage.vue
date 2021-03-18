<template>
  <v-container>
    <v-card
      class="mx-auto my-12 pb-3"
      max-height="500"
      max-width="500">
      <v-container
        class="ma-5">
        <v-card-title class="ma-2 ml-4 mb-10">로그인</v-card-title>
        <v-text-field
          label="아이디"
          v-model="userId"
          outlined
          :rules="idRules"
          class="mt-2 mb-2 mr-4 pr-2"></v-text-field>
        <v-text-field
          label="비밀번호"
          v-model="password"
          @keyup.enter="signIn"
          :rules="pwRules"
          outlined
          class="mt-2 mb-2 mr-4 pr-2"
          type="password"></v-text-field>
        <v-container 
          class="d-flex">
          <v-btn
            class="mr-auto"
            color="success"
            @click="redirectToSignUp">회원가입</v-btn>
          <v-btn
            class="ml-auto"
            color="success"
            @click="signIn">로그인</v-btn>
        </v-container>
      </v-container>
      <!-- <v-divider></v-divider>
      <v-card
        @click="hiworksSignin"
        class="mx-16">
        <v-row
          class="mx-6">
          <v-col
            class="ma-auto"
            cols="8">
            <v-img
              contain
              class="mx-3"
              src="@/assets/hiworks_logo1.png">
            </v-img>
          </v-col>
          <v-col
            class="ma-auto"
            cols="4">
            <h1>로그인</h1>
          </v-col>
        </v-row>
      </v-card> -->
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    userId: '',
    password: '',
    idRules: [
      value => !!value || '필수 입력값입니다.',
      value => (value && value.length >= 4) || '4자 이상 입력해주세요.',
    ],
    pwRules: [
      value => !!value || '필수 입력값입니다.',
      value => (value && value.length >= 6) || '6자 이상 입력해주세요.',
    ]
  }),
  methods: {
    async signIn() {
      // 하드코딩 수정
      let userType = 'MANAGER';
      let userId = this.userId;
      let password = this.password;

      try {
        await this.$store.dispatch('SIGNIN', { userId, password, userType });
        this.redirect();
      } catch({ message }) {
        alert(`로그인 실패\n${message}`);
      }
    },
    redirect() {
      this.$router.push('/');
    },
    redirectToSignUp() {
      this.$router.push('/signup');
    },
    hiworksSignin() {
      const HIWORKSLOGIN = 'http://localhost:8081/users/oauth/login/hiworks';
      window.open(HIWORKSLOGIN, 'Hiworks로 로그인', 'width=500, height=700');
    }
  }
}
</script>