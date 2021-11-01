import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import Todos from "@/views/Todos.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Inbox from "@/views/Inbox.vue";
import Today from "@/views/Today.vue";
import Upcoming from "@/views/Upcoming.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Inbox",
    component: Inbox,
  },
  {
    path: "/todos",
    name: "Todos",
    component: Todos,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/today",
    name: "Today",
    component: Today,
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    component: Upcoming,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
