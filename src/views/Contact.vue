<template>
  <b-card bg-variant="light">
    <b-card-text style="white-space: pre-line">
      <h1 class="display-4 py-3">Contact Us</h1>

      <b-card class="my-2">
        <h3><font-awesome-icon icon="envelope"></font-awesome-icon> Mail</h3>
        <hr>
        <p>paul26375@gmail.com</p>
      </b-card>

      <b-card class="my-2">
        <h3><font-awesome-icon :icon="['fab','github-square']"></font-awesome-icon> Github</h3>
        <hr>
        <span><b>Spring API Server : </b></span>
        <b-link href="https://github.com/hellozin/recruit-jogbo">https://github.com/hellozin/recruit-jogbo</b-link>
        <br>
        <span><b>Vue Frontend Server : </b></span>
        <b-link href="https://github.com/hellozin/recruit-jogbo-frontend">https://github.com/hellozin/recruit-jogbo-frontend</b-link>
        <p>Issue, Pull Request 환영</p>
      </b-card>

      <b-card class="my-2">
        <h3><font-awesome-icon icon="server"></font-awesome-icon> 데모 서버</h3>
        <hr>
        <p>링크 :</p>
      </b-card>

      <b-card class="my-2">
        <h3><font-awesome-icon :icon="['fab','slack']"></font-awesome-icon> Slack</h3>
        <hr>
        <p>링크 :</p>
      </b-card>
    </b-card-text>
  </b-card>
</template>