<template>
  <div class="about">
    <div class="about__container">
      <List
        v-for="list in lists"
        :key="list.id"
        :listID="list.id"
        :title="list.title"
      />
      <div class="about__new">
        <button-new
          :show="!newList"
          @onClickButton="handleClick"
          text="Nova lista"
        />
        <div v-if="newList">
          <input type="text" v-model="newTitle" placeholder="nova lista" />
          <button @click="createList">enviar</button>
          <button @click="handleClick">cancelar</button>
          <div v-if="hasError" class="list__error">
            <span>{{ error }}</span>
          </div>
        </div>
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

export default {
  components: {
    List,
    ButtonNew,
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

      if (this.isShorty) {
        return (this.error = "O titulo é muito curto");
      }

      const list = new ModelList(this.newTitle);
      store.dispatch("CREATE_LIST", list);

      this.newTitle = "";
      this.error = "";
    },
    handleClick() {
      this.newList = !this.newList;
    },
  },
  computed: {
    ...mapState(["lists"]),
    isEmpty() {
      return this.newTitle === "" ? true : false;
    },
    isShorty() {
      const minLength = 5;
      return this.newTitle.length < minLength ? true : false;
    },
    hasError() {
      return this.error.length >= 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  padding: 16px;
  height: 100%;
  overflow-y: scroll;

  &__new {
    display: flex;
    flex-direction: column;
    background: #dadadb;
    height: 75px;
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
