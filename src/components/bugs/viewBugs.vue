<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title> VIEW BUGS </v-card-title>
        <v-card-text>
          <v-text-field label="Search" v-model="search" filled> </v-text-field>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            class="elevation-1"
            :search="search"
          >
            <template v-slot:item.fileUrl="{ item }">
              <a :href="item.fileUrl" v-if="item.fileUrl" target="_blank"
                >view</a
              >
            </template>
            <template v-slot:item.comments="{ item }">
              <v-btn @click="showComments(item.id)">comments</v-btn>
            </template>
            <template v-slot:item.update="{ item }">
              <v-btn
                @click="
                  $router.replace({
                    path: '/create-bug',
                    query: { id: item.id },
                  })
                "
                v-if="role !== 'dev'"
                ><v-icon>edit</v-icon></v-btn
              >
              <v-btn
                color="blue"
                v-if="
                  role === 'dev' && ['Open', 'Re-opened'].includes(item.status)
                "
                @click="update(item.id, 'In-progress')"
                >In progress</v-btn
              >
              <v-btn
                v-if="role === 'dev' && item.status === 'In-progress'"
                color="green"
                @click="update(item.id, 'Dev done')"
                >Dev done</v-btn
              >
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>

    <Comments
      :show="show"
      :comments="comments"
      :bugId="bugId"
      @reload="showComments($event)"
    />
  </v-layout>
</template>

<script>
import Comments from "../comments/Comments.vue";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["role"]),
  },
  components: {
    Comments,
  },
  mounted() {
    this.getBugs();
  },
  data() {
    return {
      headers: [
        {
          text: "Bug id",
          align: "start",
          // sortable: false,
          value: "id",
        },
        { text: "Title", value: "title" },
        { text: "Description", value: "comment" },
        { text: "Priority", value: "priority" },
        { text: "Assign From", value: "assigneeId.fullName" },
        { text: "Assign To", value: "assignedToId.fullName" },
        { text: "Severity", value: "severity" },
        { text: "Environment", value: "environment" },
        { text: "labelId", value: "labelId" },
        { text: "Project", value: "project.title" },
        { text: "Resolution", value: "resolution" },
        { text: "Existing Version", value: "existingVersion" },
        { text: "Detected Date", value: "datePicked" },
        { text: "Status", value: "status" },
        { text: "Attacments", value: "fileUrl" },
        { text: "Created Date", value: "createdDate" },
        { text: "Last Updated", value: "updatedDate" },

        { text: "Comment", value: "comments" },
        { text: "Update", value: "update" },
      ],
      bugId: null,
      items: [],
      show: false,
      search: "",
      comments: [],
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
    async showComments(id) {
      try {
        this.bugId = id;
        const { data } = await this.$http.get(`comment/${id}`);
        this.show = true;
        this.comments = data;
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
    async update(id, status) {
      try {
        const formData = {
          status,
        };
        await this.$http.put(`bugs/${id}`, formData);
        this.getBugs();
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>