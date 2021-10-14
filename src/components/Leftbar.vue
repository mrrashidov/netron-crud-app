<template>
  <div class="w-2/6">
    <div class="w-5/6 bg-gray-100">
      <ul class="p-5">
        <li><router-link to="/inbox"><InboxSvg />Inbox</router-link></li>
        <li><router-link to="/today"><TodaySvg />Today</router-link></li>
        <li><router-link to="/upcoming"><UpComingSvg />Upcoming</router-link></li>
        <hr class="mt-2 mb-2" />
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/todos">Todos</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
  </div>
  <router-view />
</template>

<script>
import InboxSvg from "@/components/InboxSvg.vue";
import TodaySvg from "@/components/TodaySvg.vue";
import UpComingSvg from "@/components/UpComingSvg.vue";
export default {
  name: "Leftbar",
  components: {
    InboxSvg,
    TodaySvg,
    UpComingSvg,
  },
};
</script>

<style></style>
