<template>
  <div class="small-width-hide">
    <b-form @submit.prevent="onSubmit" class="border border-info rounded p-3 my-3">
      <b-row>
        <b-col cols="0" class="ml-3">
          <span><font-awesome-icon icon="search" size="2x"></font-awesome-icon></span>
        </b-col>

        <b-col>
          <b-form-input v-model="form.companyName" placeholder="기업명"></b-form-input>
        </b-col>

        <b-col>
          <b-form-select v-model="form.recruitTypes">
            <option :value="emptyString">전형종류</option>
            <option v-for="type in recruitTypes" :key="type.id" :value="type.key">{{ type.value }}</option>
          </b-form-select>
        </b-col>

        <b-col>
          <b-form-input v-model="form.authorName" placeholder="작성자"></b-form-input>
        </b-col>

        <b-col>
          <b-form-select v-model="form.sort" :options="sort"></b-form-select>
        </b-col>

        <b-col cols="auto">
          <b-button type="submit" variant="primary">조회</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        companyName: '',
        recruitTypes: '',
        authorName: '',
        sort: ''
      },
      recruitTypes: [],
      sort: [
        { value: '', text: '정렬', disabled: true },
        { value: 'createdAt,desc', text: '작성순' },
        { value: 'deadLine,asc', text: '날짜순' }
      ],
      emptyString: ''
    }
  },
  methods: {
    onSubmit () {
      const config = {
        params: this.form
      }
      this.$http.get(`/review/list`, config)
        .then(response => {
          this.$emit('onSearch', response)
        })
        .catch(error => {
          this.$bvToast.toast(error.errorMessage, {
            title: '후기목록 가져오기 실패',
            variant: 'danger'
          })
        })
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
  }
}
</script>

<style scoped>
@media (max-width: 780px) {
  .small-width-hide { display: none; }
}
</style>