<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-card-title> BUG STATUS REPORT </v-card-title>
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
              <v-flex xs12 sm12 md12>
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
            name="bugStatus.csv"
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
      isAlert: false,
      response: "",
      alertType: "success",
      bugStatus: [],
      bugStatusList: [
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
      json_fields: {
        id: "id",
        priority: "priority",

        severity: "severity",

        environment: "environment",

        resolution: "resolution",
        existingVersion: "existingVersion",
        comment: "comment",

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
    async create() {
      try {
        const formData = {
          startDate: this.startDate,
          endDate: this.endDate,
          bugStatus: this.bugStatus,
        };
        if (this.$v.$invalid) {
          this.alertType = "error";
          this.alert = "Please fill all the required fields.";
          this.hasAlert = true;
          return;
        }

        const data = await this.$http.post("reports/bugStatus", formData);
        if (data.data.length === 0) {
          this.alertType = "error";
          this.alert = "No data available!";
          this.hasAlert = true;
          return;
        }

        return data.data.map((e) => {
          e.assignee = `${e.assigneeId.first_name} ${e.assigneeId.last_name}`;
          e.assignedTo = `${e.assignedToId.first_name} ${e.assignedToId.last_name}`;
          return e;
        });
      } catch (error) {
        this.alertType = "error";
        this.alert = "Some thing went wrong!";
        this.hasAlert = true;
      }
    },
  },
};
</script>