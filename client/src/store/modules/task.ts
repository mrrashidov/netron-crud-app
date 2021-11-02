import { Module } from "vuex";
import { useQuery } from "villus";

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
    GET_TASKS: ({ commit }) => {
      const allTask = `
      query {
        tasks{
        id
        title
        description
        date
        created_at
        }
      }
    `;

      const { data } = useQuery({
        query: allTask,
      });
      commit("SET_GET_TASKS", data);
    },
  },
  mutations: {
    SET_GET_TASKS: (state, data) => (state.tasks = data),
  },
};

export default task;
