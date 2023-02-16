import { createStore } from "vuex";
import lang from "../lang/texts.json";

function updateCardStorage(data) {
  localStorage.setItem("card", JSON.stringify(data));
  return;
}

function getCardStorage() {
  const data = localStorage.getItem("card");
  return JSON.parse(data);
}

export default createStore({
  state: {
    lists: [
      {
        id: 1,
        title: "A FAZER",
      },
      {
        id: 2,
        title: "FAZENDO",
      },
      {
        id: 3,
        title: "CONCLUÍDO",
      },
    ],
    cards: getCardStorage() ?? [],
    lang: lang,
  },
  mutations: {
    ["UPDATE_LIST"](state, payload) {
      state.lists.push(payload);
    },
    ["UPDATE_CARD"](state, payload) {
      state.cards.push(payload);
      updateCardStorage(state.cards);
    },
    ["CHANGE_CARD"](state, { itemID, listID }) {
      const item = state.cards.find((card) => card.id === itemID);
      item.listID = listID;
      state.cards[state.cards.indexOf(item)] = item;
      updateCardStorage(state.cards);
    },
    ["DELETE_CARD"](state, { id }) {
      const updatedCardsAfterDelete = state.cards.filter(
        (card) => card.id !== id
      );
      state.cards = updatedCardsAfterDelete;
      updateCardStorage(state.cards);
    },
    ["ADDITIONAL_INFOS_CARD"](state, card) {
      const index = state.cards.findIndex((item) => item.id == card.id);
      state.cards[index] = card;
      updateCardStorage(state.cards);
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
    ["DELETE_CARD"]({ commit }, payload) {
      commit("DELETE_CARD", payload);
    },
    ["ADDITIONAL_INFOS_CARD"]({ commit }, payload) {
      commit("ADDITIONAL_INFOS_CARD", payload);
    },
  },

  getters: {
    langs(state) {
      return state.lang;
    },
  },
});
