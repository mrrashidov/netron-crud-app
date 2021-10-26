<template>
  <div class="w-2/6">
    <div class="w-5/6 bg-gray-100 h-screen">
      <ul class="pl-12 pr-12 p-7">
        <router-link to="/">
          <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
            <InboxSvg />{{ t("message.inbox") }}
          </li>
        </router-link>
        <router-link to="/today">
          <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
            <TodaySvg />{{ t("message.today") }}
          </li>
        </router-link>
        <router-link to="/upcoming">
          <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
            <UpComingSvg />{{ t("message.upComing") }}
          </li>
        </router-link>
        <hr class="mt-3 mb-3" />
        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <div
            @click="onClick"
            class="flex items-center"
            v-if="this.isArrow == false"
          >
            <RightArrow class="ml-3 -mb-5 origin-left transform -rotate-90" />
            <div class="tag w-full flex justify-between">
              <p class="font-medium">{{ t("leftBar.labels") }}</p>
              <button class="hidden" @click="onLabelToggle">
                <AddLabelSvg />
              </button>
            </div>
          </div>
          <div @click="onCancel" class="flex items-center" v-else>
            <RightArrow class="ml-3 mt-1 mr-2 origin-left transform" />
            <div class="tag w-full flex justify-between">
              <p class="font-medium">{{ t("leftBar.labels") }}</p>
              <button class="hidden" @click="onLabelToggle">
                <AddLabelSvg />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
import InboxSvg from "@icons/InboxSvg.vue";
import TodaySvg from "@icons/TodaySvg.vue";
import UpComingSvg from "@icons/UpComingSvg.vue";
import RightArrow from "@icons/RightArrow.vue";
import AddLabelSvg from "@icons/AddLabelSvg.vue";
import { useI18n } from "vue-i18n";
export default {
  name: "Leftbar",
  components: {
    InboxSvg,
    TodaySvg,
    UpComingSvg,
    RightArrow,
    AddLabelSvg,
  },
  data() {
    return {
      isArrow: false,
      isLabelToggle: false,
    };
  },
  methods: {
    onClick() {
      this.isArrow = true;
    },
    onCancel() {
      this.isArrow = false;
    },
    onLabelToggle() {
      this.isLabelToggle = true;
      console.log("isToggle", this.isLabelToggle);
      this.$emit("label-toggle", this.isLabelToggle);
    },
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
