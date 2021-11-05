import { Module } from "vuex";

interface ITag {
  id: Number;
  user_id: Number;
  name: String;
  color: String;
  status: String;
}

interface IState {
  tags: [ITag] | [];
  tag: ITag | {};
}

const initState: IState = {
  tags: [],
  tag: {},
};

const tag: Module<any, any> = {
  namespaced: true,
  state: initState,
  getters: {},
  actions: {
    GET_TAGS: async ({ commit }, payload) => {
      commit("SET_GET_TAGS", payload);
    },
    ADD_TAG: ({ commit }, payload) => {
      commit("SET_ADD_TAG", payload);
    },
    DELETE_TAG: ({ commit }, payload) => {
      console.log("delete_tag", payload);
      commit("SET_DELETE_TAG", payload);
    },
  },
  mutations: {
    SET_GET_TAGS: (state, data) => {
      state.tags = data;
    },
    SET_ADD_TAG: async (state, data) => state.tags.push(data),
    SET_DELETE_TAG: async (state, data) => {
      const deleteTag = state.tags.filter((item) => item.id !== data.id);
      state.tags = deleteTag;
    },
  },
};

export default tag;
