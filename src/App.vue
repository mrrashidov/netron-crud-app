<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/todos">Todos</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <ul class="flex items-center justify-center">
    <li class="mr-3">
      <a
        class="
          inline-block
          border border-blue-500
          rounded
          py-1
          px-3
          bg-blue-500
          text-white
        "
        href="#"
        ><router-link to="/">Home</router-link></a
      >
    </li>
    <li class="mr-3">
      <a
        class="
          inline-block
          border border-white
          rounded
          hover:border-gray-200
          text-blue-500
          hover:bg-gray-200
          py-1
          px-3
        "
        href="#"
        ><router-link to="/about">About</router-link></a
      >
    </li>
    <li class="mr-3">
      <a
        class="
          inline-block
          border border-white
          rounded
          hover:border-gray-200
          text-blue-500
          hover:bg-gray-200
          py-1
          px-3
        "
        href="#"
        ><router-link to="/todos">Todos</router-link></a
      >
    </li>
  </ul>
  <router-view />
</template>

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
