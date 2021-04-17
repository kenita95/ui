<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h1>Forgot your password?</h1>
        <p>
          Usually, it happens to the human beings. Please contact your system
          administrator to reset your password
        </p>
        <v-btn @click="onGoBack">
          go back
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    onGoBack() {
      this.$router.push("/");
    },
  },
};
</script>
