<template>
  <div>
    <div id="jumbotron" class="rounded my-3 pt-5 px-5 py-3">
      <h1 class="">Recruit Jogbo</h1>
      <p class="">영남대학교 컴퓨터공학과</p>
      <hr>
      <p>취업 후기와 노하우를 공유하는 공간입니다.</p>
      <p class="text-danger">
        <font-awesome-icon icon="exclamation-circle"></font-awesome-icon>
        아래 공지사항을 꼭 확인해주세요!
      </p>
      <p class="text-danger">
        <font-awesome-icon icon="exclamation-circle"></font-awesome-icon>
        서버가 예고 없이 일시적으로 중단 될 수 있습니다.
      </p>
    </div>

    <b-card no-body>
      <b-tabs card>
        <b-tab title="주의사항" active>
          <vue-embed-gist gist-id="cd239aee7b4aca8f3ea7353194bec817" file="recruitjogbo-alert"></vue-embed-gist>
        </b-tab>
        <b-tab title="공지사항">
          <vue-embed-gist gist-id="5381eeafc7d38fd163bfbad778dd7f66" file="recruitjogbo-announcement"></vue-embed-gist>
        </b-tab>
        <b-tab title="업데이트 예정">
          <vue-embed-gist gist-id="a290de50a3021ac5a3f2dea82dd98abf" file="recruitjogbo-update"></vue-embed-gist>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import VueEmbedGist from 'vue-embed-gist'
 
export default {
  components: {
    VueEmbedGist
  }
}
</script>

<style scoped>
#jumbotron {
  background-color: #dfe6e9
}
</style>
