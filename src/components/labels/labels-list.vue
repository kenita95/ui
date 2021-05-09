<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title> View and update labels </v-card-title>
        <v-card-text>
          <v-text-field label="Search" v-model="search" filled> </v-text-field>

          <v-data-table :headers="headers" :items="users" :search="search">
            <template v-slot:item.status="{ item }">
              <v-btn
                :class="{
                  error: item.status === true,
                  warning: !item.status === true,
                }"
                @click="changeStatus(item.status, item.id)"
                >{{ item.status === true ? "Inactivate" : "Activate" }}</v-btn
              >
            </template>
            <template v-slot:item.colorCode="{ item }">
            
             <v-chip :color="item.colorCode"> {{item.colorCode}}</v-chip>
            </template>
            

            <template v-slot:item.update="{ item }">
              <v-btn
                @click="
                  $router.replace({
                    path: '/update-label',
                    query: { id: item.id },
                  })
                "
                ><v-icon>edit</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    this.getProjects();
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Id", value: "id" },
        { text: "Title", value: "title" },
        { text: "Description", value: "description" },
         { text: "Color code", value: "colorCode" },
        { text: "Update", value: "update", sortable: false },
        { text: "Update status", value: "status" },
      ],
      users: [],
      isAlert: false,
      alertType: "success",
      response: "",
    };
  },
  methods: {
    async getProjects() {
      try {
        const users = await this.$http.get("projectLabels");
        this.users = users.data;
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async changeStatus(userStatus, id) {
      try {
        const status = !userStatus;

        await this.$http.put("projectLabels/status", {
          status,
          id,
        });

        this.getProjects();
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>
