import { createStore } from 'vuex';

export default createStore({
  state: {
    userLogeado: !!localStorage.getItem('userId'),
    userId: localStorage.getItem('userId'),
  },
  getters: {
    isUserLoggedIn: (state) => state.userLogeado,
    getUserId: (state) => state.userId,
  },
  mutations: {
    login(state, userId) {
      state.userLogeado = true;
      state.userId = userId;
    },
    logout(state) {
      state.userLogeado = false;
      state.userId = null;
      localStorage.removeItem('userId');
    },
  },
  actions: {
    loginUser({ commit }, userId) {
      commit('login', userId);
    },
    logoutUser({ commit }) {
      commit('logout');
    },
  },
});