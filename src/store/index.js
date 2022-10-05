import { createStore } from "vuex";

export default createStore({
  state: {
    lists: [
      {
        id: 1,
        title: "A fazer",
      },
      {
        id: 2,
        title: "Fazendo",
      },
    ],
    cards: [],
  },
  mutations: {
    ["UPDATE_LIST"](state, payload) {
      state.lists.push(payload);
    },
    ["UPDATE_CARD"](state, payload) {
      state.cards.push(payload);
    },
    ["CHANGE_CARD"](state, { itemID, listID }) {
      const item = state.cards.find((card) => card.id === itemID);
      item.listID = listID;
      state.cards[state.cards.indexOf(item)] = item;
    },
  },
  actions: {
    ["CREATE_LIST"]({ commit }, payload) {
      commit("UPDATE_LIST", payload);
    },
    ["CREATE_CARD"]({ commit }, payload) {
      commit("UPDATE_CARD", payload);
    },
    ["CHANGE_CARD"]({ commit }, payload) {
      commit("CHANGE_CARD", payload);
    },
  },
});
