<template>
  <div class="login">
    <div class="border shadow mx-auto p-5">
      <h3 class="text-center mb-3">Recruit Jogbo</h3>

      <b-form class="w-75 mx-auto" @submit.prevent="onSubmit">
        <b-form-group>
          <b-form-input v-model="form.principal" required placeholder="ID"></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-form-input v-model="form.credentials" required type="password" placeholder="Password"></b-form-input>
        </b-form-group>

        <b-button class="w-100 my-3" type="submit" variant="primary">로그인</b-button>

        <router-link to="/join" class="btn btn-outline-info w-100">회원가입</router-link>
      </b-form>

      <div class="p-3">
        <p class="text-center mb-0">Contact Us</p>
        <p class="text-center blockquote-footer">recruitjogbo@gmail.com</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        principal: '',
        credentials: ''
      }
    }
  },
  methods: {
    onSubmit () {
      const formData = JSON.stringify(this.form)
      this.$http.post(`/auth`, formData)
        .then(response => {
          const apiToken = response.apiToken
          const username = response.member.username
          localStorage.setItem('apiToken', apiToken)
          localStorage.setItem('username', username)
          this.$bus.$emit('logged', true)
          this.$router.push('/')
        }).catch(error => {
          this.$bvToast.toast(error.errorMessage, {
            title: '로그인 실패',
            variant: 'danger'
          })
        })
    }
  },
  created: function () {
    const error = this.$route.query.error
    if (error) {
      if (error === 'unauth') {
        this.$bvToast.toast('인증 정보가 없거나 만료되었습니다.', {
            title: '로그인 실패',
            variant: 'danger'
          })
      }
    }
  }
}
</script>

<style scoped>
.login {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
</style>
