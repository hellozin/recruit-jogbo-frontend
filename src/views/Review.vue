<template>
  <div>
    <table class="table table-sm w-auto">
      <tr>
        <td class="font-weight-bold">작성자</td>
        <td v-if="review">{{ review.author.username }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold">기업 명</td>
        <td v-if="review">{{ review.companyName }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold">전형 종류</td>
        <td v-if="review"><span class="mr-2" v-for="type in review.recruitTypesEnum" :key="type.id">{{ type.value }}</span></td>
      </tr>
      <tr>
        <td class="font-weight-bold">마감일</td>
        <td v-if="review">{{ review.deadLine }}</td>
      </tr>
    </table>

    <p class="border p-3" style="white-space: pre-line;" v-if="review">{{ review.review }}</p>

    <button class="btn btn-primary mr-3" v-if="this.review && this.review.author.username === this.username" v-on:click="edit()">수정</button>
    <button class="btn btn-danger" v-if="this.review && this.review.author.username === this.username" v-on:click="deleteReview()">삭제</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      review: undefined,
      username: ''
    }
  },
  methods: {
    edit () {
      const reviewId = this.review.id
      this.$router.push(`/review/form/${reviewId}`)
    },
    deleteReview () {
      const reviewId = this.review.id
      this.$http.delete(`review/${reviewId}`)
        .then(() => {
          this.$bvModal.msgBoxOk('처리되었습니다.')
            .then(() => {
              this.$router.push('/review/list')
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
    const reviewId = this.$route.params.id
    this.$http.get(`review/${reviewId}`)
      .then(response => {
        this.review = response
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
