<template>
  <div v-if="show" class="createForm__wrapper">
    <input
      autofocus="true"
      type="text"
      :placeholder="placeholder"
      v-model="text"
      @change="onInput"
      @keyup.enter="click"
    />
    <div class="createForm__wrapper--box">
      <button class="send" @click="click">{{ this.langs.general.send }}</button>
      <button class="cancel" @click="$emit('onClickCancel')">
        {{ this.langs.general.cancel }}
      </button>
    </div>
    <div v-if="hasError" class="createForm__error">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "createForm",
  props: {
    show: Boolean,
    placeholder: String,
    hasError: Boolean,
    error: String,
  },
  data() {
    return {
      text: "",
    };
  },
  emits: ["onClickCreate", "onClickCancel", "onValueInput"],
  computed: {
    ...mapGetters(["langs"]),
  },
  methods: {
    onInput(event) {
      this.$emit("onValueInput", event.target.value);
    },
    click() {
      this.$emit("onClickCreate");
      this.text = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.createForm {
  &__wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;

    &--box {
      display: flex;
      margin-top: 5px;

      button {
        padding: 8px 16px;
        border-radius: 4px;
        border: 1px solid transparent;
        cursor: pointer;
        opacity: 0.9;
        transition: $transition;

        &:hover {
          opacity: 1;
        }

        &.send {
          background: $color-secondary;
          color: $color-primary;
          flex: 2;
          border: 1px solid $color-secondary;
        }

        &.cancel {
          background: $bg-light;
          color: $color-primary;
          flex: 0.5;
          margin-left: 5px;
          border: 1px solid $bg-light;
        }
      }
    }

    input {
      padding: 10px;
      min-height: 35px;
      background: $bg-light;
      border-radius: 4px;
      color: $color-primary;
      transition: $transition;
      border: 1px solid transparent;

      &:focus,
      &:hover {
        border: 1px solid $color-secondary;
      }
    }
  }
}
</style>
