<template>
  <div>
    <h3 class="pt-4 font-weight-bold">팁 작성</h3>
    <b-form @submit.prevent="onSubmit" v-if="show" autocomplete="off">

      <b-form-group label="제목">
        <b-form-input v-model="form.title" rows="1" max-rows="3" placeholder="여기에 제목을 입력해 주세요."></b-form-input>
      </b-form-group>

      <b-form-group label="내용">
        <b-form-textarea v-model="form.content" rows="10" max-rows="20" placeholder="여기에 내용을 입력해 주세요."></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">저장</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
      },
      isNew: true,
      show: true
    }
  },
  methods: {
    onSubmit () {
      const formData = JSON.stringify(this.form)
      const tipId = this.$route.params.id

      this.$http({
        method: this.isNew ? 'POST' : 'PUT',
        url: this.isNew ? `tip` : `tip/${tipId}`,
        data: formData
      })
        .then(() => {
          this.$bvModal.msgBoxOk('저장되었습니다.')
            .then(() => {
              this.$router.push('/tip/list')
            })
        })
        .catch(error => {
          const errors = error.errorMessage.split('\n')
          for (var i in errors) {
            this.$bvToast.toast(errors[i], {
              title: '포스트 저장 실패',
              variant: 'danger'
            })
          }
        })
    }
  },
  created: function () {
    this.$http.get('/recruit-types')
      .then(response => {
        this.recruitTypes = response
      }).catch(error => {
        this.$bvToast.toast(error.errorMessage, {
          title: '전형 정보 로드 실패',
          variant: 'danger'
        })
    })

    const tipId = this.$route.params.id
    if (tipId) {
      this.isNew = false
      this.$http.get(`tip/${tipId}`)
        .then(tip => {
          this.form.title = tip.title
          this.form.content = tip.content
        })
        .catch(error => {
          this.$bvToast.toast(error.response, {
            title: '후기 정보 가져오기 실패',
            variant: 'danger'
          })
        })
    }
  }
}
</script>
