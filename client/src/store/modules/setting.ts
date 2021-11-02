import { Module } from "vuex";

interface ISetting {
  tagToggle: Boolean;
  inputCancel: Boolean;
}

const initState: ISetting = {
  tagToggle: false,
  inputCancel: false,
};

const setting: Module<any, any> = {
  state: initState,
  getters: {},
  actions: {
    GET_TAG_TOGGLE: ({ commit }, payload) => {
      commit("SET_TAG_TOGGLE", payload);
    },
    GET_INPUT_TOGGLE: ({ commit }, payload) => {
      commit("SET_GET_INPUT_TOGGLE", payload);
    },
  },
  mutations: {
    SET_TAG_TOGGLE: (state, data) => (state.tagToggle = data),
    SET_GET_INPUT_TOGGLE: (state, data) => (state.inputCancel = data),
  },
};

export default setting;
