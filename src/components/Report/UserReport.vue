<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-card-title>USER REPORT </v-card-title>
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
              <v-flex xs12 sm6 md6>
                <v-select
                  class="required"
                  :items="roles"
                  item-text="text"
                  item-value="value"
                  label="Role"
                  v-model="role"
                  filled
                  required
                  outlined
                  multiple
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select
                  label="Status"
                  :items="userStatusList"
                  item-text="text"
                  item-value="value"
                  v-model="userStatus"
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
            name="userReport.csv"
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
      userStatus: { required },
    };
  },

  data() {
    return {
      startDate: "",
      endDate: "",
      userStatus: [],
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
      userStatusList: [
        { text: "Active", value: true },
        { text: "In-active", value: false },
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
      role: [],
      roles: [
        { text: "Admin", value: "admin" },
        { text: "QA", value: "qa" },
        { text: "Project Manager", value: "manager" },
        { text: "Developer", value: "dev" },
        { text: "Product Owner", value: "owner" },
      ],
      json_fields: {
        id: "id",
        fullName: "fullName",

        role: "role",

        email: "email",
        contact_number: "contact_number",
        notes: "notes",

        emergency_contact_person: "emergency_contact_person",
        emergency_contact_number: "emergency_contact_number",
        status: "status",

        createdAt: "createdAt",
        updatedAt: "updatedAt",
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
          userRoles: this.role,
          userStatus: this.userStatus,
        };

        if (this.$v.$invalid) {
          this.alertType = "error";
          this.response = "Please fill all the required fields.";
          this.isAlert = true;
          return;
        }

        const {data} = await this.$http.post("reports/userReport", formData);
        if (data.length === 0) {
          this.alertType = "error";
          this.response = "No data available!";
          this.isAlert = true;
          return;
        }
        return data;

        // return data.data.map((e) => {
        //   e.assignee = `${e.assigneeId.first_name} ${e.assigneeId.last_name}`;
        //   e.assignedTo = `${e.assignedToId.first_name} ${e.assignedToId.last_name}`;
        //   return e;
        // });
      } catch (error) {
        console.log(error)
        this.alertType = "error";
        this.response = "Some thing went wrong!";
        this.isAlert = true;
      }
    },
  },
};
</script>