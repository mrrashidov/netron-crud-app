import { createStore } from "vuex";
import todo from "./modules/todo";
import auth from "./modules/auth";
import task from "./modules/task";

const store = createStore({
  modules: {
    todo: todo,
    auth: auth,
    task: task
  },
});

export default store;
