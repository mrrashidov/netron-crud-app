import { Module } from "vuex";

interface IState {
  token: String | null;
}

const initState: IState = {
  token: localStorage.getItem("token"),
};

const auth: Module<any, any> = {
  state: initState,
  getters: {},
  actions: {
    LOGIN: ({ commit }, payload) => {
      commit("SET_LOGIN", payload);
    },
    LOGOUT: ({ commit }) => commit("SET_LOGOUT"),
  },
  mutations: {
    SET_LOGIN: (state, data) => {
      localStorage.setItem("token", data);
      state.token = data;
    },
    SET_LOGOUT: (state, data) => {
      localStorage.removeItem("token");
      state.token = data;
    },
  },
};

export default auth;
