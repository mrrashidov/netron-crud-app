<template>
  <div class="w-full mt-5">
    <div class="card w-2/4 mx-auto">
      <form class="block ml-5 mt-5 mb-5 mr-5">
        <div class="w-3/5 p-3 mt-5 mb-5 mx-auto border border-gray-400 rounded">
          <h1 class="font-bold mb-5 mt-5 text-2xl">
            {{ t("loginPage.header") }}
          </h1>
          <hr class="mb-5" />

          <div class="mb-5">
            <label for="email" class="block mb-1"
              >{{ t("loginPage.email") }}:
            </label>
            <input
              type="email"
              class="block w-full h-8 border pl-2 border-gray-700"
              :placeholder="t('loginPage.email')"
              id="email"
            />
          </div>

          <div class="mb-5">
            <label for="password" class="block mb-1"
              >{{ t("loginPage.password") }}:
            </label>
            <input
              type="password"
              class="block w-full h-8 border pl-2 border-gray-700"
              placeholder="*****"
              id="password"
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
            :value="t('loginPage.loginButton')"
          />
          <div class="mt-5 text-xs text-gray-600 leading-6">
            {{ t("loginPage.privacyPolice") }}
          </div>
          <hr class="mt-5" />
          <div class="text-center mt-5 mb-5">
            <p class="text-sm">
              {{ t("loginPage.AlreadyRegisterExist")
              }}<span
                class="ml-2 cursor-pointer text-red-500 hover:text-red-700"
              >
                <router-link to="/register">{{
                  t("loginPage.goToRegisterPage")
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
  name: "Login",
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
};
</script>
