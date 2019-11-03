<template>
  <div>
    <div class="border rounded-lg p-3" style="background-color: azure">
      <router-link to="/tip/form" class="btn btn-outline-primary mb-3" role="button">새 팁 작성</router-link>

      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th class="text-center" v-for="header in tableHeaders" :key="header.id">{{ header }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="tip in tipList" :key="tip.id" v-on:click="showTip(tip.id)">
            <td style="width: 30%" class="text-center">{{ tip.author.username }}</td>
            <td class="col-1">{{ tip.title }}</td>
          </tr>
        </tbody>
      </table>

      <Pagination @onPaged="onPaged" url='/tip/list' v-bind="page" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      tipList: [],
      tableHeaders: ['작성자', '제목'],
      page: {
        totalPages: 0,
        currPage: 0,
        prevPage: 0,
        nextPage: 0
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    showTip (tipId) {
      this.$router.push(`/tip/${tipId}`)
    },
    setList (response) {
      this.tipList = response.content
      this.page.totalPages = response.page.totalPages
      this.page.currPage = response.page.number
      this.page.prevPage = this.page.currPage > 0 ? this.page.currPage - 1 : null
      this.page.nextPage = this.page.currPage < this.page.totalPages - 1 ? this.page.currPage + 1 : null
    },
    getTipList (param) {
      const config = {
        params: param
      }
      this.$http.get(`/tip/list`, config)
        .then(response => {
          this.setList(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.errorMessage, {
            title: '팁목록 가져오기 실패',
            variant: 'danger'
          })
        })
    },
    onPaged (response) {
      this.setList(response)
    }
  },
  created: function () {
    this.getTipList()
  }
}
</script>