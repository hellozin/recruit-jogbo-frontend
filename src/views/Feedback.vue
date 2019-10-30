<template>
    <div class="feedback">
      <b-card title="안내">
        <b-card-text>
          간단한 건의사항이나 버그를 알려주세요. 로그인하지 않아도 작성이 가능합니다.
        </b-card-text>
      </b-card>
      <vue-disqus shortname="recruit-jogbo" :identifier="pageId" :url="url"></vue-disqus>
    </div>
</template>

<script>
export default {
  data () {
    return {
      pageId: '',
      url: ''
    }
  },
  created: function () {
    this.pageId = location.pathname
    this.url = origin
  }
}
</script>
