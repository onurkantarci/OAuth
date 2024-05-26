<script setup lang="ts"></script>

<template>
  <div>
    <h1>Login Using</h1>
    <a class="google-btn" href="/auth/google">Google</a>
    <a class="github-btn" href="/auth/github">Github</a>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: 180px;
}
.google-btn {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  background: #ff5353;
  text-align: center;
  margin-bottom: 10px;
}
.google-btn:hover {
  background: #ff5353c8;
}
.github-btn {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  background: #040202;
  text-align: center;
}
.github-btn:hover {
  background: #040202c4;
}
</style>
