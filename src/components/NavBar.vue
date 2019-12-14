<template>
  <b-navbar toggleable="lg" type="light" variant="" class="p-3">
    <b-navbar-brand v-on:click="forward('/')">Recruit Jogbo</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-on:click="forward('/review/list')">취준 후기</b-nav-item>
        <b-nav-item v-on:click="forward('/tip/list')">취준 팁</b-nav-item>
        <b-nav-item v-on:click="forward('/feedback')">건의사항</b-nav-item>
        <b-nav-item v-on:click="forward('/contact')">Contact Us</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!logged" v-on:click="forward('/login')">로그인</b-nav-item>
        <b-nav-item-dropdown v-if="logged" right>
          <template v-slot:button-content>
            <a>{{ username }} 님 </a>
          </template>
          <b-dropdown-item v-if="logged" v-on:click="forward('/member')">내정보</b-dropdown-item>
          <b-dropdown-item v-if="logged" v-on:click="logout()">로그아웃</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {
      logged: false,
      username: 'GUEST'
    }
  },
  methods: {
    forward (link) {
      if (link !== this.$route.path) {
        this.$router.push(link)
      }
    },
    logout () {
      localStorage.removeItem('apiToken')
      localStorage.removeItem('username')
      this.username = 'User'
      this.logged = this.checkIsLogged()
      this.$router.push('/login')
    },
    checkIsLogged () {
      const apiToken = localStorage.getItem('apiToken')
      if (apiToken) {
        this.username = localStorage.getItem('username')
        return true
      } else {
        return false
      }
    }
  },
  created: function () {
    this.$bus.$on('logged', (isLogged) => {
      if (isLogged) {
        this.logged = this.checkIsLogged()
      } else {
        this.logout()
      }
    })
    this.logged = this.checkIsLogged()
  }
}
</script>
