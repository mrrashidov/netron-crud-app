import { Module } from "vuex";

interface IProfile {
  id: Number;
  first_name: String;
  last_name: String;
  avatar: String;
  status: String;
  email: String;
}

interface IState {
  profile: IProfile | {};
}

const initState: IState = {
  profile: JSON.parse(localStorage.getItem("user")),
};

const auth: Module<any, any> = {
  state: initState,
  getters: {},
  actions: {
    LOGIN: ({ commit }, payload) => {

      const localData = localStorage.getItem("user");
      commit("SET_LOGIN", payload);
     
      
    },
  },
  mutations: {
    SET_LOGIN: (state, data) => {
      localStorage.setItem("user", JSON.stringify(data))
      state.profile = data
    },
  },
};

export default auth;
