<template>
  <div>
    <table class="table table-sm w-auto">
      <tr>
        <td class="font-weight-bold">작성자</td>
        <td v-if="tip">{{ tip.author.username }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold">제목</td>
        <td v-if="tip">{{ tip.title }}</td>
      </tr>
    </table>

    <p class="border p-3 lead" style="white-space: pre-line;" v-if="tip">{{ tip.content }}</p>

    <button class="btn btn-primary mr-3" v-if="this.tip && this.tip.author.username === this.username" v-on:click="edit()">수정</button>
    <button class="btn btn-danger" v-if="this.tip && this.tip.author.username === this.username" v-on:click="deleteTip()">삭제</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tip: undefined,
      username: ''
    }
  },
  methods: {
    edit () {
      const tipId = this.tip.id
      this.$router.push(`/tip/form/${tipId}`)
    },
    deleteTip () {
      const tipId = this.tip.id
      this.$http.delete(`tip/${tipId}`)
        .then(() => {
          this.$bvModal.msgBoxOk('처리되었습니다.')
            .then(() => {
              this.$router.push('/tip/list')
            })
        })
        .catch(error => {
          this.$bvToast.toast(error.errorMessage, {
            title: '포스트 삭제 실패',
            variant: 'danger'
          })
        })
    }
  },
  created: function () {
    const tipId = this.$route.params.id
    this.$http.get(`tip/${tipId}`)
      .then(response => {
        this.tip = response
      })
      .catch(error => {
        this.$bvToast.toast(error.errorMessage, {
          title: '포스트 저장 실패',
          variant: 'danger'
        })
      })
    const username = localStorage.getItem('username')
    if (username) {
      this.username = username
    }
  }
}
</script>
