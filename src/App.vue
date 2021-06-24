<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" v-if="token" app dark>
      <v-list>
        <v-list-group
          v-for="item in items"
          v-model="item.active"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="handleRoute(subItem.path)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar class="primary" app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="white--text"
        v-if="token"
      ></v-app-bar-nav-icon>
      <v-icon color="white">note_add</v-icon>

      <v-toolbar-title class="white--text">
        Enuri Information System
        <v-chip color="secondary" text-color="white" v-if="token">
          {{ name }}
        </v-chip>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn class="success" v-if="token" @click="logout">
        logout
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container grid-list-md fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { admin } from "./assets/permission";

export default {
  mounted() {
    // this.items =
  },
  computed: {
    ...mapState(["token", "name", "permissions", "role"]),
    items() {
      if (this.role === "admin") {
        return admin;
      } else {
        return admin.filter((e) => {
          const hasOne = e.items.some((item) => {
            let p = this.permissions.join(",");
            let path = item.path;

            if (
              p.search(
                new RegExp("/create-customer/:isCustomer/:isUpdate", "i")
              ) != -1 ||
              p.search(new RegExp("/update-customer/:isCustomer", "i")) != -1
            ) {
              if (
                [
                  "/create-customer/true/false",
                  "/update-customer/true",
                  "/create-customer/false/false",
                  "/update-customer/false",
                ].includes(path)
              ) {
                return item;
              }
            }
            if (p.search(new RegExp(path, "i")) !== -1) {
              return item;
            }
          });
          if (hasOne) {
            e.items = e.items.filter((i) => {
              let p = this.permissions.join(",");
              let path = i.path;
              // console.log("p", path);

              // check customer
              if (
                [
                  "/create-customer/true/false",
                  "/update-customer/true",
                  "/create-customer/false/false",
                  "/update-customer/false",
                ].includes(path)
              ) {
                return i;
              }

              if (
                this.permissions.includes(i.path) ||
                this.permissions.join(",").search(i.path) != -1
              ) {
                return i;
              }
            });
            return e;
          }
        });
      }
    },
  },
  name: "App",
  data() {
    return {
      drawer: false,
      // items: [],
    };
  },
  methods: {
    ...mapActions(["handleCustomer"]),
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
    handleRoute(path) {
      if (String(this.$router.currentRoute.path) === String(path)) {
        return;
      }
      switch (path) {
        case "/create-customer/true/false":
          this.handleCustomer({
            isCustomer: path.split("/")[2],
            isCustomerUpdate: path.split("/")[3],
          });

          break;

        case "/create-customer/false/false":
          this.handleCustomer({
            isCustomer: path.split("/")[2],
            isCustomerUpdate: path.split("/")[3],
          });
          break;

        case "/update-customer/true":
          this.handleCustomer({
            isCustomer: "true",
            isCustomerUpdate: "true",
          });
          break;

        case "/update-customer/false":
          this.handleCustomer({
            isCustomer: "false",
            isCustomerUpdate: "false",
          });
          break;
        default:
          break;
      }
      this.$router.push(path);
    },
  },
};
</script>
