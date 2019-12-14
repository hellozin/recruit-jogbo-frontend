<template>
  <div>
    <ReviewSearchBar @onSearch="onSearch" />

    <div class="border rounded-lg p-3" style="background-color: azure">
      <router-link to="/review/form" class="btn btn-outline-primary mb-3" role="button">새 후기 작성</router-link>

      <table class="table table-hover" style="table-layout:fixed">
        <thead class="thead-light">
          <tr>
            <th class="text-center" style="width: 20%" v-for="header in tableHeaders" :key="header.id">{{ header }}</th>
          </tr>
        </thead>

        <tbody>
          <tr class="text-center" v-for="review in reviewList" :key="review.id" v-on:click="showReview(review.id)">
            <td>{{ review.companyName }}</td>
            <td>{{ review.companyDetail }}</td>
            <td><span class="badge badge-info mx-1" v-for="type in review.recruitTypesEnum" :key="type.id">
              {{ type.value[0] }}
            </span></td>
            <td>{{ review.deadLine }}</td>
            <td>{{ review.author.username }}</td>
          </tr>
        </tbody>
      </table>

      <Pagination @onPaged="onPaged" url='/review/list' v-bind="page" />
    </div>
  </div>
</template>

<script>
import ReviewSearchBar from '@/components/ReviewSearchBar.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      reviewList: [],
      tableHeaders: ['기업명', '기업추가정보', '전형종류', '날짜', '작성자'],
      page: {
        totalPages: 0,
        currPage: 0,
        prevPage: 0,
        nextPage: 0
      },
      emptyString: ''
    }
  },
  components: {
    ReviewSearchBar, Pagination
  },
  methods: {
    showReview (reviewId) {
      this.$router.push(`/review/${reviewId}`)
    },
    setList (response) {
      this.reviewList = response.content
      this.page.totalPages = response.page.totalPages
      this.page.currPage = response.page.number
      this.page.prevPage = this.page.currPage > 0 ? this.page.currPage - 1 : null
      this.page.nextPage = this.page.currPage < this.page.totalPages - 1 ? this.page.currPage + 1 : null
    },
    getReviewList (param) {
      const config = {
        params: param
      }
      this.$http.get(`/review/list`, config)
        .then(response => {
          this.setList(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.errorMessage, {
            title: '후기목록 가져오기 실패',
            variant: 'danger'
          })
        })
    },
    onSearch (response) {
      this.setList(response)
    },
    onPaged (response) {
      this.setList(response)
    }
  },
  created: function () {
    this.$http.get('/recruit-types')
      .then(response => {
        this.recruitTypes = response
      })
      .catch(error => {
        this.$bvToast.toast(error.errorMessage, {
          title: '전형정보 가져오기 실패',
          variant: 'danger'
        })
      })
    this.getReviewList()
  }
}
</script>

<style scoped>
td {
  text-overflow:ellipsis; 
  overflow:hidden;
}
</style>