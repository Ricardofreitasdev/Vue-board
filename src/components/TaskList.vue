<template>
  <div class="modal__tasks-list--item" v-for="task in card.task" :key="task.id">
    <checkbox
      :id="task.id"
      :done="task.done"
      @click="updateStatusTask(!task.done, task.id)"
      :title="task.title"
    />
    <button @click="deleteStatusTask(task.id)">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>
</template>

<script>
import Checkbox from "./Checkbox.vue";
import store from "@/store";
import { mapActions } from "vuex";
export default {
  name: "TaskList",
  components: { Checkbox },
  props: {
    card: {
      type: Object,
    },
  },

  emits: ["updateTask", "deleteTask"],

  methods: {
    ...mapActions["ADDITIONAL_INFOS_CARD"],

    deleteStatusTask(taskId) {
      this.card.deleteTask(taskId);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.card);
    },

    updateStatusTask(status, taskId) {
      this.card.updateTask(status, taskId);
      store.dispatch("ADDITIONAL_INFOS_CARD", this.card);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

button {
  background-color: $bg-light;
  color: $color-secondary;
  margin-left: 10px;
}
</style>
