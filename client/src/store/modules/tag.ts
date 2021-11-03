import { Module } from "vuex";
import { useQuery } from "villus";

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
  state: initState,
  getters: {},
  actions: {
    GET_TAGS: async ({ commit }, payload) => {
      console.log("datasadas", payload);
      commit("SET_GET_TAGS", payload);
    },
    ADD_TAG: ({ commit }, payload) => {
      commit("SET_ADD_TAG", payload);
    },
  },
  mutations: {
    SET_GET_TAGS: (state, data) => (state.tags = data),
    SET_ADD_TAG: async (state, data) => {
      console.log("data", data.color);
      state.tag = {
        id: data.id,
        user_id: data.user_id,
        name: data.name,
        color: data.color,
        status: data.status,
      };
      state.tags.push(state.tag);
    },
  },
};

export default tag;
