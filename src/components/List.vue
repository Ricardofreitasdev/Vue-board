<template>
  <div
    class="list"
    @drop="onDrop($event, listID)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div class="list__title">{{ title }}</div>
    <div class="list__wrapper">
      <Card
        v-for="card in cardList"
        :key="card.id"
        :card="card"
        draggable="true"
        @dragstart="startDrag($event, card)"
        @click="cardClick(card)"
      />
      <button-new
        :show="!newCard"
        @onClickButton="handleClick"
        text="Adicionar nova tarefa"
      />
      <div v-if="newCard" class="list__textarea">
        <input type="text" placeholder="novo card" v-model="newCardValue" />
        <div class="list__actions">
          <button @click="createCard">enviar</button>
          <button @click="handleClick">cancelar</button>
        </div>
        <div v-if="hasError" class="list__error">
          <span>{{ error }}</span>
        </div>
      </div>

      <Teleport to="body">
        <Modal :isOpen="showModal" :card="modalCard" @onClickCard="cardClick" />
      </Teleport>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Card from "@/components/Card.vue";
import store from "@/store";
import ButtonNew from "./ButtonNew.vue";
import Modal from "./Modal.vue";
import ModelCard from "@/models/card";

export default {
  name: "ListComponent",
  props: ["title", "listID"],
  components: {
    Card,
    ButtonNew,
    Modal,
  },
  data() {
    return {
      newCard: false,
      showModal: false,
      newCardValue: "",
      error: "",
      modalCard: ModelCard,
    };
  },
  methods: {
    ...mapActions[("CREATE_CARD", "CHANGE_CARD")],

    handleClick() {
      this.newCard = !this.newCard;
    },

    createCard() {
      if (this.isEmpty) {
        return (this.error = "O card não pode ficar vazio");
      }

      if (this.isShorty) {
        return (this.error = "O titulo é muito curto");
      }

      const card = new ModelCard(this.listID, this.newCardValue);
      store.dispatch("CREATE_CARD", card);

      this.restoureInitialState();
    },

    restoureInitialState() {
      this.newCard = false;
      this.newCardValue = "";
    },

    startDrag(event, item) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemID", item.id);
    },

    onDrop(event, listID) {
      const itemID = event.dataTransfer.getData("itemID");
      const data = {
        itemID,
        listID,
      };
      store.dispatch("CHANGE_CARD", data);
    },

    cardClick(card) {
      this.showModal = !this.showModal;
      this.modalCard = card;
    },
  },
  computed: {
    ...mapState(["cards"]),

    cardList() {
      return this.cards.filter((card) => card.listID === this.listID);
    },
    isEmpty() {
      return this.newCardValue === "" ? true : false;
    },
    isShorty() {
      const minLength = 5;
      return this.newCardValue.length < minLength ? true : false;
    },
    hasError() {
      return this.error.length >= 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.list {
  min-width: 270px;
  min-height: 250px;
  background: $bg-background;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  margin: 0px 5px;
  flex-direction: column;
  border-radius: 4px;

  &:first-child {
    margin-left: 0px;
  }

  &__title {
    text-align: left;
    margin-bottom: 8px;
  }

  &__textarea {
    input {
      padding: 5px;
      width: 100%;
      background: #fff;
      border-radius: 4px;
      margin-bottom: 10px;
      text-align: left;
    }
  }
}
</style>
