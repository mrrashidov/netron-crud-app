import { Module } from "vuex";
import { useQuery, useMutation } from "villus";

interface ITask {
  id: Number;
  user_id: Number;
  title: String;
  description: String;
  date: String;
  status: String;
  created_at: String;
}

interface IState {
  tasks: [ITask] | [];
  task: ITask | {};
}

const initState: IState = {
  tasks: [],
  task: {},
};

const task: Module<any, any> = {
  state: initState,
  getters: {},
  actions: {
    GET_TASKS: ({ commit }, payload) => {
      commit("SET_GET_TASKS", payload);
    },
    ADD_TASK: ({ commit }, payload) => {
      commit("SET_ADD_TASK", payload);
    },
    DELETE_TASK: ({ commit }, payload) => {
      commit("SET_DELETE_TASK", payload);
    },
  },
  mutations: {
    SET_GET_TASKS: (state, data) => {
      state.tasks = data;
    },
    SET_ADD_TASK: async (state, data) => {
      state.task = {
        user_id: data.user_id,
        title: data.title,
        description: data.description,
        date: data.date,
        status: data.status,
      };
      state.tasks.push(state.task);
    },
    SET_DELETE_TASK: (state, data) => {
      console.log("datasadsa", data.id);

      const lastItem = state.tasks.filter((item) => item.id !== data.id);

      state.tasks = lastItem;
    },
  },
};

export default task;
