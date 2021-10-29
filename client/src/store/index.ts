import { createStore } from "vuex";
import todo from "./modules/todo";
import auth from "./modules/auth";
import task from "./modules/task";
import setting from "./modules/setting";

const store = createStore({
  modules: {
    todo: todo,
    auth: auth,
    task: task,
    setting: setting,
  },
});

export default store;
