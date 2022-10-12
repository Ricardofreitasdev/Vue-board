<template>
  <div v-if="isOpen">
    <div class="modal">
      <button class="modal__close" @click="$emit('onClickCard')">
        <i class="fa-solid fa-close"></i>
      </button>

      <input type="text" :value="card.title" />

      <div v-if="lists.length > 1">
        <p>Mover para</p>
        <select v-model="selected">
          <option
            v-for="list in lists"
            :key="list.id"
            :value="list.title"
            :disabled="list.id === card.listID"
            v-show="shouldShowSelect(list.id)"
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
          <ProgressBar
            :total="this.card.taskLength()"
            :done="this.card.tasksDone()"
          />
          <div v-for="task in card.task" :key="task.id">
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
import ProgressBar from "./ProgressBar.vue";

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
      this.selected = "";
    },
    createTask() {
      const task = new ModelTask(this.task);
      this.card.setTask(task);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.card);
      this.task = "";
    },
    updateStatusTask(event, taskId) {
      this.card.updateTask(event, taskId);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.card);
    },
    shouldShowSelect(id) {
      return id !== this.card.listID;
    },
  },
  components: { ProgressBar },
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.modal {
  position: absolute;
  width: 400px;
  height: 400px;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  padding: 25px;
  background: $bg-secondary;
  border-radius: 16px;
  z-index: 1;

  &__close {
    position: absolute;
    right: 15px;
    top: 15px;
    border: none;
    background: none;
    padding: 10px;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    background: $bg-light;

    i {
      height: 11px;
    }
  }

  &-bg {
    background: black;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    opacity: 0.5;
  }

  @media (max-width: $v2) {
    width: 90%;
    height: 90%;
    left: 5%;
    top: 5%;
  }
}
</style>
