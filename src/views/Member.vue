<template>
  <div>
    <h3 class="py-4 font-weight-bold">내 정보</h3>

    <b-card>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="아이디">
          <b-form-input v-model="form.username" required :disabled="!edit" placeholder="ID"></b-form-input>
        </b-form-group>

        <b-form-group label="이메일">
          <b-form-input v-model="form.email" required :disabled="!edit" placeholder="webmail@ynu.ac.kr"></b-form-input>
        </b-form-group>

        <b-form-group label="이메일 인증 여부">
          <p v-if="emailConfirmed"><strong class="text-success">완료</strong></p>
          <div v-if="!emailConfirmed">
            <p><strong class="text-danger">미완료</strong></p>
            <b-button type="button" variant="outline-primary" v-on:click="confirmMailResend">인증메일 재전송</b-button>
          </div>
        </b-form-group>

        <b-button class="mr-2" :disabled="edit" type="button" variant="primary" v-on:click="toggleEnableEdit">수정하기</b-button>
        <b-button class="mr-2"  v-if="edit" type="submit" variant="primary">저장</b-button>
        <b-button v-if="edit" type="button" variant="info" v-on:click="toggleEnableEdit">취소</b-button>
      </b-form>
    </b-card>

    <b-card class="my-4">
      <a v-b-toggle.collapse-1 variant="primary"><i class="fas fa-angle-down"></i><strong class="mx-2">비밀번호 변경</strong></a>
      <b-collapse id="collapse-1">
        <b-form @submit.prevent="onPasswordSubmit">
          <b-form-group label="원래 비밀번호">
            <b-form-input type="password" v-model="passwordEditForm.originPassword" required></b-form-input>
          </b-form-group>

          <b-form-group label="새 비밀번호">
            <b-form-input type="password" v-model="passwordEditForm.newPassword" required></b-form-input>
          </b-form-group>

          <b-form-group label="새 비밀번호 확인">
            <b-form-input type="password" v-model="confirmPassword" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">변경</b-button>
        </b-form>
      </b-collapse>
    </b-card>

    <b-card class="my-4">
      <p class="mr-2 text-danger"><i class="fas fa-exclamation-triangle"></i> 탈퇴 시 작성한 글도 함께 삭제됩니다.</p>
      <b-button type="button" variant="danger" v-on:click="deleteMember">탈퇴하기</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        email: ''
      },
      member: {
        username: '',
        email: ''
      },
      emailConfirmed: false,
      passwordEditForm: {
        originPassword: '',
        newPassword: ''
      },
      confirmPassword: '',
      edit: false
    }
  },
  methods: {
    toggleEnableEdit () {
      this.edit = !this.edit
    },
    onSubmit () {
      const originUsername = this.member.username
      const originEmail = this.member.email
      if (originUsername === this.form.username) {
        this.form.username = null
      }
      if (originEmail === this.form.email) {
        this.form.email = null
      }
      const formData = JSON.stringify(this.form)
      this.$http.patch(`member/me`, formData)
        .then(() => {
          this.$bvModal.msgBoxOk('처리되었습니다. 다시 로그인 해주세요.')
            .then(() => { this.$bus.$emit('logged', false) })
        }).catch(error => {
          this.edit = false
          this.$bvToast.toast(error.errorMessage, {
            title: '유저정보 수정 실패',
            variant: 'danger'
          })
        })
    },
    checkPasswordConfirm () {
      if (this.passwordEditForm.newPassword !== this.confirmPassword) {
        this.$bvToast.toast('확인 비밀번호가 일치하지 않습니다.', {
          title: '확인 비밀번호 불일치',
          variant: 'danger'
        })
        return false
      } else {
        return true
      }
    },
    onPasswordSubmit () {
      if (!this.checkPasswordConfirm()) {
        return
      }
      const formData = JSON.stringify(this.passwordEditForm)
      this.$http.patch(`member/me/password`, formData)
        .then(() => {
          this.$bus.$emit('logged', false)
        }).catch(error => {
          this.$bvToast.toast(error.errorMessage, {
            title: '비밀번호 수정 실패',
            variant: 'danger'
          })
        })
    },
    confirmMailResend () {
      const data = {
        confirmUrl: `${location.origin}/confirm`
      }
      this.$http.post(`member/confirm/send`, data)
        .then(() => {
          this.$bvModal.msgBoxOk(`인증 메일이 재발송되었습니다.\n인증을 위해 ${this.form.email}을 확인해주세요.`)
        }).catch(error => {
          this.$bvToast.toast(error.errorMessage, {
            title: '메일 전송 실패',
            variant: 'danger'
          })
        })
    },
    deleteMember () {
      this.$bvModal.msgBoxConfirm('탈퇴 하시겠습니까? 작성한 글이 모두 지워집니다.', {
        okVariant: 'danger',
        okTitle: '예',
        cancelTitle: '아니요'
      })
        .then(value => {
          if (value === true) {
            this.$http.delete(`member/me`)
              .then(() => {
                this.$bvModal.msgBoxOk(`탈퇴 요청이 완료되었습니다. 이용해주셔서 감사합니다.`)
                  .then(() => { this.$bus.$emit('logged', false) })
              }).catch(error => {
                  this.$bvToast.toast(error.errorMessage, {
                    title: '탈퇴 실패',
                    variant: 'danger'
                  })
              })
          }
        })
    }
  },
  created: function () {
    this.$http.get(`member/me`)
      .then(response => {
        this.member.username = response.username
        this.member.email = response.email
        this.form.username = response.username
        this.form.email = response.email
        this.emailConfirmed = response.emailConfirmed
      })
      .catch(error => {
        this.$bvToast.toast(error.errorMessage, {
          title: '유저정보 가져오기 실패',
          variant: 'danger'
        })
      })
  }
}
</script>
