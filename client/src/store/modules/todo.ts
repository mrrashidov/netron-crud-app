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
  toggle: boolean;
  loading: boolean;
  leftBarToggle: boolean;
}
const initState: IState = {
  todos: [],
  todo: {},
  toggle: false,
  loading: true,
  leftBarToggle: false,
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
    UPDATE_TODO: ({ commit }, payload) => {
      localStorage.removeItem("todo-list");
      commit("SET_UPDATE_TODO", payload);
    },
    DELETE_TODO: ({ commit }, payload) => {
      localStorage.removeItem("todo-list");
      commit("SET_DELETE_TODO", payload);
    },
    GET_TOGGLE: ({ commit }, payload) => commit("SET_GET_TOGGLE", payload),
    UPDATE_TOGGLE: ({ commit }, payload) =>
      commit("SET_UPDATE_TOGGLE", payload),
    GET_LEFTBAR_TOGGLE: ({ commit }, payload) =>
      commit("SET_UPDATE_LEFTBAR_TOGGLE", payload),
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
    SET_DELETE_TODO: (state, id) => {
      var index = state.todos.findIndex((todoId) => todoId == id);
      state.todos.splice(index, 1);
      localStorage.setItem("todo-list", JSON.stringify(state.todos));
    },
    SET_GET_TOGGLE: (state, data) => (state.toggle = data),
    SET_UPDATE_TOGGLE: (state, data) => {
      console.log(data);
    },
    SET_UPDATE_TODO: (state, data) => {
      const existsAtIndex = state.todos.findIndex(
        (todoItem) => todoItem.id == data.id
      );
      if (existsAtIndex !== -1) {
        state.todos[existsAtIndex] = data;
        localStorage.setItem("todo-list", JSON.stringify(state.todos));
      } else {
        state.todos.push(data);
      }
    },
    SET_UPDATE_LEFTBAR_TOGGLE: (state, data) => (state.leftBarToggle = data),
  },
};
export default todo;
