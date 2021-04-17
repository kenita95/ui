<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <span class="headline">
              Change password
            </span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="New password"
              type="password"
              v-model="password"
              :error-messages="passwordErrors"
              @blur="$v.password.$touch()"
              outline
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="success"
              :disabled="$v.$invalid"
              @click="set_password(password)"
            >
              update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  validations: {
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(15),
    },
  },
  computed: {
    ...mapState(["id"]),
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
      password: "",
    };
  },
  methods: {
    async set_password(password) {
      try {
        const formData = {
          password,
          id: this.id,
        };

        await this.$http.put("user/change-password", formData);
        alert("Updated!");
      } catch (error) {
        alert("Update failed!");
      }
    },
  },
};
</script>
