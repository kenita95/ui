<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-card-title>Bug progress report for each project</v-card-title>
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
                  label="Developer"
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
          <v-btn class="success" :disabled="$v.$invalid" @click="create"
            >generate</v-btn
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

export default {
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
    };
  },
  methods: {
    async create() {
      try {
        console.log("startDate", this.startDate);
        console.log("endDate", this.endDate);
        console.log("bugStatus", this.bugStatus);

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
        // await this.$http.post("projects", formData);
        this.response = "Project created successfully!";
        this.alertType = "success";
        this.isAlert = true;
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>