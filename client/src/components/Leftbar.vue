<template>
  <div class="w-2/6">
    <div class="w-5/6 bg-gray-100 h-screen">
      <ul class="pl-12 pr-12 p-7">
        <router-link to="/inbox">
          <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
            <InboxSvg />{{ t("message.inbox") }}
          </li>
        </router-link>
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/today"
            ><TodaySvg />{{ t("message.today") }}</router-link
          >
        </li>
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/upcoming"
            ><UpComingSvg />{{ t("message.upComing") }}</router-link
          >
        </li>
        <hr class="mt-3 mb-3" />
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/">{{ t("pages.home") }}</router-link>
        </li>
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/todos">{{ t("pages.todos") }}</router-link>
        </li>
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <router-link to="/about">{{ t("pages.about") }}</router-link>
        </li>
        <hr class="mt-3 mb-3" />
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <div class="flex items-center" v-if="this.isArrow == false">
            <RightArrow class="ml-3 -mb-5 origin-left transform -rotate-90" />
            <div class="tag w-full flex justify-between">
              <router-link to="/about">{{ t("leftBar.labels") }}</router-link>
              <button class="hidden">+</button>
            </div>
          </div>
          <div v-else>
            <RightArrow class="ml-3 -mb-5 origin-left transform" />
            <div class="tag w-full flex justify-between">
              <router-link to="/about">{{ t("leftBar.labels") }}</router-link>
              <button class="hidden">+</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
import InboxSvg from "@/components/InboxSvg.vue";
import TodaySvg from "@/components/TodaySvg.vue";
import UpComingSvg from "@/components/UpComingSvg.vue";
import RightArrow from "@/components/icons/RightArrow.vue";
import { useI18n } from "vue-i18n";
export default {
  name: "Leftbar",
  components: {
    InboxSvg,
    TodaySvg,
    UpComingSvg,
    RightArrow,
  },
  data() {
    return {
      isArrow: false,
    };
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
};
</script>

<style scoped>
.tag:hover button {
  display: block;
}
</style>
