<template>
  <v-layout>
    <v-flex xs12 sm12 md12>
      <v-card>
        <v-card-title> Create a bug </v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm12 md6>
              <v-select
                label="Bug prority"
                :items="prorityItem"
                item-text="text"
                item-value="value"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-select
                label="Assigned by"
                :items="managers"
                item-text="fullName"
                item-value="id"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-select
                label="Severity"
                :items="items"
                item-text="text"
                item-value="text"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-select
                label="Assigned To"
                :items="devs"
                item-text="fullName"
                item-value="id"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-select
                label="Environment"
                :items="envs"
                item-text="text"
                item-value="text"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-select
                label="Labels"
                :items="labels"
                item-text="title"
                item-value="id"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-select
                label="Project"
                :items="projects"
                item-text="title"
                item-value="id"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md6 v-if="role !== 'dev'">
              <v-select
                label="Resolution"
                :items="resolutions"
                item-text="text"
                item-value="value"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                label="Version"
                placeholder="Text hear"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                label="Status"
                placeholder="Text hear"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field label="Estimation Time" placeholder="Text hear">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-textarea label="Text here"></v-textarea>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-textarea label="Comment here"></v-textarea>
            </v-flex>

            <v-flex xs12 sm12 md12 justify="center">
              <v-date-picker v-model="picker" full-width></v-date-picker>
            </v-flex>
            <v-flex xs12 sm12 md12 justify="center">
              <v-file-input
                show-size
                counter
                multiple
                label="File input"
              ></v-file-input>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded color="primary" dark> Create </v-btn>
          <v-btn rounded color="red" dark> Reset </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["role"]),
  },
  mounted() {
    this.getProjects();
  },
  data: () => ({
    items: [{ text: "S1" }, { text: "S2" }, { text: "S3" }, { text: "S4" }],
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
      { text: "R1", value: "r1" },
      { text: "R2", value: "r2" },
      { text: "R3", value: "r3" },
    ],
    labels: [],
    projects: [],
    managers: [],
    devs: [],
  }),
  methods: {
    async getProjects() {
      try {
        const labels = await this.$http.get("projectLabels");
        this.labels = labels.data;
        const projects = await this.$http.get("projects");
        this.projects = projects.data;
        const { data } = await this.$http.get("user");
        this.managers = data.filter((e) => e.role === "qa");
        this.devs = data.filter((e) => e.role === "dev");
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>

