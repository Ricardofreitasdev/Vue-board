<template>
  <div v-if="isOpen">
    <div class="modal">
      <button class="modal__close" @click="$emit('onClickCard')">
        <i class="fa-solid fa-close"></i>
      </button>

      <div class="modal__delete">
        <button
          class="modal__delete--button"
          v-show="!modalConfirmDelete"
          @click="confirmModal"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
        <div class="modal__delete__confirm" v-show="modalConfirmDelete">
          <button class="modal__delete__confirm--delete" @click="deleteCard">
            exluir card
          </button>
          <button class="modal__delete__confirm--cancel" @click="confirmModal">
            cancelar
          </button>
        </div>
      </div>

      <label>{{ this.langs.general.title }}</label>
      <input
        class="input"
        @change="updateTitle"
        type="text"
        :placeholder="this.langs.general.title"
        :value="modelCard.title"
      />

      <div class="modal__description">
        <label>{{ this.langs.general.description }}</label>
        <textarea
          :value="modelCard.description"
          @change="createDescription"
          :placeholder="this.langs.general.title"
        ></textarea>
      </div>

      <div class="modal__list" v-if="lists.length > 1 && isMobile">
        <p>{{ this.langs.general["move-card"] }}</p>
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
          <button @click="changeCard(card, selected)">
            {{ this.langs.general.move }}
          </button>
        </div>
      </div>

      <div class="modal__tasks">
        <label>{{ this.langs.general["add-new-task"] }}</label>
        <input
          class="input"
          type="text"
          :placeholder="this.langs.general['add-new-task']"
          v-model="task"
          @keyup.enter="createTask"
        />
        <span class="modal__tasks--error" v-if="taskError">{{
          this.langs.general["create-task-error"]
        }}</span>
        <button @click="createTask">{{ this.langs.general.create }}</button>
        <div class="modal__tasks-list" v-show="this.modelCard.taskLength()">
          <ProgressBar
            :total="this.modelCard.taskLength()"
            :done="this.modelCard.tasksDone()"
          />
          <task-list :card="modelCard" />
        </div>
      </div>
    </div>
    <div class="modal-bg" @click="$emit('onClickCard')"></div>
  </div>
</template>

<script>
import store from "@/store";
import { mapActions, mapGetters, mapState } from "vuex";
import ModelCard from "@/models/card";
import ModelTask from "@/models/task";
import ProgressBar from "./ProgressBar.vue";
import utils from "../mixins/utils";
import TaskList from "./TaskList.vue";

export default {
  name: "Modal",

  mixins: [utils],

  data() {
    return {
      selected: "",
      description: "",
      tasks: [],
      task: "",
      checkedList: [],
      taskError: false,
      modalConfirmDelete: false,
    };
  },

  props: {
    card: {
      type: Object,
    },
    isOpen: {
      type: Boolean,
    },
  },

  components: { ProgressBar, TaskList },

  emits: ["onClickCard"],

  computed: {
    ...mapState(["lists", "cards", "langs"]),
    ...mapGetters(["langs"]),

    modelCard() {
      return new ModelCard(
        this.getCard?.listID,
        this.getCard?.title,
        this.getCard?.task,
        this.getCard?.id,
        this.getCard?.description
      );
    },

    getCard() {
      return this.cards?.filter((card) => card.id === this.card?.id)[0];
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

    confirmModal() {
      this.modalConfirmDelete = !this.modalConfirmDelete;
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
      this.modelCard.updateTask(status, taskId);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.modelCard);
    },

    deleteCard() {
      store.dispatch("DELETE_CARD", this.modelCard);
      this.$emit("onClickCard");
    },

    shouldShowSelect(id) {
      return id !== this.modelCard.listID;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.modal {
  position: absolute;
  width: 600px;
  height: 600px;
  left: calc(50% - 300px);
  top: calc(50% - 300px);
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

  &__hash {
    text-align: center;
    margin-bottom: 10px;
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

  textarea {
    min-height: 150px;

    @media (max-width: $v2) {
      min-height: 75px;
    }
  }

  &__delete {
    position: absolute;
    right: 50px;
    top: 15px;

    &__confirm {
      button {
        padding: 8px 16px;
        border-radius: 4px;
        border: 1px solid transparent;
        cursor: pointer;
        opacity: 0.9;
        transition: ease-in-out 0.3s;
        color: $color-primary;
        &:hover,
        &:focus {
          opacity: 1;
        }
      }

      &--cancel {
        background: $color-secondary;
        margin-left: 5px;
      }

      &--delete {
        background: $color-error;
      }
    }

    &--button {
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
        border: 1px solid $color-error;
        color: $color-error;
      }
    }

    &--confirm {
      display: flex;
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

  &__list {
    margin-bottom: 15px;
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

    &--error {
      display: block;
      margin-bottom: 10px;
      color: $color-error;
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
