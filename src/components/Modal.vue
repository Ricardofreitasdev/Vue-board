<template>
  <div v-if="isOpen">
    <div class="modal">
      <button class="modal__close" @click="$emit('onClickCard')">
        <i class="fa-solid fa-close"></i>
      </button>

      <input
        class="input"
        @change="updateTitle"
        type="text"
        :value="modelCard.title"
      />

      <div class="modal__description">
        <textarea
          :value="modelCard.description"
          @change="createDescription"
          placeholder="descrição"
        ></textarea>
      </div>

      <div class="modal__list" v-if="lists.length > 1">
        <p>Mover para</p>
        <select v-model="selected">
          <option
            v-for="list in lists"
            :key="list.id"
            :value="list.title"
            :disabled="list.id === modelCard.listID"
            v-show="shouldShowSelect(list.id)"
          >
            {{ list.title }}
          </option>
        </select>

        <div v-if="selected !== ''">
          <button @click="changeCard(card, selected)">atualizar</button>
        </div>
      </div>

      <div class="modal__tasks">
        <p>criar task</p>
        <input class="input" type="text" v-model="task" />
        <span v-if="taskError">primeiro crie a sua</span>
        <button @click="createTask">criar</button>
        <div class="modal__tasks-list">
          <ProgressBar
            :total="this.modelCard.taskLength()"
            :done="this.modelCard.tasksDone()"
          />
          <div
            class="modal__tasks-list--item"
            v-for="task in modelCard.task"
            :key="task.id"
          >
            <checkbox
              :id="task.id"
              :done="task.done"
              @click="updateStatusTask(!task.done, task.id)"
              :title="task.title"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="modal-bg" @click="$emit('onClickCard')"></div>
  </div>
</template>

<script>
import store from "@/store";
import { mapActions, mapState } from "vuex";
import ModelCard from "@/models/card";
import ModelTask from "@/models/task";
import ProgressBar from "./ProgressBar.vue";
import Checkbox from "./Checkbox.vue";

export default {
  name: "Modal",
  data() {
    return {
      selected: "",
      description: "",
      tasks: [],
      task: "",
      checkedList: [],
      taskError: false,
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
    modelCard() {
      return new ModelCard(
        this.card.listID,
        this.card.title,
        this.card.task,
        this.card.id,
        this.card.description
      );
    },
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

    fnTaskError() {
      this.taskError = true;
      setTimeout(() => {
        this.taskError = false;
      }, 3000);
    },
    createTask() {
      if (!this.task) {
        this.fnTaskError();
        return;
      }

      const task = new ModelTask(this.task);
      this.modelCard.setTask(task);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.modelCard);
      this.task = "";
    },
    createDescription(event) {
      const description = event.target.value;
      this.modelCard.setDescription(description);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.modelCard);
    },
    updateTitle(event) {
      const title = event.target.value;
      this.modelCard.updateTitle(title);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.modelCard);
    },
    updateStatusTask(status, taskId) {
      console.log(status);
      this.modelCard.updateTask(status, taskId);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.modelCard);
    },
    shouldShowSelect(id) {
      return id !== this.modelCard.listID;
    },
  },
  components: { ProgressBar, Checkbox },
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
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: $bg-primary; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: $bg-secondary; /* color of the scroll thumb */
    border-radius: 8px; /* roundness of the scroll thumb */
    border: 1px solid $bg-light; /* creates padding around scroll thumb */
  }

  .input,
  textarea,
  select {
    padding: 10px;
    width: 100%;
    border-radius: 4px;
    margin: 10px 0;
    text-align: left;
    cursor: pointer;
    border: 2px solid transparent;
    transition: ease-in-out 0.3s;
    background: $bg-light;
    border: 1px solid transparent;
    transition: $transition;
    color: $color-primary;

    &:hover,
    &:focus {
      border: 1px solid $color-secondary;
    }
  }

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
    transition: $transition;
    border: 1px solid transparent;
    color: $color-primary;

    &:hover,
    &:focus {
      border: 1px solid $color-secondary;
      color: $color-secondary;
    }

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

  &__tasks {
    button {
      padding: 8px 16px;
      border-radius: 4px;
      border: 1px solid transparent;
      cursor: pointer;
      opacity: 0.9;
      transition: ease-in-out 0.3s;
      background: $color-secondary;
      color: $color-primary;
    }

    &-list {
      margin: 10px 0;

      & .progress {
        padding: 8px 0;
      }

      &--item {
        margin: 10px 0;
        display: flex;

        input {
          margin-right: 5px;
        }

        label {
          font-size: 14px;
          width: 100%;
        }
      }
    }
  }

  @media (max-width: $v2) {
    width: 90%;
    height: 90%;
    left: 5%;
    top: 5%;
  }
}
</style>
