<template>
  <div v-show="this.isToggle">
    <div class="w-full h-full absolute top-0 left-0 bg-gray-900 bg-opacity-80">
      <div class="w-1/2 mx-auto rounded bg-white transform translate-y-24 p-1">
        <div class="flex justify-end">
          <button
            class="
              block
              bg-gray-500
              hover:bg-red-500
              text-white text-right
              rounded
            "
            @click="onClose"
          >
            <ToggleCloseSvg />
          </button>
        </div>

        <div class="flex justify-center items-center mt-1">
          <form @submit="onUpdate">
            <div class="input-area">
              <label for="name"> Name: </label>
              <input
                type="text"
                v-model="form.name"
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  mb-5
                "
                name="name"
                id="name"
                required
                placeholder="Name"
              />
            </div>
            <div class="input-area">
              <label for="description"> Description: </label>
              <template v-if="form.description.length >= 100">
                <textarea
                  v-model="form.description"
                  disabled
                  class="
                    shadow
                    appearance-none
                    border
                    rounded
                    w-full
                    py-2
                    px-3
                    resize-none
                    text-gray-700
                    leading-tight
                    focus:outline-none focus:shadow-outline
                    mb-5
                  "
                  name="description"
                  id="description"
                  required
                  placeholder="Description"
                ></textarea>
                <span
                  class="block mb-5 text-right text-red-500"
                  style="color: red"
                  >{{ form.description.length }} / 100</span
                >
              </template>
              <template v-else>
                <textarea
                  v-model="form.description"
                  class="
                    shadow
                    appearance-none
                    border
                    rounded
                    w-full
                    py-2
                    px-3
                    resize-none
                    text-gray-700
                    leading-tight
                    focus:outline-none focus:shadow-outline
                    mb-5
                  "
                  name="description"
                  id="description"
                  required
                  placeholder="Description"
                ></textarea>
                <span class="block text-right"
                  >{{ form.description.length }} / 100</span
                >
              </template>
            </div>
            <div class="input-area">
              <label for="price"> Price: </label>
              <input
                type="number"
                v-model="form.price"
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  mb-5
                "
                name="price"
                id="price"
                required
                placeholder="1"
              />
            </div>
            <div class="input-area">
              <label for="select"> Select: </label>
              <select
                name="select"
                v-model="form.select"
                id="select"
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  mb-5
                "
              >
                <option value="" disabled selected>Select</option>
                <option
                  v-for="option in options"
                  v-bind:value="option.value"
                  :key="option.value"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>
            <div class="flex items-center items-center justify-start mb-5">
              <label for="status">Status:</label>
              <input
                type="checkbox"
                v-model="form.status"
                class="ml-2 cursor-pointer"
                name="status"
                id="status"
                checked
              />
            </div>
            <div class="button-area flex">
              <button
                @click="onClose"
                class="
                  bg-red-500
                  hover:bg-red-700
                  text-white
                  mt-5
                  mb-5
                  font-bold
                  py-2
                  px-4
                  cursor-pointer
                  rounded
                  focus:outline-none focus:shadow-outline
                "
              >
                Cancel
              </button>
              <input
                class="
                  bg-blue-500
                  hover:bg-blue-700
                  text-white
                  mt-5
                  mb-5
                  ml-5
                  font-bold
                  py-2
                  px-4
                  cursor-pointer
                  rounded
                  focus:outline-none focus:shadow-outline
                "
                type="submit"
                value="Update"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleCloseSvg from "@icons/ToggleCloseSvg.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "Modal",
  components: {
    ToggleCloseSvg,
  },
  props: {
    todo: Object,
  },
  data() {
    return {
      // Select form
      options: [
        { value: 1, name: "General" },
        { value: 2, name: "Party" },
      ],
      // Form fields in area
      form: {
        id: this.todo.id,
        name: this.todo.name,
        description: this.todo.description,
        price: this.todo.price,
        select: this.todo.select,
        status: this.todo.status,
      },
    };
  },
  methods: {
    // Modal close
    onClose() {
      this.$store.dispatch("GET_TOGGLE", false);
    },
    // Form Validation and uptade
    onUpdate(event) {
      event.preventDefault();
      if (
        this.todo.id.length == 0 ||
        this.todo.name.length == 0 ||
        this.todo.description.length == 0 ||
        this.todo.select.length == 0 ||
        this.todo.status.length == 0
      ) {
        alert("Please fill in the fields !");
        return;
      } else if (this.form.description.length >= 100) {
        alert("Can't be more than 100 !");
        return;
      }
      this.$store.dispatch("UPDATE_TODO", this.form);
    },
  },
  setup() {
    // GET toggle value in store
    const store = useStore();
    store.dispatch("GET_TOGGLE", false);
    const isToggle = computed(() => store.state.todo.toggle);
    return {
      isToggle,
    };
  },
};
</script>

<style></style>
