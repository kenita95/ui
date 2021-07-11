<template>
  <v-dialog v-model="show" max-width="1000">
    <v-card>
      <v-card-title class="text-h4">Comments </v-card-title>
      <v-card-text>
        <v-layout
          v-for="(chat, i) in chats"
          :key="i"
          class="mb-3 pa-3"
          row
          style="background-color: #dcdcdc"
        >
          <v-flex md1>
            <v-avatar :color="chat.color" class="white--text text-h6">{{
              chat.user
            }}</v-avatar>
          </v-flex>
          <v-flex md11>
            <p>{{ chat.text }}</p>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md12>
            <v-textarea label="Comment here" outlined></v-textarea>
            <v-btn class="primary">send</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["show", "chats"],
};
</script>

<style>
</style>