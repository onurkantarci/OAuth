import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import { checkAuthentication } from "./services/auth-service";
import Users from "./components/Users.vue";

const routes = [
  { path: "/", component: Home, meta: { requiresAuth: false } },
  { path: "/login", component: Login, meta: { requiresAuth: true } },
  { path: "/users", component: Users, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = await checkAuthentication();
    if (to.path === "/login") {
      if (isAuthenticated) {
        next({ path: "/" });
        return;
      } else {
        next();
        return;
      }
    }

    if (!isAuthenticated) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount("#app");
