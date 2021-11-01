<template>
  <div
    class="
      w-full
      h-full
      border border-red-500
      absolute
      top-0
      left-0
      bg-gray-900 bg-opacity-80
    "
  >
    <div
      class="
        bg-white
        w-1/2
        opacity-100
        mx-auto
        transform
        translate-y-24
        rounded
      "
    >
      <div>
        <form>
          <input
            :value="todo.title"
            class="block"
            type="text"
            placeholder="asdas"
          />
          <textarea
            :value="todo.description"
            class="block resize-none"
          ></textarea>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditTask",
  props: {
    todo: Object,
  },
};
</script>
