<template>
  <v-layout row wrap align-center class="layout">
    <v-flex xs12 sm12 md12>
      <v-alert type="error" v-model="isAlert" dismissible>{{
        alertText
      }}</v-alert>
    </v-flex>
    <v-flex xs12 sm12 md9 class="l d-none d-sm-flex">
      <v-img src="../assets/welcome.jpg" width="100%"></v-img>
    </v-flex>
    <v-flex xs12 sm12 md3 class="r" :class="{ 'pa-6': height <= 400 }">
      <p>Login to start your session 📈</p>

      <v-text-field
        append-icon="person"
        name="login"
        label="Email"
        type="email"
        v-model="email"
        class="required"
        :error-messages="emailErrors"
        @blur="$v.email.$touch()"
        filled
      ></v-text-field>

      <v-text-field
        id="password"
        append-icon="lock"
        name="password"
        label="Password"
        type="password"
        v-model="password"
        class="required"
        :error-messages="passwordErrors"
        @blur="$v.password.$touch()"
        filled
      />

      <v-btn
        color="success"
        :disabled="$v.$invalid"
        block
        @click="handleLogin()"
        >Login</v-btn
      >
    </v-flex>
  </v-layout>
</template>

<script>
import {
  required,
  email,
  maxLength,
  minLength,
} from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6), maxLength: maxLength(15) },
  },
  computed: {
    ...mapState(["token", "name", "permissions", "role"]),

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Email is required");
      !this.$v.email.email && errors.push("Please enter a valid email");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Length for a valid password is 6 to 15");
      !this.$v.password.maxLength &&
        errors.push("Length for a valid password is 6 to 15");
      return errors;
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 400;
        case "md":
          return 500;
        case "lg":
          return 600;
        case "xl":
          return 800;
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
      isAlert: false,
      alertText: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const sign_in = await this.$http.post("user/login", {
          email: this.email,
          password: this.password,
        });

        console.log(1, sign_in.data);

        await this.$store.dispatch("sign_in", sign_in.data);
        console.log(3);
        if (this.role === "admin") {
          console.log("if");
          this.$router.push({ path: "/dashboard" });
        } else if (
          sign_in.data.role === "dev" &&
          sign_in.data.permissions.includes("/bugs-list")
        ) {
          this.$router.push({ path: "/bugs-list" });
        } else {
          console.log("else", this.permissions);
          this.$router.push({ path: this.permissions[1] });
        }
        console.log(2);
      } catch (error) {
        console.log("error", error);
        this.alertText = "Login failed";
        this.isAlert = true;
      }
    },
  },
};
</script>

<style scoped>
.r {
  /* background-color: blueviolet;
  height: 100%;
  width: 100%; */
}
.layout {
  height: 100%;
}

p {
  font-family: "Fredoka One", cursive;
  font-size: 2rem;
  text-align: center;
}
</style>