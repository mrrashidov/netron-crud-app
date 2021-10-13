<template>
  <div v-show="this.isToggle">
    <div
      class="w-full h-screen absolute top-0 left-0 bg-gray-900 bg-opacity-80"
    >
      <div class="bg-white transform translate-y-24 p-1">
        <button class="block bg-red-500 text-white rounded" @click="onClose">
          <ToggleCloseSvg />
        </button>
        <div class="flex justify-center items-center mt-1">
          <form>
            <div class="input-area">
              <label for="name"> Name: </label>
              <input
                type="text"
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
              <textarea
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
            </div>
            <div class="input-area">
              <label for="price"> Price: </label>
              <input
                type="number"
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
                <option selected disabled value="default">Default</option>
                <option>Price</option>
              </select>
            </div>
            <div class="flex items-center items-center justify-start mb-5">
              <label for="status">Status:</label>
              <input
                type="checkbox"
                class="ml-2 cursor-pointer"
                name="status"
                id="status"
                checked
              />
            </div>
            <div class="button-area">
              <input
                class="
                  bg-blue-500
                  hover:bg-blue-700
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
import ToggleCloseSvg from "@/components/ToggleCloseSvg.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "Modal",
  components: {
    ToggleCloseSvg,
  },
  methods: {
    onClose() {
      this.$store.dispatch("GET_TOGGLE", false);
    },
  },
  setup() {
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
