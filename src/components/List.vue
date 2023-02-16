<template>
  <div
    class="list"
    @drop="onDrop($event, listID)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div class="list__title">
      <h4>{{ title }}</h4>
      <div v-show="totalCardsInList">
        <span><i class="fa-solid fa-list-ul"></i></span>
        <span> {{ totalCardsInList }}</span>
      </div>
    </div>
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
        :text="this.langs.general['add-new-task']"
      />
      <CreateForm
        placeholder="novo cartão"
        :show="newCard"
        :hasError="hasError"
        :error="error"
        @onValueInput="textInput"
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
import { mapState, mapActions, mapGetters } from "vuex";
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
      modalCard: null,
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
        return (this.error = this.langs.general["create-card-error"]);
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
    ...mapGetters(["langs"]),

    cardList() {
      return this.cards?.filter((card) => card.listID === this.listID);
    },
    totalCardsInList() {
      return this.cardList.length;
    },
    isEmpty() {
      return this.newCardValue === "" ? true : false;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $color-secondary;
    font-weight: bold;
    margin-bottom: 15px;

    h4 {
      text-transform: uppercase;
      font-size: 14px;
    }

    span {
      font-size: 12px;
    }

    i {
      margin-right: 5px;
    }
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
