<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user._id">
        <h2>{{ user.username }}</h2>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axiosService from "../services/axios-service";

interface User {
  _id: string;
  username: string;
}

const users = ref<User[]>([]);

onMounted(async () => {
  try {
    const response = await axiosService.get("/auth/users");
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 200px;
}
</style>
