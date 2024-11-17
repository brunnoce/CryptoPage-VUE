import { createStore } from 'vuex';

export default createStore({
  state: {
    userLogeado: !!localStorage.getItem('userId'),
    userId: localStorage.getItem('userId'),
    saldo: JSON.parse(localStorage.getItem('saldo')) || {
      btc: 0,
      eth: 0,
      dai: 0,
      usdt: 0,
      doge: 0,
      ada: 0,
      sol: 0,
      dot: 0,
      ltc: 0,
    },
  },
  getters: {
    isUserLoggedIn: (state) => state.userLogeado,
    getUserId: (state) => state.userId,
    getSaldo: (state) => (cryptoCode) => state.saldo[cryptoCode],
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
    actualizarSaldo(state, { cryptoCode, cantidad }) {
      if (!state.saldo[cryptoCode]) {
        state.saldo[cryptoCode] = 0; 
      }
      state.saldo[cryptoCode] += parseFloat(cantidad);
      localStorage.setItem('saldo', JSON.stringify(state.saldo));
    },
    restarSaldo(state, { cryptoCode, cantidad }) {
      if (!state.saldo[cryptoCode]) {
        state.saldo[cryptoCode] = 0; 
      }
      state.saldo[cryptoCode] -= parseFloat(cantidad);
      if (state.saldo[cryptoCode] < 0) state.saldo[cryptoCode] = 0;
      localStorage.setItem('saldo', JSON.stringify(state.saldo));
    },
  },
  actions: {
    loginUser({ commit }, userId) {
      commit('login', userId);
    },
    logoutUser({ commit }) {
      commit('logout');
    },
    comprarCripto({ commit }, { cryptoCode, cantidad }) {
      commit('actualizarSaldo', { cryptoCode, cantidad });
    },
    venderCripto({ commit }, { cryptoCode, cantidad }) {
      commit('restarSaldo', { cryptoCode, cantidad });
    },
  },
});