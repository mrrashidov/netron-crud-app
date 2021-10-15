<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/todos">Todos</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <Navbar />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { useClient } from "villus";
export default {
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    useClient({
      url: "http://localhost:4000/",
    });
  },
};
</script>

<style scoped>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*,
*::after,
*::before {
  box-sizing: inherit;
}

body {
  background-color: #f9f9fa;
  font: inherit;
}
</style>
