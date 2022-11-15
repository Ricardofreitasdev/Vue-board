<template>
  <div class="login">
    <form @submit.prevent="handleLogin" method="POST" class="login__form">
      <div v-if="loading">loading...</div>
      <input
        type="email"
        required
        placeholder="Digite o seu E-mail"
        v-model.trim="user.email"
      />
      <input
        type="password"
        requi
        placeholder="Digite a sua senha"
        v-model.trim="user.password"
      />
      <button class="login__form--button" type="submit">Login</button>
      <span v-if="errorMessage">
        {{ errorMessage }}
      </span>
    </form>
  </div>
</template>

<script>
import { VALID_USER_MUTATION } from "@/graphql/mutations.js";

export default {
  name: "Login",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loading: false,
      errorMessage: "",
    };
  },

  methods: {
    async handleLogin() {
      const { email, password } = this.user;

      const graphqlQuery = {
        query: VALID_USER_MUTATION,
        variables: { email, password },
      };

      this.loading = true;

      try {
        const response = await this.$http({
          method: "post",
          data: graphqlQuery,
        });

        if (response.data.data) {
          const user = response.data.data.valid;
          localStorage.setItem("token", JSON.stringify(user.token));
          this.$router.push("/board");
        }
        if (response.data.errors) {
          this.errorMessage = response.data.errors[0].message;
        }
      } catch (error) {
        console.log(error);
      }

      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;

  &__form {
    align-items: center;
    background-color: $bg-secondary;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 500px;
    padding: 16px;
    width: 100%;

    input,
    button {
      background-color: $bg-primary;
      border: 2px solid $bg-primary;
      border-radius: 4px;
      color: $color-primary;
      font-size: 14px;
      margin: 5px 0;
      min-height: 50px;
      padding: 12px;
      transition: $transition;
      width: 100%;

      &:hover,
      &:active {
        border: 2px solid $color-secondary;
      }
    }

    &--button {
      border: 2px solid $color-secondary !important;
      background-color: $color-secondary !important;
    }
  }
}
</style>
