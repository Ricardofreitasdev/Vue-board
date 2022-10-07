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
        :title="card.title"
        draggable="true"
        @dragstart="startDrag($event, card)"
      />
      <button v-if="!newCard" @click="handleClick" class="list__button">
        <span>
          <i class="fa-solid fa-plus"></i>
        </span>
        <p>Adicionar nova tarefa</p>
      </button>
      <div v-if="newCard" class="list__textarea">
        <input type="text" placeholder="novo card" v-model="newCardValue" />
        <div class="list__actions">
          <button @click="createCard">enviar</button>
          <button @click="handleClick">cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Card from "@/components/Card.vue";
import utilsMixin from "@/mixins/utils";
import store from "@/store";

export default {
  name: "ListComponent",
  props: ["title", "listID"],
  mixins: [utilsMixin],
  components: {
    Card,
  },
  data() {
    return {
      newCard: false,
      newCardValue: "",
    };
  },
  methods: {
    ...mapActions[("CREATE_CARD", "CHANGE_CARD")],

    handleClick() {
      this.newCard = !this.newCard;
    },

    createCard() {
      store.dispatch("CREATE_CARD", {
        id: this.generateId(),
        title: this.newCardValue,
        listID: this.listID,
      });

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
  },
  computed: {
    ...mapState(["cards"]),

    cardList() {
      return this.cards.filter((card) => card.listID === this.listID);
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

  &__title {
    text-align: left;
    margin-bottom: 8px;
  }

  &__button {
    display: flex;
    align-items: center;
    background: none;
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 5px;
    transition: $transition;
    border-radius: 4px;
    cursor: pointer;

    span {
      margin-right: 10px;
    }

    &:hover {
      background-color: #dadadb;
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
