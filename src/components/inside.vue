<template>
  <v-app id="inspire"> </v-app>
</template>

<script>
import { mapState } from "vuex";
import { admin, staff, manager } from "../assets/permission.js";

export default {
  mounted() {
    switch (this.role) {
      case "admin":
        this.items = admin;
        break;
      case "manager":
        this.items = manager;
        break;
      case "staff":
        this.items = staff;
        break;
      default:
        break;
    }
  },
  computed: {
    ...mapState(["first_name", "role", "title", "last_name"]),
  },
  data: () => ({
    drawer: null,
    items: [],
  }),
  methods: {
    onClick(path) {
      this.$router.push(path);
    },
  },
  props: {
    source: String,
  },
};
</script>
