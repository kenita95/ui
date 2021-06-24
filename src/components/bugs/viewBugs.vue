<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title> VIEW BUGS </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            class="elevation-1"
          >
           <template v-slot:item.fileUrl="{ item }">
             <a :href="item.fileUrl" v-if="item.fileUrl">view</a>
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
    this.getBugs();
  },
  data() {
    return {
      headers: [
        {
          text: "Bug id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Priority", value: "priority" },
        { text: "Assign From", value: "assigneeId.fullName" },
        { text: "Assign To", value: "assignedToId.fullName" },
        { text: "Severity", value: "severity" },
        { text: "Environment", value: "environment" },
        { text: "labelId", value: "labelId" },
        { text: "Project", value: "project.title" },
        { text: "Resolution", value: "resolution" },
        { text: "Existing Version", value: "existingVersion" },
        { text: "Comment", value: "comment" },
        { text: "Detected Date", value: "datePicked" },
        { text: "Status", value: "status" },
        { text: "Attacments", value: "fileUrl" },
      ],
      bugId: [
        {
          Priority: "",
          Assignfrom: 159,
          AssignTo: 6.0,
          Project: 24,
          status: 4.0,
          version: "",
          DetectedDate: "",
        },
      ],
      items: [],
    };
  },
  methods: {
    async getBugs() {
      try {
        const { data } = await this.$http.get("bugs");
        this.items = data;
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>