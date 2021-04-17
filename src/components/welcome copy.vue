<template>
  <v-layout align-center justify-center row wrap>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title class="white--text">Welcome back!</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="person"
              name="login"
              label="Login"
              type="email"
              v-model="email"
              class="required"
              :error-messages="emailErrors"
              @blur="$v.email.$touch()"
              filled
            ></v-text-field>

            <v-text-field
              id="password"
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password"
              v-model="password"
              class="required"
              :error-messages="passwordErrors"
              @blur="$v.password.$touch()"
              filled
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :disabled="$v.$invalid"
            block
            @click="handleLogin()"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-alert type="error" v-model="isAlert" dismissible>{{
        alertText
      }}</v-alert>
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

        await this.$store.dispatch("sign_in", sign_in.data);
        if (this.role === "admin") {
          this.$router.push({ path: "/dashboard" });
        } else {
          this.$router.push({ path: this.permissions[1] });
        }
      } catch (error) {
        console.log(error);
        this.alertText = "Login failed";
        this.isAlert = true;
      }
    },
  },
};
</script>
