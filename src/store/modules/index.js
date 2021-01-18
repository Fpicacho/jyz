import index from "@/api/index/index";

const state = {
  config: null
};
const mutations = {
  SET_CONFIG(state, config) {
    state.config = config;
  }
};
const actions = {
  async getOpenID({ commit, state }, params) {
    let res = await index.getOpenID(params);
    return res;
  },
  async postPayment({ commit, state }, params) {
    let res = await index.postPayment(params);
    return res;
  },
  async getConfig({ commit, state }, params) {
    let res = await index.getConfig(params);
    commit("SET_CONFIG", res.data.data);
    return res;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
