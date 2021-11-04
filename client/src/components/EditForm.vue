<template>
  <Form @submit="onSubmit" :initial-values="todo">
    <div
      class="border border-gray-300 mt-2 focus:border-gray-700 rounded shadow"
    >
      <div>
        <Field
          type="text"
          name="title"
          v-model="form.title"
          :value="todo.title"
          :rules="formRules"
          class="w-full outline-none pl-3 overflow-y-auto"
          placeholder="ör., Her 1 Mayıs'ta spor üyeliğini yenile #Sağlık"
        />
      </div>
      <div>
        <Field
          as="textarea"
          name="description"
          v-model="form.description"
          :value="todo.description"
          :rules="descriptionRules"
          class="w-full outline-none mt-2 pl-3 resize-none h-24"
          placeholder="Açıklama"
        ></Field>
        <div class="ml-3 mr-3">
          <label class="text-red-500 w-12 block">
            <ErrorMessage name="description" />
          </label>
          <label class="text-red-500 block">
            <ErrorMessage name="title" />
          </label>
          <label class="text-red-500 block">
            <ErrorMessage name="date" />
          </label>
        </div>
      </div>
      <!-- <div class="m-2">
        <Field
          name="date"
          v-model="form.date"
          :value="todo.date"
          :rules="dateRules"
          :format="dd - MM - YYYY"
          type="date"
          class="form-control w-40"
        />
        <Field
          name="group"
          v-model="group"
          as="select"
          class="form-control ml-2"
        >
          <option value="" selected disabled>Select</option>
        </Field>
      </div> -->
    </div>
    <div class="flex justify-between items-center mt-2">
      <div>
        <button type="submit" class="btn btn-primary bg-primary w-28 h-8">
          {{ t("inboxPage.updateTask") }}
        </button>
        <button
          @click="onCloseEditTask"
          type="button"
          class="btn btn-cancel ml-2"
        >
          {{ t("inboxPage.cancel") }}
        </button>
      </div>
      <div>
        <template v-if="form.description">
          <p class="text-sm text-gray-600">
            {{ form.description.length }}
          </p>
        </template>
        <template v-else>
          <p class="text-sm text-gray-600">0</p>
        </template>
      </div>
    </div>
  </Form>
</template>

<script>
  import { useI18n } from "vue-i18n";
  import { useMutation } from "villus";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import { useStore } from "vuex";
  import { reactive } from "vue";
  export default {
    name: "EditForm",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    props: {
      todo: Object,
      isTagEdit: Boolean,
    },
    data() {
      return {
        formRules: yup.string(),
        descriptionRules: yup.string(),
        dateRules: yup.string(),
      };
    },
    setup() {
      const store = useStore();
      const { t } = useI18n();
      const form = reactive({
        title: "",
        description: "",
        date: "",
      });

      const updateTask = `
      mutation updateTask($input: UpdateInput!){
        updateTask(input: $input){
          id
          user_id
          title
          description
          date
        }
      }
  `;

      const { execute } = useMutation(updateTask);

      function onSubmit(values, { resetForm }) {
        delete values.created_at;
        execute({
          input: values,
        });
        resetForm();
        store.dispatch("GET_INPUT_TOGGLE", false);
      }

      function onCloseEditTask() {
        store.dispatch("GET_INPUT_TOGGLE", false);
      }

      return { form, onSubmit, onCloseEditTask, t };
    },
  };
</script>
