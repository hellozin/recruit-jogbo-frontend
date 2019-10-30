<template>
  <div>
    <div id="jumbotron" class="rounded my-3 pt-5 px-5 py-3">
      <h1 class="display-3">Recruit Jogbo</h1>
      <p class="lead">영남대학교 컴퓨터공학과</p>
      <hr>
      <p>취업 후기와 노하우를 공유하는 공간입니다.</p>
      <p class="text-danger">
        <font-awesome-icon icon="exclamation-circle"></font-awesome-icon>
        조금 더 솔직하고 자세한 후기를 위해 모든 자료는 외부 업로드, 유출을 자제해 주시기 바랍니다.
      </p>
      <p class="text-danger">
        <font-awesome-icon icon="exclamation-circle"></font-awesome-icon>
        아직은 테스트 기간입니다. 서버가 예고 없이 일시적으로 중단 될 수 있습니다.
      </p>
    </div>

    <b-card no-body>
      <b-tabs card>
        <b-tab title="공지사항" active>
          <b-card-text style="white-space: pre-line"><p>공지사항입니다.</p></b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<style scoped>
#jumbotron {
  background-color: #dfe6e9
}
</style>
