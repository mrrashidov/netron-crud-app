<template>
  <div class="w-full">
    <div class="w-3/6 mt-7 mx-auto flex justify-between">
      <div>
        <h1 class="font-bold inline text-xl">{{ $t("message.today") }}</h1>
        <span class="ml-3 text-xs text-gray-500">Per 14 Oct</span>
      </div>
      <div>
        <button><CommentSvg />Yorumlar</button>
        <button><SortSvg />{{ $t("message.sort") }}</button>
      </div>
    </div>
    <hr class="mt-5 w-1/2 mx-auto" />
    <div class="w-1/2 mt-5 mx-auto">
      <button @click="onDropDownModal" class="hover:text-red-500"><AddTaskSvg />{{$t('buttons.addTask')}}</button>
    </div>
  </div>
</template>

<script>
import SortSvg from "@/components/SortSvg.vue";
import AddTaskSvg from "@/components/AddTaskSvg.vue";
import CommentSvg from "@/components/CommentSvg.vue"
export default {
  name: "Inbox",
  components: {
    SortSvg,
    AddTaskSvg,
    CommentSvg
  },
  methods: {
    onDropDownModal(event){
      console.log("Tiklandi")
    }
  }
};
</script>

<style></style>
