<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-card-title>
          {{ isCreateComponent ? "Create a label" : "Update a label" }}
        </v-card-title>
        <v-card-text>
          <v-form ref="project">
            <v-layout row>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Title"
                  v-model="title"
                  counter="15"
                  :error-messages="titleErrors"
                  @input="$v.title.$touch()"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm12 md12>
                <v-textarea
                  label="Description"
                  v-model="description"
                  outlined
                  counter="300"
                  :error-messages="descriptionErrors"
                  @input="$v.description.$touch()"
                ></v-textarea>

                <v-radio-group row v-model="labelType">
                  <v-radio
                    label="Security"
                    value="Security"
                    color="red"
                  ></v-radio>
                  <v-radio
                    label="Feature"
                    value="Feature"
                    color="blue"
                  ></v-radio>
                  <v-radio
                    label="Maintenance"
                    value="Maintenance"
                    color="orange"
                  ></v-radio>
                  <v-radio
                    label="Think / Check"
                    value="Think / Check"
                    color="teal"
                  ></v-radio>
                  <v-radio
                    label="Design"
                    value="Design"
                    color="purple"
                  ></v-radio>
                  <v-radio
                    label="Visuals"
                    value="Visuals"
                    color="green"
                  ></v-radio>
                  <v-radio
                    label="Infrastructure"
                    value="Infrastructure"
                    color="pink"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="success"
            :disabled="$v.$invalid"
            @click="create"
            v-if="isCreateComponent"
            >create</v-btn
          >
          <v-btn class="success" :disabled="$v.$invalid" @click="update" v-else
            >update</v-btn
          >
          <v-btn class="warning" @click="$refs.project.reset()">reset</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-alert :type="alertType" v-model="isAlert" dismissible>{{
        response
      }}</v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mounted() {
    if (this.$route.query.id) {
      this.isCreateComponent = false;
      this.readById(this.$route.query.id);
    }
  },

  validations() {
    return {
      title: { required, maxLength: maxLength(15) },
      description: { maxLength: maxLength(300) },
    };
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      if (!this.$v.title.required) errors.push("Title is required.");
      if (!this.$v.title.maxLength) {
        errors.push("Maximum characters for the title is 15.");
      }
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      if (!this.$v.description.maxLength) {
        errors.push("Maximum characters for the description is 300.");
      }
      return errors;
    },
  },
  data() {
    return {
      title: "",
      description: "",
      colorCode: "",
      isAlert: false,
      alertType: "success",
      response: "",
      isCreateComponent: true,
      id: null,
      labelType: "Security",
    };
  },
  methods: {
    async create() {
      try {
        const formData = {
          title: this.title,
          description: this.description,
          colorCode: this.colorCode,
          labelType:this.labelType
        };
        await this.$http.post("projectLabels", formData);
        this.response = "Label created successfully!";
        this.alertType = "success";
        this.isAlert = true;
        this.$refs.project.reset();
        this.$v.$reset();
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async readById(proId) {
      try {
        const { data } = await this.$http.get(`projectLabels/${proId}`);
        const { id, title, description, colorCode } = data;
        this.id = id;
        this.title = title;
        this.description = description;
        this.colorCode = colorCode;
      } catch (error) {
        this.response = "Error! While loading the data from API.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async update() {
      try {
        const formData = {
          title: this.title,
          colorCode: this.colorCode,
          description: this.description,
        labelType:this.labelType
        };
        await this.$http.put(`projectLabels/update/${this.id}`, formData);
        this.$router.push("/labels-list");
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>