<template>
  <v-layout row wrap>
    <v-flex>
      <v-card>
        <v-card-title>
          <span v-if="isCreateComponent">Create an user</span>
          <span v-else>Update an user</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-layout row wrap>
              <v-flex xs12 sm6 md3>
                <v-select
                  class="required"
                  :items="titles"
                  label="Title"
                  item-text="text"
                  item-value="id"
                  v-model="title"
                  filled
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field
                  class="required"
                  label="First name"
                  v-model="first_name"
                  filled
                  :counter="15"
                  :error-messages="firstNameErrors"
                  @input="$v.first_name.$touch()"
                >
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md3>
                <v-text-field
                  label="Last name"
                  v-model="last_name"
                  filled
                  :counter="15"
                  class="required"
                  :error-messages="lastNameErrors"
                  @input="$v.last_name.$touch()"
                >
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md3>
                <v-text-field
                  class="required"
                  label="Email"
                  v-model="email"
                  :error-messages="emailErrors"
                  @blur="$v.email.$touch()"
                  type="email"
                  filled
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field
                  label="Contact number (+947xxxxxxxx)"
                  counter="12"
                  v-model="contact_number"
                  :error-messages="contactNumberErrors"
                  @blur="$v.contact_number.$touch()"
                  filled
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-select
                  class="required"
                  :items="roles"
                  item-text="text"
                  item-value="value"
                  label="Role"
                  v-model="role"
                  filled
                  required
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password"
                  class="required"
                  filled
                  :counter="15"
                  :error-messages="passwordErrors"
                  @blur="$v.password.$touch()"
                  v-if="isCreateComponent"
                >
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md3>
                <v-text-field
                  label="Confirm password"
                  type="password"
                  class="required"
                  v-model="confirm_password"
                  filled
                  :disabled="is_disable"
                  :counter="15"
                  :error-messages="confirmPasswordErrors"
                  v-if="isCreateComponent"
                  @blur="$v.confirm_password.$touch()"
                >
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm12 md12>
                <v-textarea
                  label="Notes"
                  v-model="notes"
                  filled
                  :counter="200"
                  :error-messages="notesErrors"
                  @input="$v.notes.$touch()"
                >
                </v-textarea>
              </v-flex>

              <v-flex xs12 sm12 md12>
                <v-subheader> IN CASE OF EMERGENCY </v-subheader>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Contact person"
                  v-model="emergency_contact_person"
                  :error-messages="contactPersonErrors"
                  @input="$v.emergency_contact_person.$touch()"
                  filled
                  :counter="15"
                >
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Contact number (+947xxxxxxxx)"
                  counter="12"
                  v-model="emergency_contact_number"
                  :error-messages="emerContactNumberErrors"
                  @blur="$v.emergency_contact_number.$touch()"
                  filled
                >
                </v-text-field>
              </v-flex>

              <v-flex>
                <v-subheader>Permissions</v-subheader>
                <v-layout row>
                  <v-flex xs12 sm12 md3 v-for="(item, i) in routes" :key="i">
                    <v-checkbox
                      :value="item.path"
                      :label="item.name"
                      v-model="selectedRoutes"
                    ></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12 sm12 md12>
                <v-alert :type="alertType" v-model="isAlert" dismissible>{{
                  response
                }}</v-alert>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="success"
            :disabled="$v.$invalid"
            v-if="isCreateComponent"
            @click="addUser()"
          >
            create
          </v-btn>
          <v-btn
            v-else
            class="warning"
            :disabled="$v.$invalid"
            else
            @click="update()"
          >
            update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

import {
  required,
  maxLength,
  minLength,
  alpha,
  email,
  sameAs,
} from "vuelidate/lib/validators";

const contactNumberValidator = (value) => {
  const mobileRegx = /^\+94[0-9]{9}$/;
  return mobileRegx.test(value);
};

const alwaysOK = { OK: () => true };
import routes from "../../router/routes";

