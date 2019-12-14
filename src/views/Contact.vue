<template>
  <b-card bg-variant="light">
    <b-card-text style="white-space: pre-line">
      <h3 class="display-4 py-3">Contact Us</h3>

      <b-card-group deck>
        <b-card class="my-2">
          <h3><font-awesome-icon icon="envelope"></font-awesome-icon> Mail</h3>
          <hr>
          <p>recruitjogbo@gmail.com</p>
        </b-card>

        <b-card class="my-2">
          <h3><font-awesome-icon :icon="['fab','github-square']"></font-awesome-icon> Github</h3>
          <hr>
          <strong><b-link href="https://github.com/hellozin/recruit-jogbo">Backend Server Github</b-link></strong><br />
          <strong><b-link href="https://github.com/hellozin/recruit-jogbo-frontend">Frontend Server Github</b-link></strong>
          <p>건의사항, 버그 Issue, Pull Request 환영</p>
        </b-card>
      </b-card-group>

      <b-card-group deck>
        <b-card class="my-2">
          <h3><font-awesome-icon :icon="['fab','slack']"></font-awesome-icon> Slack</h3>
          <hr>
          <p>영남대학교 컴퓨터공학과 재학생과 졸업생을 위한 커뮤니티입니다. Recruit Jogbo의 새 글, 업데이트 알림을 받을 수 있습니다.</p>
          <b-link href="https://join.slack.com/t/yuce-community/shared_invite/enQtODYwOTE3MTUwMzA2LTQ0Y2Q0OGMwNDNlMzRmMDVmNjE2YmViMDMzNzg3NjNmZDU4YzlkYWJhMGVlMTkwYjY3NjdhMjQzZmNiMTcwOGQ">소개 및 초대링크</b-link>
        </b-card>

        <b-card class="my-2">
          <h3><font-awesome-icon icon="server"></font-awesome-icon> 데모 서버</h3>
          <hr>
          <p>링크 : 준비중</p>
        </b-card>
      </b-card-group>

      
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
