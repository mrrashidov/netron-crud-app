import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Todos from "@/views/Todos.vue";
import Upcoming from "@/views/Upcoming.vue";
import Today from "@/views/Today.vue";
import Inbox from "@/views/Inbox.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/inbox",
    name: "Inbox",
    component: Inbox,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
