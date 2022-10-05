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
      <button @click="handleClick">Adicionar um novo cartão</button>
      <div v-if="newCard">
        <input type="text" placeholder="novo card" v-model="newCardValue" />
        <button @click="createCard">enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from "vue-uuid";
import { mapState, mapActions } from "vuex";
import Card from "@/components/Card.vue";
import store from "@/store";

export default {
  name: "ListComponent",
  props: ["title", "listID"],
  components: {
    Card,
  },
  data() {
    return {
      newCard: false,
      newCardValue: "",
      id: uuid.v1(),
    };
  },
  methods: {
    ...mapActions[("CREATE_CARD", "CHANGE_CARD")],

    handleClick() {
      this.newCard = !this.newCard;
    },

    createCard() {
      store.dispatch("CREATE_CARD", {
        id: this.id,
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
      console.log("here");
      return this.cards.filter((card) => card.listID === this.listID);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: 200px;
  min-height: 250px;
  background: rgb(223, 221, 221);
  padding: 8px;
  display: flex;
  justify-content: flex-start;
  margin: 0px 5px;
  flex-direction: column;
}
</style>
