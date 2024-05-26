<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { checkAuthentication } from "./services/auth-service";
import axiosService from "./services/axios-service";

const isAuthenticated = ref<boolean>(false);
const router = useRouter();

onMounted(async () => {
  isAuthenticated.value = await checkAuthentication();
});

const handleLogout = async () => {
  try {
    await axiosService.get("/auth/logout");
    isAuthenticated.value = false;
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/users">Users</router-link>
    <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    <button v-else class="logout-btn" @click="handleLogout">Logout</button>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
body {
  font-family: arial;
}
nav {
  background: #ff5353;
  padding: 20px 10px;
  display: flex;
  align-items: center;
}
nav ul {
  max-width: 960px;
  margin: 0 auto;
  padding: 0;
}
nav li {
  list-style-type: none;
  display: inline-block;
  margin: 0 10px 0 0;
}
nav a {
  color: #fff;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.2);
  text-decoration: none;
  padding: 10px;
}

.logout-btn {
  cursor: pointer;
  border: none;
  color: #fff;
  height: 41px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
