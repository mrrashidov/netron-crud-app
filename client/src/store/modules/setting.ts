import { Module } from "vuex";

interface ISetting {
  tagToggle: Boolean;
}

const initState: ISetting = {
  tagToggle: false,
};

const setting: Module<any, any> = {
  state: initState,
  getters: {},
  actions: {
    GET_TAG_TOGGLE: ({ commit }, payload) => {
      commit("SET_TAG_TOGGLE", payload);
    },
  },
  mutations: {
    SET_TAG_TOGGLE: (state, data) => (state.tagToggle = data),
  },
};

export default setting;
