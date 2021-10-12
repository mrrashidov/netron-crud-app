import { Module } from "vuex";

interface TodoItem {
  id: number;
  name: string;
  description: string;
  select: string;
  price: number;
  status: boolean;
}
interface IState {
  todos: [TodoItem] | [];
  todo: TodoItem | {};
  loading: boolean;
}
const initState: IState = {
  todos: [],
  todo: {},
  loading: true,
};
const todo: Module<any, any> = {
  state: initState,
  getters: {},

  actions: {
    GET_TODOS: ({ commit }) => {
      //@ts-ignore
      const localData = localStorage.getItem("todo-list");

      if (localData) {
        const todos = JSON.parse(localData);
        commit("SET_GET_TODOS", todos);
      }
    },
    ADD_TODO: ({ commit }, payload) => {
      //TODO burasi refactor olmasi alzim
      localStorage.removeItem("todo-list");
      commit("SET_TODO", payload);
    },
    GET_TODO: ({ commit }, id) => commit("SET_GET_TODO", id),
    UPDATE_TODO: ({ commit }, payload) => commit("SET_UPDATE_TODO", payload),
  },

  /* eslint no-param-reassign: ["error", { "props": false }] */
  mutations: {
    SET_GET_TODOS: (state, data) => (state.todos = data),
    SET_TODO: (state, data) => {
      state.todos.push(data);
      localStorage.setItem("todo-list", JSON.stringify(state.todos));
    },
    SET_GET_TODO: (state, id) => {
      state.todo = state.todos.find((item) => item.findIndex(id));
    },
  },
};
export default todo;
