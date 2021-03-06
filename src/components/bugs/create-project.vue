<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-card-title>
          {{ isCreateComponent ? "Create a project" : "Update a project" }}
        </v-card-title>
        <v-card-text>
          <v-form ref="project">
            <v-layout row>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  label="Project title"
                  v-model="title"
                  counter="25"
                  :error-messages="titleErrors"
                  @input="$v.title.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-select
                  label="Project manager"
                  :items="managers"
                  item-text="fullName"
                  item-value="id"
                  v-model="managerId"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-select
                  label="Project team leader"
                  :items="devs"
                  item-text="fullName"
                  item-value="id"
                  v-model="leadId"
                ></v-select>
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
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-file-input
                  show-size
                  counter
                  multiple
                  label="File input"
                  outlined
                  @change="onUpload"
                ></v-file-input>

                <a :href="fileSrc" v-if="fileSrc" target="_blank">View file</a>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-layout row>
                  <v-flex xs12 sm12 md12>
                    <v-subheader>Project DeadLine </v-subheader>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <p>Start date</p>
                    <v-date-picker
                      v-model="startDate"
                      landscape
                      :min="new Date().toISOString()"
                    >
                    </v-date-picker>
                  </v-flex>

                  <v-flex xs12 sm12 md6>
                    <p>End date</p>
                    <v-date-picker
                      v-model="endDate"
                      landscape
                      :min="startDate"
                      :disabled="!startDate ? true : false"
                    ></v-date-picker>
                  </v-flex>
                </v-layout>
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

    this.getAllUsers();
  },

  validations() {
    return {
      title: { required, maxLength: maxLength(25) },
      managerId: { required },
      leadId: { required },
      description: { maxLength: maxLength(300) },
      startDate: { required },
      endDate: { required },
    };
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      if (!this.$v.title.required) errors.push("Title is required.");
      if (!this.$v.title.maxLength) {
        errors.push("Maximum characters for the title is 25.");
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
      managerId: "",
      leadId: "",
      description: "",
      startDate: "",
      endDate: "",
      managers: [],
      devs: [],
      isAlert: false,
      alertType: "success",
      response: "",
      isCreateComponent: true,
      id: null,
      fileSrc: "",
    };
  },
  methods: {
    async getAllUsers() {
      try {
        const { data } = await this.$http.get("user");
        this.managers = data.filter((e) => e.role === "manager");
        this.devs = data.filter((e) => e.role === "dev");
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async create() {
      try {
        const formData = {
          title: this.title,
          managerId: this.managerId,
          leadId: this.leadId,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
          fileSrc: this.fileSrc,
        };
        this.$refs.project.reset();
        this.$v.$reset();
        await this.$http.post("projects", formData);
        this.response = "Project created successfully!";
        this.alertType = "success";
        this.isAlert = true;
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async readById(proId) {
      try {
        const { data } = await this.$http.get(`projects/${proId}`);
        const {
          id,
          title,
          managerId,
          leadId,
          description,
          startDate,
          endDate,
        } = data;
        this.id = id;
        this.title = title;
        this.managerId = managerId;
        this.leadId = leadId;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
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
          managerId: this.managerId,
          leadId: this.leadId,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
          fileSrc: this.fileSrc,
        };
        await this.$http.put(`projects/update/${this.id}`, formData);
        this.$router.push("/projects-list");
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async onUpload(file) {
      file = file[0];
      try {
        const storageRef = this.$firebase.storage().ref();
        const fileRef = storageRef.child(`project/${file.name}`);
        const uploadTaskSnapshot = await fileRef.put(file);
        const fileUrl = await uploadTaskSnapshot.ref.getDownloadURL();
       
        this.fileSrc = fileUrl;
      } catch (error) {
       
        this.alertType = "error";
        this.alert = "Oops! Something went wrong.";
        this.hasAlert = true;
      }
    },
  },
};
</script>