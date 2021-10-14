<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/todos">Todos</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->

  <div class="bg-red-500 flex justify-between items-center">
    <div class="flex items-center">
      <div class="p-2">
        <button class="block ml-8 hover:bg-red-400 p-1">
          <CustomToggleSvg />
        </button>
      </div>
      <div class="p-2">
        <button class="block ml-1 hover:bg-red-400 p-1">
          <router-link to="/"><HomeSvg /></router-link>
        </button>
      </div>
      <div class="p-2">
        <form class="block">
          <input class="bg-red-400 ml-1" type="search" />
        </form>
      </div>
    </div>
    <div>
      <button class="block mr-8 hover:bg-red-400 p-1 ">
        <SettingsSvg />
      </button>
    </div>
    <!-- <ul class="menu flex items-center justify-left p-1">
      <li></li>
      <li class="mr-3">
        <button>
          <router-link to="/">Home</router-link>
        </button>
      </li>
      <li class="mr-3">
        <button>
          <router-link to="/todos">Todos</router-link>
        </button>
      </li>
      <li class="mr-3">
        <button>
          <router-link to="/about">About</router-link>
        </button>
      </li>
    </ul> -->
  </div>
  <router-view />
</template>

<script>
import CustomToggleSvg from "./components/CustomToggleSvg.vue";
import HomeSvg from "./components/HomeSvg.vue";
import SettingsSvg from "./components/SettingsSvg.vue";
export default {
  name: "App",
  components: {
    CustomToggleSvg,
    HomeSvg,
    SettingsSvg,
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
