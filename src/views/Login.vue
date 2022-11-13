<template>
  <div class="login">
    <form class="login__form">
      <div v-if="loading">loading...</div>
      <input type="email" v-model="user.email" />
      <input type="password" v-model="user.password" />
      <button type="submit" @click.prevent="handleLogin">Login</button>
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
          console.log(response.data.errors[0]);
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
.login {
  &__form {
    input {
      background: #fff;
    }
  }
}
</style>
