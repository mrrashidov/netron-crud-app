<template>
  <div class="w-full">
    <div class="w-3/6 mt-7 mx-auto flex justify-between">
      <div>
        <h1 class="font-bold inline text-xl">{{ $t("message.today") }}</h1>
        <span class="ml-3 text-xs text-gray-500">Per 14 Oct</span>
      </div>
      <div class="flex items-center">
        <button class="mr-5"><CommentSvg />Yorumlar</button>
        <button class="mr-5"><SortSvg />{{ $t("message.sort") }}</button>
        <button><OptionsMoreSvg /></button>
      </div>
    </div>
    <hr class="mt-5 w-1/2 mx-auto" />
    <div class="w-1/2 mt-5 mx-auto">
      <button @click="onDropDownModal" class="hover:text-red-500">
        <AddTaskSvg />{{ $t("buttons.addTask") }}
      </button>
    </div>
    <template v-if="this.isTask == true">
      <div class="w-1/2 mt-5 mx-auto border border-gray-400 rounded pl-2">
        <form>
          <input
            class="w-full p-2 outline-none"
            placeholder="ör., 2 günde bir Portekizce öğren #Öğrenme"
          />
          <textarea
            class="w-full p-2 h-24 outline-none mt-1 resize-none"
            placeholder="Açıklama"
          ></textarea>
          <input
            class="
              outline-none
              border border-gray-400
              hover:bg-gray-200
              rounded
              ml-1
              mb-3
            "
            type="date"
          />
          <div class="absolute">
            <input
              class="
                mt-3
                bg-red-500
                p-2
                rounded
                text-white
                hover:bg-red-700
                cursor-pointer
              "
              type="submit"
              value="Görev Ekle"
            />
            <button
              @click="onDropDownModalClose"
              class="
                ml-3
                mt-3
                bg-white
                border border-gray-400
                p-2
                rounded
                text-black
                hover:bg-gray-200
                cursor-pointer
              "
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>

<script>
import SortSvg from "@/components/SortSvg.vue";
import AddTaskSvg from "@/components/AddTaskSvg.vue";
import CommentSvg from "@/components/CommentSvg.vue";
import OptionsMoreSvg from "@/components/OptionsMoreSvg.vue";
export default {
  name: "Inbox",
  components: {
    SortSvg,
    AddTaskSvg,
    CommentSvg,
    OptionsMoreSvg,
  },
  data() {
    return {
      isTask: false,
    };
  },
  methods: {
    onDropDownModal() {
      this.isTask = true;
    },
    onDropDownModalClose() {
      this.isTask = false;
    },
  },
};
</script>

<style></style>
