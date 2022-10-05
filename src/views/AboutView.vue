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
        <input type="text" v-model="newTitle" placeholder="nova lista" />
        <button @click="createList">Nova lista</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import List from "@/components/List.vue";
import { uuid } from "vue-uuid";
import store from "@/store";

export default {
  components: {
    List,
  },
  data() {
    return {
      newTitle: "",
      id: uuid.v1(),
    };
  },
  methods: {
    ...mapActions["CREATE_LIST"],
    createList() {
      store.dispatch("CREATE_LIST", {
        id: this.id,
        title: this.newTitle,
      });

      this.newTitle = "";
    },
  },
  computed: {
    ...mapState(["lists"]),
  },
};
</script>

<style lang="scss" scoped>
.about {
  padding: 32px;

  &__new {
    display: flex;
    flex-direction: column;
  }

  &__container {
    display: flex;
    width: 100%;
  }
}
</style>
