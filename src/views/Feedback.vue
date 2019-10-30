<template>
    <div class="feedback">
      <b-card title="안내">
        <b-card-text>
          간단한 건의사항이나 버그를 알려주세요.
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
    console.log(this.pageId)
    console.log(this.url)
  }
}
</script>
