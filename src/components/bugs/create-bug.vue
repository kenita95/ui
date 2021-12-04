<template>
  <v-layout row>
    <v-flex xs12 sm12 md12>
      <v-form ref="form">
        <v-card>
          <v-card-title
            >{{ isCreateComponent ? " Create a bug" : "Update a bug" }}
          </v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Title"
                  v-model="title"
                  counter="25"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select
                  label="Bug priority"
                  :items="prorityItem"
                  item-text="text"
                  item-value="value"
                  v-model="priority"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select
                  label="Assigned by"
                  :items="managers"
                  item-text="fullName"
                  item-value="id"
                  v-model="assignee"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select
                  label="Severity"
                  :items="items"
                  item-text="text"
                  item-value="text"
                  v-model="severity"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select
                  label="Assigned To"
                  :items="devs"
                  item-text="fullName"
                  item-value="id"
                  v-model="assignedTo"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select
                  label="Environment"
                  :items="envs"
                  item-text="text"
                  item-value="text"
                  v-model="environment"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select
                  label="Label"
                  :items="labels"
                  item-text="title"
                  item-value="id"
                  v-model="labelId"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select
                  label="Project"
                  :items="projects"
                  item-text="title"
                  item-value="id"
                  v-model="projectId"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md6 v-if="role !== 'dev'">
                <v-select
                  label="Resolution"
                  :items="resolutions"
                  item-text="text"
                  item-value="value"
                  :disabled="isCreateComponent"
                  v-model="resolution"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Existing Version"
                  placeholder="Text here"
                  v-model="existingVersion"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select
                  :items="statusList"
                  v-model="status"
                  :disabled="isCreateComponent"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Estimation Time"
                  placeholder="Text here"
                  v-if="role === 'dev'"
                >
                </v-text-field>
              </v-flex>
              <!-- <v-flex xs12 sm12 md6>
              <v-textarea label="Text here"></v-textarea>
            </v-flex> -->
              <v-flex xs12 sm12 md12>
                <v-textarea label="Description" v-model="comment"></v-textarea>
              </v-flex>

              <v-flex xs12 sm12 md12 justify="center">
                <p>Detected Date</p>
                <v-date-picker v-model="datePicked" full-width></v-date-picker>
              </v-flex>
              <v-flex xs12 sm12 md4 justify="center">
                <v-file-input
                  show-size
                  label="File input"
                  @change="onUpload"
                  outlined
                ></v-file-input>
                <a :href="fileUrl" v-if="fileUrl">View file</a>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              rounded
              color="primary"
              @click="create()"
              :disabled="$v.$invalid"
              v-if="isCreateComponent"
            >
              Create
            </v-btn>
            <v-btn
              rounded
              color="warning"
              @click="update()"
              :disabled="$v.$invalid"
              v-else
            >
              Update
            </v-btn>
            <v-btn rounded color="red" @click="reset"> Reset </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-alert :type="alertType" v-model="isAlert" dismissible>{{
        response
      }}</v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  validations() {
    return {
      priority: { required },
      assignee: { required },
      severity: { required },
      assignedTo: { required },
      environment: { required },
      labelId: { required },
      projectId: { required },
      existingVersion: { required, maxLength: maxLength(10) },
      status: { required },
      comment: { maxLength: maxLength(300) },
      datePicked: { required },
      title: { required, maxLength: maxLength(25) },
    };
  },
  computed: {
    ...mapState(["role"]),
  },
  mounted() {
    this.getProjects();
    if (this.$route.query.id) {
      this.isCreateComponent = false;
      this.readById(this.$route.query.id);
    }
  },
  data: () => ({
    items: [
      { text: "Blocker" },
      { text: "Critical" },
      { text: "Major" },
      { text: "Minor" },
      { text: "Trivial" },
      { text: "Enhancement" },
    ],
    prorityItem: [
      { text: "High", value: "High" },
      { text: "Medium", value: "Medium" },
      { text: "Low", value: "low" },
    ],
    assigendBy: [],
    envs: [
      { text: "Production", value: "Production" },
      { text: "Staging", value: "Staging" },
      { text: "QA", value: "QA" },
    ],
    resolutions: [
      { text: "Done ", value: "done" },
      { text: "Fixed", value: "fixed" },
      { text: "Incomplete", value: "incomplete" },
      { text: "Can't reproduce", value: "cantReproduce" },
      { text: "Duplicate", value: "duplicate" },
      { text: "Won't Do", value: "wontdo" },
      ,
      { text: "Confirmation needed", value: "confirmationNeeded" },
    ],
    statusList: [
      "Open",
      "In-progress",
      "Dev done",
      "Ready for testing",
      "Testing",
      "Re-opened",
      "Done",
      "Canceled",
    ],
    labels: [],
    projects: [],
    managers: [],
    devs: [],
    status: "Open",
    priority: "",
    assignee: "",
    severity: "",
    assignedTo: "",
    environment: "",
    labelId: "",
    projectId: "",
    resolution: "",
    existingVersion: "",
    comment: "",
    datePicked: "",
    fileUrl: "",
    isAlert: false,
    alertType: "success",
    response: "",
    isCreateComponent: true,
    id: null,
    title: "",
  }),
  methods: {
    async getProjects() {
      try {
        const labels = await this.$http.get("projectLabels");
        this.labels = labels.data;
        const projects = await this.$http.get("projects");

        this.projects = projects.data.filter((e) => e.status === true);
        const { data } = await this.$http.get("user");
        this.managers = data.filter((e) => e.role === "qa");
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
          priority: this.priority,
          assignee: this.assignee,
          assignedTo: this.assignedTo,
          severity: this.severity,
          environment: this.environment,
          labelId: this.labelId,
          projectId: this.projectId,
          resolution: this.resolution,
          existingVersion: this.existingVersion,
          comment: this.comment,
          datePicked: this.datePicked,
          fileUrl: this.fileUrl,
          status: this.status,
          title: this.title,
        };
        await this.$http.post("bugs", formData);
        this.$refs.form.reset();
        this.$v.$reset();
        this.response = "Bug created successfully!";
        this.alertType = "success";
        this.isAlert = true;
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async onUpload(file) {
      // const file = e.target.files[0];
      try {
        const storageRef = this.$firebase.storage().ref();
        const fileRef = storageRef.child(`profile/${file.name}`);
        const uploadTaskSnapshot = await fileRef.put(file);
        const fileUrl = await uploadTaskSnapshot.ref.getDownloadURL();
        this.fileUrl = fileUrl;
      } catch (error) {
        this.alertType = "error";
        this.alert = "Oops! Something went wrong.";
        this.hasAlert = true;
      }
    },
    reset() {
      this.$refs.form.reset();

      this.$v.$reset();
    },
    async readById(proId) {
      try {
        const { data } = await this.$http.get(`bugs/${proId}`);
        this.id = proId;
        this.priority = data.priority;
        this.assignee = data.assignee;
        this.severity = data.severity;
        this.assignedTo = data.assignedTo;
        this.environment = data.environment;
        this.labelId = data.labelId;
        this.projectId = data.projectId;
        this.existingVersion = data.existingVersion;
        this.status = data.status;
        this.comment = data.comment;
        this.fileUrl = data.fileUrl;
        this.datePicked = data.datePicked;
        this.resolution = data.resolution;
        this.status = data.status;
        this.title = data.title;
      } catch (error) {
        this.response = "Error! While loading the data from API.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async update() {
      try {
        const formData = {
          priority: this.priority,
          assignee: this.assignee,
          assignedTo: this.assignedTo,
          severity: this.severity,
          environment: this.environment,
          labelId: this.labelId,
          projectId: this.projectId,
          resolution: this.resolution,
          existingVersion: this.existingVersion,
          comment: this.comment,
          datePicked: this.datePicked,
          fileUrl: this.fileUrl,
          status: this.status,
          title: this.title,
        };
        await this.$http.put(`bugs/${this.id}`, formData);
        this.$router.push("/bugs-list");
        // this.response = "Bug created successfully!";
        // this.alertType = "success";
        // this.isAlert = true;
        // this.$refs.form.reset();
        // this.$v.$reset();
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>
