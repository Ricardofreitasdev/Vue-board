<template>
  <div class="board">
    <div class="board__container">
      <List
        v-for="list in lists"
        :key="list.id"
        :listID="list.id"
        :title="list.title"
      />
      <div class="board__new">
        <button-new
          :show="!newList"
          @onClickButton="handleClick"
          text="Nova lista"
        />
        <CreateForm
          placeholder="nova lista"
          :show="newList"
          :hasError="hasError"
          :error="error"
          @valueInput="textInput"
          @onClickCreate="createList"
          @onClickCancel="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import List from "@/components/List.vue";
import ButtonNew from "@/components/ButtonNew.vue";
import store from "@/store";
import ModelList from "@/models/list";
import CreateForm from "@/components/createForm.vue";

export default {
  components: {
    List,
    ButtonNew,
    CreateForm,
  },
  data() {
    return {
      newTitle: "",
      newList: false,
      error: "",
    };
  },
  methods: {
    ...mapActions["CREATE_LIST"],
    createList() {
      if (this.isEmpty) {
        return (this.error = "A lista não pode ficar vazia");
      }

      const list = new ModelList(this.newTitle);
      store.dispatch("CREATE_LIST", list);

      this.newList = !this.newList;
      this.error = "";
    },
    handleClick() {
      this.newList = !this.newList;
    },
    textInput(value) {
      this.newTitle = value;
    },
  },
  computed: {
    ...mapState(["lists"]),
    isEmpty() {
      return this.newTitle === "" ? true : false;
    },
    hasError() {
      return this.error.length >= 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.board {
  padding: 16px;
  height: 100%;
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

  &__new {
    display: flex;
    flex-direction: column;
    background: $bg-secondary;
    min-height: 75px;
    min-width: 270px;
    padding: 8px;
    border-radius: 4px;
  }

  &__container {
    display: flex;
    width: 100%;
  }
}
</style>
