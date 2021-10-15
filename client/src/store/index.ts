import { createStore } from "vuex";

import todo from "./modules/todo";

const store = createStore({
  modules: {
    todo: todo,
  },
});

export default store;
