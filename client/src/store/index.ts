import { createStore } from "vuex";
import todo from "./modules/todo";
import auth from "./modules/auth";

const store = createStore({
  modules: {
    todo: todo,
    auth: auth
  },
});

export default store;
