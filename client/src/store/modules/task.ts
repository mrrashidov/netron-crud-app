import { Module } from "vuex";

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
  actions: {},
  mutations: {},
};

export default task;
