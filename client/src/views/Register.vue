<template>
  <div class="w-full mt-5">
    <div class="card w-2/4 mx-auto">
      <Form @submit="onSubmit" class="block ml-5 mt-5 mb-5 mr-5">
        <div
          class="w-4/5 p-12 mt-5 mb-5 mx-auto border border-gray-300 rounded-lg"
        >
          <h1 class="font-bold mb-5 mt-5 text-2xl">
            {{ t("registerPage.header") }}
          </h1>
          <hr class="mb-5" />
          <div class="mb-5">
            <label for="name" class="block mb-1"
              >{{ t("registerPage.name") }} :</label
            >
            <Field
              type="text"
              name="first_name"
              v-model="first_name"
              class="block w-full h-8 border pl-2 border-gray-700"
              :placeholder="t('registerPage.name')"
              id="name"
              :rules="firstNameRules"
            />
            <span class="text-red-500"><ErrorMessage name="first_name" /></span>
          </div>
          <div class="mb-5">
            <label for="name" class="block mb-1"
              >{{ t("registerPage.surname") }} :</label
            >
            <Field
              type="text"
              name="last_name"
              v-model="last_name"
              class="block w-full h-8 border pl-2 border-gray-700"
              :placeholder="t('registerPage.surname')"
              id="name"
              :rules="lastNameRules"
            />
            <span class="text-red-500"><ErrorMessage name="last_name" /></span>
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-1"
              >{{ t("registerPage.email") }}:
            </label>
            <Field
              type="email"
              name="email"
              v-model="email"
              class="block w-full h-8 border pl-2 border-gray-700"
              :placeholder="t('registerPage.email')"
              id="email"
              :rules="emailRules"
            />
            <span class="text-red-500"><ErrorMessage name="email" /></span>
          </div>

          <div class="mb-5">
            <label for="password" class="block mb-1"
              >{{ t("registerPage.password") }}:
            </label>
            <Field
              type="password"
              name="password"
              v-model="password"
              class="block w-full h-8 border pl-2 border-gray-700"
              placeholder="*****"
              id="password"
              :rules="passwordRules"
            />
            <span class="text-red-500"><ErrorMessage name="password" /></span>
          </div>

          <div class="mb-5">
            <label for="cpassword" class="block mb-1">
              {{ t("registerPage.verifyPassword") }}:
            </label>
            <Field
              type="password"
              name="cpassword"
              v-model="cpassword"
              class="block w-full h-8 border pl-2 border-gray-700"
              placeholder="*****"
              id="cpassword"
              :rules="cpasswordRules"
            />
            <span class="text-red-500"><ErrorMessage name="cpassword" /></span>
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
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      firstNameRules: yup.string().required().max(12),
      lastNameRules: yup.string().required().max(12),
      emailRules: yup.string().required().email(),
      passwordRules: yup.string().required().max(12).min(8),
      cpasswordRules: yup.string().required().max(12).min(8),
    };
  },
  setup() {
    const first_name = ref();
    const last_name = ref();
    const email = ref();
    const password = ref();
    const cpassword = ref();
    const { t } = useI18n();

    const addUser = `
    mutation addUser($input:UserInput){
      addUser(input:$input){
        id
        first_name
        last_name
        avatar
        email
        status
        created_at
      }
    }
    `;

    const { data, execute } = useMutation(addUser);

    function onSubmit() {
      if (password.value !== cpassword.value) {
        alert("Error");
      } else {
        execute({
          input: {
            first_name: first_name.value,
            last_name: last_name.value,
            avatar: "https://picsum.photos/200/300",
            email: email.value,
            password: password.value,
            status: "active",
          },
        });
      }
      console.log(first_name.value);
      console.log(last_name.value);
      console.log(email.value);
      console.log(password.value);
      console.log(cpassword.value);
    }

    return {
      first_name,
      last_name,
      email,
      password,
      cpassword,
      onSubmit,
      t,
    };
  },
};
</script>
