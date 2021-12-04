<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-card-title>Developer Progress Chart </v-card-title>
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
            </v-layout>
            <v-btn
              rounded
              color="primary"
              @click="create()"
              :disabled="$v.$invalid"
              >Developer progress</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
    <line-chart :chartdata="chartData" :options="chartOptions" />
  </v-layout>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data: () => ({
    chartData: {
      label: ["January", "February"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 20],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  validations() {
    return {
      startDate: { required },
      endDate: { required },
    };
  },
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    async create() {
      try {
        const formData = {
          startDate: this.startDate,
          endDate: this.endDate,
        };
        if (this.$v.$invalid) {
          this.alertType = "error";
          this.response = "Please fill all the required fields.";
          this.isAlert = true;
          return;
        }
        const data = await this.$http.post("reports/progressReport", formData);
        console.log(data);
        if (data.data.length === 0) {
          this.alertType = "error";
          this.response = "No data available!";
          this.isAlert = true;
          return;
        }
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
