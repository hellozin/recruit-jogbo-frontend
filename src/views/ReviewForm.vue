<template>
  <div>
    <h3 class="pt-4 font-weight-bold">후기 작성</h3>
    <b-form @submit.prevent="onSubmit" v-if="show" autocomplete="off">

      <a v-b-toggle.collapse-1 class="text-primary"><i class="fas fa-angle-down"></i> 설명</a>
      <b-collapse id="collapse-1" class="mt-0">
        <b-card>
          <table>
            <tr v-for="guide in guides" :key="guide.id">
              <td class="pr-3">{{ guide.name }}</td><td class="text-muted">{{ guide.description }}</td>
            </tr>
          </table>
        </b-card>
      </b-collapse>

      <b-row>
        <b-col cols="3">
          <b-form-group label="기업명">
            <b-form-input v-model="form.companyName" required placeholder="ex) 카카오"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="추가정보">
            <b-form-input v-model="form.companyDetail" placeholder="ex) 플랫폼 개발"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="날짜">
            <b-form-input v-model="form.deadLine" required type="date"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group label="전형 종류">
        <b-form-checkbox-group v-model="form.recruitTypes">
          <b-form-checkbox v-for="type in recruitTypes" :key="type.id" :value="type.key">{{ type.value }}</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="후기">
        <b-form-textarea v-model="form.review" rows="3" max-rows="15" placeholder="여기에 후기를 입력해 주세요."></b-form-textarea>
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
        companyName: '',
        companyDetail: '',
        deadLine: new Date().toISOString().slice(0, 10),
        recruitTypes: [],
        review: ''
      },
      recruitTypes: [],
      guides: [
        { name: '기업명', description: '카카오, 삼성전자, 한국전력공사 등 가장 보편적인 이름을 적어주세요.' },
        { name: '추가정보', description: '지원 부서명, 채용 공지 이름 등 추가적인 내용을 적어주세요.' },
        { name: '날짜', description: '전형이 시작되는 날짜를 입력해 주세요. (서류 마감일, 코딩테스트 날짜, 시험 날짜 등)' },
        { name: '전형 종류', description: '후기에 포함된 전형을 모두 체크해 주세요.' }
      ],
      isNew: true,
      show: true
    }
  },
  methods: {
    onSubmit () {
      const formData = JSON.stringify(this.form)
      const reviewId = this.$route.params.id

      this.$http({
        method: this.isNew ? 'POST' : 'PUT',
        url: this.isNew ? `review` : `review/${reviewId}`,
        data: formData
      })
        .then(() => {
          this.$bvModal.msgBoxOk('저장되었습니다.')
            .then(() => {
              this.$router.push('/review/list')
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

    const reviewId = this.$route.params.id
    if (reviewId) {
      this.isNew = false
      this.$http.get(`review/${reviewId}`)
        .then(review => {
          this.form.companyName = review.companyName
          this.form.companyDetail = review.companyDetail
          this.form.deadLine = review.deadLine
          this.form.recruitTypes = review.recruitTypesEnum.map(type => type.key)
          this.form.review = review.review
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
