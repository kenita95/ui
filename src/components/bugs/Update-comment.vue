<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
         UPDATE COMMENTS
        </v-card-title>
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
            <template v-slot:item.view="{ item }">
              <v-btn
                @click="
                  $router.replace({
                    path: '/viewStaff',
                    query: { id: item.id },
                  })
                "
                ><v-icon>remove_red_eye</v-icon></v-btn
              >
            </template>
            <template v-slot:item.update="{ item }">
              <v-btn
                @click="
                  $router.replace({ path: '/user', query: { id: item.id } })
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
    this.getAllUsers();
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Bug Id", value: "BugId" },
        { text: "commented By", value: "Priority" },
        { text: "commented Date", value: "Version" },
        { text: "commented Time", value: "AssignTo" },
        { text: "", value: "AssignBy" },
        
        //{ text: "View", value: "view", sortable: false },
        { text: "Update", value: "update", sortable: false },
        { text: "project", value: "project" },
      ],
      users: [],
      isAlert: false,
      alertType: "success",
      response: "",
    };
  },
  methods: {
    async getAllUsers() {
      try {
        const users = await this.$http.get("user");
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

        await this.$http.put("user/status", {
          status,
          id,
        });

        this.getAllUsers();
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>
