<template>
  <div v-if="isOpen">
    <div class="modal">
      <button @click="$emit('onClickCard')">
        <i class="fa-solid fa-close"></i>
      </button>
      <input type="text" :value="card.title" />
      <div>
        <p>Mover para</p>
        <select v-model="selected">
          <option
            v-for="list in lists"
            :key="list.id"
            :value="list.title"
            :disabled="list.id === card.listID"
          >
            {{ list.title }}
          </option>
        </select>

        <div v-if="selected !== ''">
          <button @click="changeCard(card, selected)">atualizar</button>
        </div>
      </div>
      <div class="tasks">
        <p>criar task</p>
        <input type="text" v-model="task" />
        <button @click="createTask">criar</button>
        <div class="tasklist">
          <div v-for="task in card.task" :key="task.id">
            <p>{{ task.done }}</p>
            <input
              type="checkbox"
              :id="task.id"
              :value="task.title"
              v-model="checkedList"
              @change="updateStatusTask($event, task.id)"
            />
            <label :for="task.id">{{ task.title }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-bg"></div>
  </div>
</template>

<script>
import store from "@/store";
import { mapActions, mapState } from "vuex";
import ModelCard from "@/models/card";
import ModelTask from "@/models/task";

export default {
  name: "Modal",
  data() {
    return {
      selected: "",
      description: "",
      tasks: [],
      task: "",
      checkedList: [],
    };
  },
  props: {
    card: {
      type: ModelCard,
    },
    isOpen: {
      type: Boolean,
    },
  },
  emits: ["onClickCard"],
  computed: {
    ...mapState(["lists"]),
  },
  methods: {
    ...mapActions["ADDITIONAL_INFOS_CARD"],

    changeCard(card, title) {
      const selectedList = this.lists.find((list) => list.title == title);
      const data = {
        itemID: card.id,
        listID: selectedList.id,
      };
      store.dispatch("CHANGE_CARD", data);
      this.$emit("onClickCard");
    },
    createTask() {
      const task = new ModelTask(this.task);
      this.card.setTask(task);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.card);
    },
    updateStatusTask(event, taskId) {
      this.card.updateTask(event, taskId);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.card);
    },
  },
};
</script>

<style lang="scss">
.modal {
  position: absolute;
  width: 400px;
  height: 400px;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  padding: 25px;
  background: rgb(252, 252, 252);
  border-radius: 16px;
  z-index: 1;

  &-bg {
    background: black;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    opacity: 0.5;
  }

  @media (max-width: 800px) {
    width: 90%;
    height: 90%;
    left: 5%;
    top: 5%;
  }
}
</style>
