<template>
  <div class="mt-5 p-4">
    <div class="w-1/2 mx-auto">
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center">
          <h1 class="today-header font-bold">{{t('inboxPage.today')}}</h1>
          <span class="today-span ml-2 text-gray-400">{{t('inboxPage.dt')}}</span>
        </div>
        <button>
          <SortSvg/>
          {{t('inboxPage.sort')}}
        </button>
      </div>
      <div v-if="data">
        <hr class="mt-2" />
        <div v-for="todo in data.tasks">
          <div class="flex">
            <div @click="onTick" class="mt-2 border border-gray-500 rounded-full h-7 w-7 flex items-center justify-center"><input v-model="isTick" type="checkbox" class="outline-none" /></div>
            <div class="mt-2 ml-2 leading-5">
              <p>{{todo.header}}</p>
              <p>{{todo.description}}</p>
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-3"/>
      <div v-if="this.isActive == false">
        <div>
          <button @click="onClick" class="add-task-button flex items-center mt-2">
            <AddTaskSvg class="add-task-svg mt-1 mr-1"/>
            <p class="add-task-text text-gray-500">{{t('inboxPage.addTask')}}</p></button>
        </div>
        <div class="">
          <AddTodoSvg class="w-2/6 mt-5 mx-auto"/>
          <h1 class="add-task-header text-center text-gray-900 mt-2 mb-2">Günün net bir görünümünü edin</h1>
          <p class="add-task-text text-center text-gray-500 mb-2">Bitiş tarihi bugün olan görevlerin burada
            gözükecek.</p>
          <div class="text-center">
            <button @click="onClick" class="add-task-button-general w-24 h-9 mt-2 bg-red-500 rounded text-white">{{t('inboxPage.addTask')}}
            </button>
          </div>
        </div>

      </div>
      <div v-else>
        <div>
          <form>
            <div class="border border-gray-300 mt-2 focus:border-gray-700 rounded">
              <div>
                <input type="text" class="w-full outline-none pl-3"
                       placeholder="ör., Her 1 Mayıs'ta spor üyeliğini yenile #Sağlık"/>
              </div>
              <div>
                <textarea class="w-full outline-none mt-2 pl-3 resize-none" placeholder="Açıklama"></textarea>
              </div>
            </div>
            <div class="flex items-center mt-2">
              <button class="p-1 bg-red-500 text-white rounded">{{t('inboxPage.addTask')}}</button>
              <button @click="onCancel" class="ml-4 p-1 bg-white text-black border rounded border-gray-300">{{t('inboxPage.cancel')}}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SortSvg from "@icons/SortSvg.vue";
import AddTodoSvg from "@icons/AddTodoSvg.vue";
import AddTaskSvg from "@/components/AddTaskSvg.vue";
import TickSvg from "@icons/TickSvg.vue";
import {useQuery} from 'villus';
import { useI18n } from "vue-i18n";

export default {
  name: "Inbox",
  data() {
    return {
      isActive: false,
      isTick: false
    }
  },
  components: {
    SortSvg,
    AddTodoSvg,
    AddTaskSvg,
    TickSvg
  },
  methods: {
    onClick() {
      this.isActive = true;
    },
    onCancel() {
      this.isActive = false;
    },
    onTick(){
      this.isTick = true;
      console.log(this.isTick)
    }
  },
  setup() {
    const { t } = useI18n();
    const getTasks = `
    query {
    tasks
    {
    header,
    description
    }
    }
    `;

    const {data} = useQuery({
      query: getTasks
    })
    return {
      data,
      t
    }
  }
}
</script>

<style scoped>
.today-header {
  font-size: 20px;
}

.today-span {
  font-size: 13px;
}

.add-task-button:hover {
  color: red !important;
}

.add-task-header {
  font-size: 16px;
}

.add-task-text {
  font-size: 14px;
}

.add-task-button-general {
  font-size: 13px;
  background-color: #DB4C3F;
}

</style>