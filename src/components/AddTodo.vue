<template>
  <div class="todo-area w-full">
    <div class="max-w-md mx-auto mt-5 mb-5">
      <form @submit="onSubmit">
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
            v-model="form.name"
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
                resize-none
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
              "
              name="description"
              id="description"
              required
              placeholder="What do you need to do today?"
            ></textarea>
            <span class="block mb-5 text-right text-red-500" style="color: red"
              >{{ form.description.length }} / 100</span
            >
          </template>
          <template v-else>
            <textarea
              v-model="form.description"
              class="
                resize-none
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
              "
              name="description"
              id="description"
              required
              placeholder="What do you need to do today?"
            ></textarea>
            <span class="block mb-5 text-right"
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
            v-model="form.select"
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
            v-model="form.status"
            class="ml-2 cursor-pointer"
            name="status"
            id="status"
            checked
          />
        </div>
        <div class="button-area">
          <input
            class="
              bg-green-500
              hover:bg-green-700
              text-white
              font-bold
              py-2
              px-4
              cursor-pointer
              rounded
              focus:outline-none focus:shadow-outline
            "
            type="submit"
            value="Add Todo"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      form: {
        id: Math.floor(Math.random() * 10000),
        name: "",
        description: "",
        price: "",
        select: "",
        status: true,
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (
        this.form.name.length == 0 ||
        this.form.description.length === 0 ||
        this.form.price.length == 0 ||
        this.form.select.length == 0 ||
        this.form.status.length == 0
      ) {
        alert("Please fill in the fields !");
        return;
      } else if (this.form.description.length >= 100) {
        alert("Can't be more than 100 !");
        return;
      }
      this.$store.dispatch("ADD_TODO", this.form);
    },
  },
};
</script>
