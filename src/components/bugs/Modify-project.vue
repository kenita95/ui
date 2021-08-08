<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title> View and update Project </v-card-title>
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

            <template v-slot:item.update="{ item }">
              <v-btn
                @click="
                  $router.replace({
                    path: '/modify-project',
                    query: { id: item.id },
                  })
                "
                ><v-icon>edit</v-icon></v-btn
              >
            </template>
            <template v-slot:item.fileSrc="{ item }">
              <a v-if="item.fileSrc" :href="item.fileSrc" target="_blank">View</a>
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
        { text: "ProjectId", value: "id" },
        { text: "Project title", value: "title" },
        { text: "Project manager", value: "pm.fullName" },
        { text: "Project lead", value: "lead.fullName" },
        { text: "Description", value: "description" },
        { text: "Start date", value: "startDate" },
        { text: "End date", value: "endDate" },
        { text: "File", value: "fileSrc" },
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
        const users = await this.$http.get("projects");
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

        await this.$http.put("projects/status", {
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
