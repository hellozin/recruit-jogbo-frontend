<template>
  <b-card bg-variant="light">
    <b-card-text style="white-space: pre-line">
      <h3 class="display-4 py-3">Contact Us</h3>

      <b-card class="my-2">
        <h3><font-awesome-icon icon="envelope"></font-awesome-icon> Mail</h3>
        <hr>
        <p>paul26375@gmail.com</p>
      </b-card>

      <b-card class="my-2">
        <h3><font-awesome-icon :icon="['fab','github-square']"></font-awesome-icon> Github</h3>
        <hr>
        <table class="table table-sm table-borderless w-auto">
          <tr>
            <td class="font-weight-bold">API Server</td>
            <td><b-link href="https://github.com/hellozin/recruit-jogbo">https://github.com/hellozin/recruit-jogbo</b-link></td>
          </tr>
          <tr>
            <td class="font-weight-bold">Frontend Server</td>
            <td><b-link href="https://github.com/hellozin/recruit-jogbo-frontend">https://github.com/hellozin/recruit-jogbo-frontend</b-link></td>
          </tr>
        </table>
        <p>건의사항, 버그 Issue, Pull Request 환영</p>
      </b-card>

      <b-card class="my-2">
        <h3><font-awesome-icon icon="server"></font-awesome-icon> 데모 서버</h3>
        <hr>
        <p>링크 : 준비중</p>
      </b-card>

      <b-card class="my-2">
        <h3><font-awesome-icon :icon="['fab','slack']"></font-awesome-icon> Slack</h3>
        <hr>
        <p>새 글 알림 및 페이지에 대한 이야기나 간단한 질문을 위한 공간 (새 글 알림 준비중)</p>
        <b-link href="https://join.slack.com/t/yuce-community/shared_invite/enQtODU1MDU5Mjc4OTI4LWVhNTBlMDMzZWQ1ZGI1YThmZmI2MGY1MDIyNTNjNWY4MDE3ZTI5ZWU4OGNmYTA5MGY1MzE2MWQ0ZjYyOWIyMDU">초대링크</b-link>
      </b-card>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  created: function () {
    this.$http.get('member/me')
  }
}
</script>
