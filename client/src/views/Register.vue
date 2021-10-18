<template>
  <div class="w-full mt-5">
    <div class="card w-2/4 mx-auto">
      <form @submit="onSubmit" class="block ml-5 mt-5 mb-5 mr-5">
        <div class="w-3/5 p-3 mt-5 mb-5 mx-auto border border-gray-400 rounded">
          <h1 class="font-bold mb-5 mt-5 text-2xl">
            {{ t("registerPage.header") }}
          </h1>
          <hr class="mb-5" />
          <div class="mb-5">
            <label for="name" class="block mb-1"
              >{{ t("registerPage.name") }} :</label
            >
            <input
              type="text"
              name="name"
              v-model="name"
              class="block w-full h-8 border pl-2 border-gray-700"
              :placeholder="t('registerPage.name')"
              id="name"
            />
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-1"
              >{{ t("registerPage.email") }}:
            </label>
            <input
              type="email"
              class="block w-full h-8 border pl-2 border-gray-700"
              :placeholder="t('registerPage.email')"
              id="email"
            />
          </div>

          <div class="mb-5">
            <label for="password" class="block mb-1"
              >{{ t("registerPage.password") }}:
            </label>
            <input
              type="password"
              class="block w-full h-8 border pl-2 border-gray-700"
              placeholder="*****"
              id="password"
            />
          </div>

          <div class="mb-5">
            <label for="cpassword" class="block mb-1">
              {{ t("registerPage.verifyPassword") }}:
            </label>
            <input
              type="password"
              class="block w-full h-8 border pl-2 border-gray-700"
              placeholder="*****"
              id="cpassword"
            />
          </div>

          <input
            type="submit"
            class="
              block
              mt-5
              w-full
              h-9
              rounded
              cursor-pointer
              text-white
              bg-red-500
              hover:bg-red-700
            "
            :value="t('registerPage.registerButton')"
          />
          <div class="mt-5 text-xs text-gray-600 leading-6">
            {{ t("registerPage.privacyPolice") }}
          </div>
          <hr class="mt-5" />
          <div class="text-center mt-5 mb-5">
            <p class="text-sm">
              {{ t("registerPage.AlreadyRegisterExist")
              }}<span
                class="ml-2 cursor-pointer text-red-500 hover:text-red-700"
              >
                <router-link to="/login">{{
                  t("registerPage.goToHomePage")
                }}</router-link></span
              >
            </p>
          </div>
        </div>
      </form>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
  name: "Register",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    onSubmit(event){
      event.preventDefault();
      console.log(this.name)
    }
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
};
</script>
