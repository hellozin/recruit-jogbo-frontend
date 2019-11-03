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
        <p>링크 : 준비중</p>
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
