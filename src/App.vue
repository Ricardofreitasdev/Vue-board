<template>
  <TopHeader v-if="!isLoginPage" />
  <div class="main" :class="{ 'login-page': isLoginPage }">
    <router-view />
  </div>
</template>

<script>
import TopHeader from "@/components/Header.vue";

export default {
  components: {
    TopHeader,
  },
  computed: {
    isLoginPage() {
      return this.$route.name === "login";
    },
  },
};
</script>

<style lang="scss">
.main {
  height: 90vh;

  &.login-page {
    height: 100vh;
  }
}
</style>
