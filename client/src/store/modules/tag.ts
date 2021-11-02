import { Module } from "vuex";
import { useQuery } from "villus";
interface IState {
  tags: [] | null;
}

const initState: IState = {
  tags: [],
};

const tag: Module<any, any> = {
  state: initState,
  getters: {},
  actions: {
    GET_TAGS: async ({ commit }) => {
      const getTags = `
        query{
          tags{
          id
          user_id
          name
          color
          }
      }
      `;

      const { data } = await useQuery({
        query: getTags,
      });
      console.log("data", data.value);
      commit("SET_GET_TAGS", data.value);
    },
  },
  mutations: {
    SET_GET_TAGS: (state, data) => (state.tags = data),
  },
};

export default tag;
