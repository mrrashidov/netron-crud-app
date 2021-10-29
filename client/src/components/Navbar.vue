<template>
  <div class="navbar bg-red-500 flex justify-between items-center">
    <div class="flex items-center">
      <div class="pl-2">
        <template v-if="this.isLeftBarToggle == true">
          <button @click="onCloseLeftBar" class="block ml-8">
            <CustomToggleSvg />
          </button>
        </template>
        <template v-else>
          <button @click="onLeftBar" class="block ml-8">
            <CustomToggleSvg />
          </button>
        </template>
      </div>
      <div class="p-2">
        <button class="block home-button">
          <router-link to="/">
            <HomeSvg />
          </router-link>
        </button>
      </div>
      <div class="p-2">
        <form class="block">
          <div>
            <button class="search-button absolute text-gray-50">
              <SearchSvg />
            </button>
            <input
              class="search-button block outline-none cursor-pointer rounded"
              type="search"
              :placeholder="$t('message.search')"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="flex items-center justify-items-end pr-3">
      <button @click="onSettingModal" class="block mr-8 hover:bg-red-400 p-1">
        <SettingsSvg />
      </button>
      <button>Profile</button>
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
                    rounded
                  "
                  v-model="lang"
                >
                  <option value="">--Please choose an option--</option>
                  <option value="en">English</option>
                  <option value="tr" selected>Türkçe</option>
                </select>
                <div class="m-3">
                  <label class="font-bold block">Çıkış Yap</label>
                  <button type="button" @click="onLogout">Çıkış yap</button>
                </div>
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
  <router-view></router-view>
</template>

<script>
import CustomToggleSvg from "@icons/CustomToggleSvg.vue";
import HomeSvg from "@icons/HomeSvg.vue";
import SettingsSvg from "@icons/SettingsSvg.vue";
import CloseSvg from "@icons/CloseSvg.vue";
import SearchSvg from "@icons/SearchSvg.vue";
import { useStore } from "vuex";
import { computed } from "vue";

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
      this.$store.dispatch("GET_LEFTBAR_TOGGLE", true);
    },
    onCloseLeftBar() {
      this.$store.dispatch("GET_LEFTBAR_TOGGLE", false);
    },
  },
  setup() {
    const store = useStore();
    store.dispatch("GET_LEFTBAR_TOGGLE", false);
    const isLeftBarToggle = computed(() => store.state.todo.leftBarToggle);
    function onLogout() {
      localStorage.removeItem("user");
    }
    return {
      onLogout,
      isLeftBarToggle,
    };
  },
};
</script>

<style scoped>
.navbar {
  height: 44px;
  background-color: #db4c3f;
}

button {
  padding: 3px;
}

button:hover {
  background-color: rgba(238, 238, 238, 0.3);
}

.home-button {
  margin-left: -6px;
}

input::placeholder {
  color: #ffffff;
  padding-left: 30px;
  font-size: 13px;
}

input::placeholder:hover {
  color: black;
}

input::placeholder:hover {
  color: black;
}

input[type="search"] {
  background-color: rgba(238, 238, 238, 0.3);
  padding: 2px 5px;
  margin-left: -10px;
}

input[type="search"]:hover {
  background-color: white;
}

input[type="search"]:focus {
  background-color: white;
  padding-left: 35px;
}

.search-button {
  margin-left: -10px;
}
</style>
