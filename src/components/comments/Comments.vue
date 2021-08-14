<template>
  <v-dialog v-model="show" max-width="1000">
    <v-card>
      <v-card-title class="text-h4">Comments </v-card-title>
      <v-card-text>
        <v-layout
          v-for="(chat, i) in comments"
          :key="i"
          class="mb-3 pa-3"
          row
          style="background-color: #dcdcdc"
        >
          <v-flex md12>
            <p style="font-weight: bold">{{ chat.User.fullName }}</p>
            <p>{{ chat.comment }}</p>
            <span>{{ chat.createdDate }}</span>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md12>
            <v-textarea
              label="Comment here"
              outlined
              v-model="comment"
              counter="300"
            ></v-textarea>

            <v-btn
              class="primary"
              :disabled="comment && comment.length > 300"
              @click="addComment()"
              >send</v-btn
            >
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["show", "comments", "bugId"],
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    async addComment() {
      try {
        await this.$http.post(`comment`, {
          comment: this.comment,
          bugId: this.bugId,
        });
       
        this.comment = "";
        this.$emit("reload", this.bugId);
      } catch (error) {
        this.response = "Oops! Something went wrong.";
        this.alertType = "error";
        this.isAlert = true;
      }
    },
  },
};
</script>

<style>
</style>