<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-card-title>SQA PROGRESS REPORT </v-card-title>
        <v-card-text>
          <v-form ref="project">
            <v-layout row>
              <v-flex xs12 sm12 md12>
                <v-layout row>
                  <v-flex xs12 sm12 md12>
                    <v-subheader>Month</v-subheader>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <p>Start date</p>
                    <v-date-picker
                      v-model="startDate"
                      landscape
                      :max="new Date().toISOString()"
                    >
                    </v-date-picker>
                  </v-flex>

                  <v-flex xs12 sm12 md6>
                    <p>End date</p>
                    <v-date-picker
                      v-model="endDate"
                      landscape
                      :max="new Date().toISOString()"
                      :disabled="!startDate ? true : false"
                    ></v-date-picker>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-select
                  label="QA"
                  :items="devs"
                  item-text="fullName"
                  item-value="id"
                  v-model="devsList"
                  multiple
                  outlined
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-select
                  label="Bug status"
                  :items="bugStatusList"
                  item-text="fullName"
                  item-value="id"
                  v-model="bugStatus"
                  multiple
                  outlined
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-select
                  label="Environment"
                  :items="envs"
                  item-text="text"
                  item-value="text"
                  v-model="environment"
                  outlined
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-select
                  label="Severity"
                  :items="items"
                  item-text="text"
                  item-value="text"
                  v-model="severity"
                  outlined
                ></v-select>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <!-- <v-btn class="success" :disabled="$v.$invalid" @click="create"
            >generate</v-btn
          > -->
          <JsonExcel
            class="btn"
            :fetch="create"
            :fields="json_fields"
            name="developerProgress.csv"
            type="csv"
            :style="
              $v.$invalid
                ? 'pointer-events:none;cursor: no-drop;'
                : 'pointer-events:auto;'
            "
            >Download Report</JsonExcel
          >
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
import JsonExcel from "vue-json-excel";

export default {
  components: {
    JsonExcel,
  },
  mounted() {
    this.getProjects();
  },
  validations() {
    return {
      startDate: { required },
      endDate: { required },
      bugStatus: { required },
    };
  },

  data() {
    return {
      startDate: "",
      endDate: "",
      bugStatus: [],
      isAlert: false,
      response: "",
      alertType: "success",
      bugStatusList: [
        "All",
        "Open",
        "In-progress",
        "Dev done",
        "Ready for testing",
        "Testing",
        "Re-opened",
        "Done",
        "Canceled",
      ],
      envs: [
        { text: "Production", value: "Production" },
        { text: "Staging", value: "Staging" },
        { text: "QA", value: "QA" },
      ],
      environment: "",
      items: [
        { text: "Blocker" },
        { text: "Critical" },
        { text: "Major" },
        { text: "Minor" },
        { text: "Trivial" },
        { text: "Enhancement" },
      ],
      devs: [],
      managers: [],
      devsList: [],
      severity: "",
      json_fields: {
        id: "id",
        priority: "priority",
        severity: "severity",
        environment: "environment",
        resolution: "resolution",
        existingVersion: "existingVersion",
        comment: "comment",
        datePicked: "datePicked",
        status: "status",
        fileUrl: "fileUrl",
        title: "title",
        project: "project.title",
        assignee: "assignee",
        assignedTo: "assignedTo",
      },
    };
  },
  methods: {
    async getProjects() {
      try {
        const { data } = await this.$http.get("user");
        this.devs = data.filter((e) => e.role === "qa");
        // this.devs = data.filter((e) => e.role === "dev");
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async create() {
      try {
        const formData = {
          startDate: this.startDate,
          endDate: this.endDate,
          devsList: this.devsList,
          bugStatus: this.bugStatus,
          environment: this.environment,
          severity: this.severity,
          //   componentType: "developer",
        };

        if (this.$v.$invalid) {
          this.alertType = "error";
          this.response = "Please fill all the required fields.";
          this.isAlert = true;
          return;
        }

        const data = await this.$http.post("reports/devProgress", formData);
        if (data.data.length === 0) {
          this.alertType = "error";
          this.response = "No data available!";
          this.isAlert = true;
          return;
        }

        return data.data.map((e) => {
          e.assignee = `${e.assigneeId.first_name} ${e.assigneeId.last_name}`;
          e.assignedTo = `${e.assignedToId.first_name} ${e.assignedToId.last_name}`;
          return e;
        });
      } catch (error) {
        this.alertType = "error";
        this.response = "Some thing went wrong!";
        this.isAlert = true;
      }
    },
  },
};
</script>
