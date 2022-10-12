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
      <CreateForm
        placeholder="novo cartão"
        :show="newCard"
        :hasError="hasError"
        :error="error"
        @valueInput="textInput"
        @onClickCreate="createCard"
        @onClickCancel="handleClick"
      />

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
import CreateForm from "./createForm.vue";

export default {
  name: "ListComponent",
  props: ["title", "listID"],
  components: {
    Card,
    ButtonNew,
    Modal,
    CreateForm,
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

    textInput(value) {
      this.newCardValue = value;
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
      console.log(event);
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
      const minLength = 3;
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
  background: $bg-secondary;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  margin: 0px 5px;
  flex-direction: column;
  border-radius: 4px;
  border: 2px solid transparent;
  transition: $transition;

  &:hover {
    border: 2px solid $bg-light;
  }

  @media (max-width: $v2) {
    min-width: 95%;
  }

  &:first-child {
    margin-left: 0px;
  }

  &__title {
    text-align: left;
    margin-bottom: 8px;
    color: $color-secondary;
    font-weight: bold;
    text-transform: uppercase;
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
