<template>
  <nav aria-label="Page navigation example" v-if="pagedList">
    <ul class="pagination justify-content-center">
      <li class="page-item" v-if="currPage > 0" v-on:click="toPage(prevPage)">
        <a class="page-link">이전</a>
      </li>

      <li class="page-item" v-for="page in totalPages" :key="page.id"  :class="{ active: page - 1 === currPage }">
        <a class="page-link" v-on:click="toPage(page - 1)">{{ page }}</a>
      </li>

      <li class="page-item" v-if="nextPage" v-on:click="toPage(nextPage)">
        <a class="page-link">다음</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      pagedList: [],
    }
  },
  props: {
    url: String,
    totalPages: Number, 
    currPage: Number,
    prevPage: Number,
    nextPage: Number
  },
  methods: {
    getPagedList (param) {
      const config = {
        params: param
      }
      this.$http.get(`${this.url}`, config)
        .then(response => {
          this.$emit('onPaged', response)
        })
        .catch(error => {
          this.$bvToast.toast(error.errorMessage, {
            title: '페이지 이동 실패',
            variant: 'danger'
          })
        })
    },
    toPage (page) {
      const param = { page: page }
      this.getPagedList(param)
    },
    toPrevPage () {
      const param = { page: this.prevPage }
      this.getPagedList(param)
    },
    toNextPage () {
      const param = { page: this.nextPage }
      this.getPagedList(param)
    }
  }
}
</script>
