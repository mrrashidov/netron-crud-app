<template>
  <div class="w-full mt-5">
    <div class="card w-2/4 mx-auto">
      <Form @submit="onSubmit" class="block ml-5 mt-5 mb-5 mr-5">
        <div class="w-3/5 p-3 mt-5 mb-5 mx-auto border border-gray-400 rounded">
          <h1 class="font-bold mb-5 mt-5 text-2xl">
            {{ t("loginPage.header") }}
          </h1>
          <hr class="mb-5" />

          <div class="mb-5">
            <div class="flex justify-between">
              <label for="email" class="block mb-1"
                >{{ t("loginPage.email") }}:
              </label>
              <span class="text-red-500"><ErrorMessage name="email" /></span>
            </div>

            <Field
              type="email"
              name="email"
              v-model="email"
              class="block w-full h-8 border pl-2 border-gray-700"
              :placeholder="t('loginPage.email')"
              id="email"
              :rules="emailRules"
            />
          </div>

          <div class="mb-5">
            <div class="flex justify-between">
              <label for="password" class="block mb-1"
                >{{ t("loginPage.password") }}:
              </label>
              <span class="text-red-500"><ErrorMessage name="password" /></span>
            </div>

            <Field
              type="password"
              name="password"
              v-model="password"
              class="block w-full h-8 border pl-2 border-gray-700"
              placeholder="*****"
              id="password"
              :rules="passwordRules"
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
      </Form>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useMutation } from "villus";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      passwordRules: yup.string().required(),
      emailRules: yup.string().required().email(),
    };
  },
  setup() {
    const { t } = useI18n();
    const email = ref();
    const password = ref();

    const loginUser = `
    mutation loginUser($input: LoginInput!){
      loginUser(input:$input){
      email
      }
    }
  `;

    const { data, execute } = useMutation(loginUser);

    function onSubmit() {
      console.log(email.value);
      console.log(password.value);
      execute({
        input: {
          email: email.value,
          password: password.value,
        },
      });
    }
    return {
      email,
      password,
      onSubmit,
      t,
    };
  },
};
</script>
