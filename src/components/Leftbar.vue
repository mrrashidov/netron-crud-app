<template>
  <div class="w-2/6">
    <div class="w-5/6 bg-gray-100 h-screen">
      <ul class="pl-12 pr-12 p-7">
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/inbox"
            ><InboxSvg />{{ $t("message.inbox") }}</router-link
          >
        </li>
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/today"
            ><TodaySvg />{{ $t("message.today") }}</router-link
          >
        </li>
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/upcoming"
            ><UpComingSvg />{{ $t("message.upComing") }}</router-link
          >
        </li>
        <hr class="mt-3 mb-3" />
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/">{{ $t("pages.home") }}</router-link>
        </li>
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/todos">{{ $t("pages.todos") }}</router-link>
        </li>
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/about">{{ $t("pages.about") }}</router-link>
        </li>
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
