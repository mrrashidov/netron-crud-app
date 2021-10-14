<template>
  <div class="bg-red-500 flex justify-between items-center">
    <div class="flex items-center">
      <div class="p-2">
        <button @click="onLeftBar" class="block ml-8 hover:bg-red-400 p-1">
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
          <div>
            <button class="absolute h-6 w-6 ml-2 text-gray-50">
              <SearchSvg />
            </button>
            <input
              class="
                block
                bg-red-400
                ml-1
                pl-8
                outline-none
                hover:bg-white
                placeholder-white
                text-black
                cursor-pointer
              "
              type="search"
              :placeholder="$t('message.search')"
            />
          </div>
        </form>
      </div>
    </div>
    <div>
      <button @click="onSettingModal" class="block mr-8 hover:bg-red-400 p-1">
        <SettingsSvg />
      </button>
    </div>
    <template v-if="this.settingModal == true">
      <div
        class="absolute top-0 left-0 h-full w-full bg-gray-900 bg-opacity-75"
      >
        <div class="flex mx-auto transform translate-y-24 w-4/6">
          <div class="bg-gray-200 w-1/5 rounded-l-lg">
            <div class="mt-2 ml-2">
              <h1 class="font-bold">{{ $t("message.setting") }}</h1>
            </div>
            <ul class="ml-3 mt-2">
              <li>
                <button>{{ $t("message.general") }}</button>
              </li>
            </ul>
          </div>
          <div class="bg-white right rounded-r-lg w-4/5">
            <div class="flex items-center justify-between">
              <h1 class="ml-3 mt-3 font-bold">{{ $t("message.general") }}</h1>
              <button
                @click="closeGeneralModal"
                class="mr-3 mt-3 hover:bg-gray-200"
              >
                <CloseSvg />
              </button>
            </div>
            <hr class="mt-3" />
            <div>
              <h1 class="font-bold ml-3 mt-3">{{ $t("message.language") }}</h1>
              <form @submit="onChangeGeneralSettings">
                <select
                  name="lang"
                  id="lang"
                  value="tr"
                  class="
                    w-2/4
                    ml-3
                    mt-2
                    mb-2
                    p-1
                    outline-none
                    border border-gray-700
                  "
                  v-model="lang"
                >
                  <option value="">--Please choose an option--</option>
                  <option value="en">English</option>
                  <option value="tr" selected>Türkçe</option>
                </select>
                <template v-if="this.lang !== this.local">
                  <div>
                    <hr class="mt-3" />
                    <div class="flex justify-end">
                      <button
                        @click="onCancel"
                        class="
                          bg-white
                          hover:bg-gray-100
                          border border-gray-500
                          text-black
                          font-bold
                          py-2
                          px-4
                          rounded
                          mt-2
                          mr-3
                          mb-2
                          cursor-pointer
                        "
                      >
                        {{ $t("message.cancel") }}
                      </button>
                      <input
                        class="
                          bg-red-500
                          hover:bg-red-700
                          text-white
                          font-bold
                          py-2
                          px-4
                          rounded
                          mt-2
                          mr-3
                          mb-2
                          cursor-pointer
                        "
                        type="submit"
                        :value="$t('message.update')"
                      />
                    </div>
                  </div>
                </template>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <router-view />
</template>

<script>
import CustomToggleSvg from "./CustomToggleSvg.vue";
import HomeSvg from "./HomeSvg.vue";
import SettingsSvg from "./SettingsSvg.vue";
import CloseSvg from "./CloseSvg.vue";
import SearchSvg from "./SearchSvg.vue";
export default {
  name: "Navbar",
  components: {
    CustomToggleSvg,
    HomeSvg,
    SettingsSvg,
    CloseSvg,
    SearchSvg,
  },
  data() {
    return {
      settingModal: false,
      local: localStorage.getItem("local"),
      lang: "",
    };
  },
  methods: {
    onSettingModal() {
      this.settingModal = true;
    },
    closeGeneralModal() {
      this.settingModal = false;
    },
    onChangeGeneralSettings(event) {
      event.preventDefault();
      localStorage.setItem("local", this.lang);
      console.log("change lang", this.lang);
      window.location = "/";
    },
    onCancel() {
      this.lang = this.local;
    },
    onLeftBar() {
      console.log("ad");
      this.$store.dispatch("GET_LEFTBAR_TOGGLE", true);
    },
  },
};
</script>
