import { createStore } from "vuex";

export default createStore({
  state: {
    lists: [],
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
    ["ADDITIONAL_INFOS_CARD"](state, card) {
      state.cards[state.cards.indexOf(card.id)] = card;
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
    ["ADDITIONAL_INFOS_CARD"]({ commit }, payload) {
      commit("ADDITIONAL_INFOS_CARD", payload);
    },
    ["UPDATE_STATUS_TASK"]({ commit }, payload) {
      commit("UPDATE_STATUS_TASK", payload);
    },
  },
});
