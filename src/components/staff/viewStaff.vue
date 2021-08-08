<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-alert :type="alertType" v-model="isAlert" dismissible>{{
        response
      }}</v-alert>
    </v-flex>
    

    <v-flex xs12 sm12 md12>
      <v-card v-if="hasDataLoad">
        <v-card-title> View - {{ user.fullName }} </v-card-title>
        <v-card-text>
          <div class="body-2">Id : {{ user.id }}</div>
          <div class="body-2">Role : {{ user.role }}</div>
          <div class="body-2">Full name : {{ user.fullName }}</div>
          <div class="body-2">Email : {{ user.email }}</div>
          <div class="body-2">Contact number : {{ user.contact_number }}</div>
          <div class="body-2">Notes : {{ user.notes }}</div>

          <div class="body-2">
            Emergency contact person : {{ user.emergency_contact_person }}
          </div>
          <div class="body-2">
            Emergency contact number : {{ user.emergency_contact_number }}
          </div>
          <div class="body-2">
            Created date :
            {{ moment(user.createdAt).format("YYYY-MM-DD hh:mm A") }}
          </div>
          <div class="body-2">
            Status :

            <v-chip v-if="user.status" class="success">Active</v-chip>
            <v-chip v-else class="error">Inactive</v-chip>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn class="success" block @click="$router.push('/update-staff')">
            go back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    console.log("mounted")
    if (this.$route.query.id) {
      this.readById(this.$route.query.id);
    }
  },
  data() {
    return {
      user: null,
      isAlert: false,
      alertType: "success",
      response: "",
      hasDataLoad: false,
    };
  },
  methods: {
    async readById(id) {
      try {
        const data = await this.$http.get(`user/readById/${id}`);
        this.user = data.data;
        this.hasDataLoad = true;
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>
