<template>
  <div class="w-2/6">
    <div class="w-5/6 bg-gray-100">
      <ul>
        <li>Home</li>
        <li>Todos</li>
        <li>About</li>
        <li><InboxSvg />Inbox</li>
        <li><TodaySvg />Today</li>
        <li><UpComingSvg />Upcoming</li>
      </ul>
    </div>
  </div>
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
