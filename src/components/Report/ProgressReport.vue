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
                      :disabled="!startDate ? true : false"
                      :max="new Date().toISOString()"
                       
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
    <v-flex xs12 sm12 md12>
      <my-chart :chartdata="chartdata" :options="options" v-if="loaded" />
    </v-flex>
  </v-layout>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";

import MyChart from "../bugs/MyChart";

export default {
  components: {
    MyChart,
  },

  validations() {
    return {
      startDate: { required },
      endDate: { required },
    };
  },
  data() {
    return {
      startDate: "2021-11-04",
      myDate: "",
      endDate: "",
      loaded: false,
      chartdata: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    async create() {
      try {
        this.chartdata = null;
        this.loaded = false;
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
        const { data } = await this.$http.post(
          "reports/progressReport",
          formData
        );

        const labels = data.results.map((e) => e.name);

        const datasets2 = [];
        data.results.forEach((element) => {
          const avg = element.avg;
          datasets2.push({
            label: element.name,
            data: [avg],
          });
        });

        const chartdata = {
          labels,
          datasets: datasets2,
        };
        this.chartdata = chartdata;
        this.loaded = true;
        if (data.length === 0) {
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
  // mounted() {
  //   this.renderChart(this.chartdata, this.options);
  // },
};
</script>