export default {
  mounted() {
    if (this.$route.query.id) {
      this.isCreateComponent = false;
      this.readById(this.$route.query.id);
    }
    this.routes = routes.filter((e) => !e.ignore);
  },
  validations() {
    return {
      role: { required },
      title: { required },
      first_name: { required, alpha, maxLength: maxLength(15) },
      last_name: { required, alpha, maxLength: maxLength(15) },
      email: { required, email },

      contact_number: this.contact_number
        ? {
            contactNumberValidator,
          }
        : alwaysOK,

      notes: { maxLength: maxLength(200) },
      password: this.isCreateComponent
        ? { required, minLength: minLength(6), maxLength: maxLength(15) }
        : alwaysOK,
      confirm_password: this.isCreateComponent
        ? { sameAs: sameAs("password") }
        : alwaysOK,
      emergency_contact_person: { alpha, maxLength: maxLength(15) },
      emergency_contact_number: this.emergency_contact_number
        ? { contactNumberValidator }
        : alwaysOK,
    };
  },
  computed: {
    ...mapState([ "role"]),
    firstNameErrors() {
      const errors = [];
      if (!this.$v.first_name.$dirty) return errors;
      if (!this.$v.first_name.required) errors.push("First name is required.");
      if (!this.$v.first_name.alpha) {
        errors.push("First name can contain only alphabet characters.");
      }
      if (!this.$v.first_name.maxLength) {
        errors.push("Maximum characters for the first name is 15.");
      }
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.last_name.$dirty) return errors;
      if (!this.$v.last_name.required) errors.push("Last name is required.");
      if (!this.$v.last_name.alpha)
        errors.push("Last name can contain only alphabet characters.");
      if (!this.$v.last_name.maxLength)
        errors.push("Maximum characters for the last name is 15.");
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.required) errors.push("Email is required.");
      if (!this.$v.email.email) errors.push("Please enter a valid email.");
      return errors;
    },
    notesErrors() {
      const errors = [];
      if (!this.$v.notes.$dirty) return errors;
      if (!this.$v.notes.maxLength)
        errors.push("Maximum characters for the notes is 200.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required) errors.push("Password is required.");
      if (!this.$v.password.minLength)
        errors.push("Length for a valid password is 6 to 15.");
      if (!this.$v.password.maxLength)
        errors.push("Length for a valid password is 6 to 15.");
      return errors;
    },
    is_disable() {
      if (this.$v.password.$dirty && !this.$v.password.$errors) return false;
      return true;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirm_password.$dirty) return errors;
      if (!this.$v.confirm_password.sameAs)
        errors.push("Password not matched.");
      return errors;
    },
    contactPersonErrors() {
      const errors = [];
      if (!this.$v.emergency_contact_person.$dirty) return errors;
      if (!this.$v.emergency_contact_person.alpha) {
        errors.push("Contact person can contain only alphabet characters.");
      }
      if (!this.$v.emergency_contact_person.maxLength) {
        errors.push("Maximum characters for the contact person is 15.");
      }
      return errors;
    },
    contactNumberErrors() {
      const errors = [];
      if (!this.$v.contact_number.$dirty) return errors;
      if (!this.$v.contact_number.contactNumberValidator) {
        errors.push("Please enter a valid contact number.");
      }
      return errors;
    },
    emerContactNumberErrors() {
      const errors = [];
      if (!this.$v.emergency_contact_number.$dirty) return errors;
      if (!this.$v.emergency_contact_number.contactNumberValidator) {
        errors.push("Please enter a valid contact number.");
      }
      return errors;
    },
  },
  data() {
    return {
      selectedRoutes: [],
      routes: [],
      role: "qa",
      title: true,
      first_name: "",
      last_name: "",
      email: "",
      contact_number: "",
      notes: "",
      password: "",
      emergency_contact_person: "",
      emergency_contact_number: "",
      titles: [
        { text: "Mr", id: true },
        { text: "Ms", id: false },
      ],
      roles: [
        { text: "Admin", value: "admin" },
        { text: "QA", value: "qa" },
        { text: "Project Manager", value: "manager" },
        { text: "Developer", value: "dev" },
      ],
      confirm_password: "",
      isAlert: false,
      alertType: "success",
      response: "",
      isCreateComponent: true,
      id: null,
    };
  },
  methods: {
    async addUser() {
      try {
        await this.$http.post("user", {
          role: this.role,
          title: this.title,
          first_name: this.first_name,
          last_name: this.last_name,

          email: this.email,

          contact_number: this.contact_number,
          notes: this.notes,
          password: this.password,
          emergency_contact_person: this.emergency_contact_person,
          emergency_contact_number: this.emergency_contact_number,
          permissions: this.selectedRoutes.join(),
        });
        this.$refs.form.reset();
        this.$v.$reset();
        this.response = "User created successfully!";
        this.alertType = "success";
        this.isAlert = true;
      } catch (error) {
        if (error.response && Number(error.response.status) === 422) {
          this.response = "This Email already exists.";
          this.alertType = "error";
          this.isAlert = true;
        } else {
          this.response = "Oops! Something went wrong.";
          this.alertType = "error";
          this.isAlert = true;
        }
      }
    },
    async readById(id) {
      try {
        const data = await this.$http.get(`user/readById/${id}`);

        this.id = data.data.id;
        this.role = data.data.role;
        this.title = data.data.title;
        this.first_name = data.data.first_name;
        this.last_name = data.data.last_name;
        this.email = data.data.email;
        this.contact_number = data.data.contact_number;
        this.notes = data.data.notes;

        this.emergency_contact_person = data.data.emergency_contact_person;
        this.emergency_contact_number = data.data.emergency_contact_number;
        this.selectedRoutes = data.data.permissions.split(",");
      } catch (error) {
        this.response = "Error! While loading the data from API.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async update() {
      try {
        await this.$http.put("user", {
          role: this.role,
          title: this.title,
          first_name: this.first_name,
          last_name: this.last_name,

          email: this.email,

          contact_number: this.contact_number,
          notes: this.notes,

          emergency_contact_person: this.emergency_contact_person,
          emergency_contact_number: this.emergency_contact_number,
          id: this.id,
          permissions: this.selectedRoutes.join(),
        });

        this.$router.push("/update-staff");
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>
