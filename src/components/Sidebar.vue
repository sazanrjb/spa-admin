<template>
  <span>
    <v-navigation-drawer v-model="drawer" :expand-on-hover="false" :hide-overlay="true" app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-avatar color="indigo">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Superman</v-list-item-title>
            <v-list-item-subtitle>Admin</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group active-class="black--text text--accent-4">
          <v-list-item @click="navigateTo('Dashboard')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigateTo('TicketList')">
            <v-list-item-icon>
              <v-icon>mdi-ticket</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tickets</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigateTo('UserList')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item>

          <v-list-group prepend-icon="mdi-cog">
            <v-list-item-content slot="activator">
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
            <v-list-item @click="navigateTo('ChangePassword')">
              <v-list-item-action></v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Change Password</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar dark fixed app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
    </v-app-bar>
  </span>
</template>

<script>
import Auth from "@/services/Auth";

export default {
  name: "Sidebar",
  data() {
    return {
      drawer: true
    };
  },
  methods: {
    logout() {
      Auth.logout();
      this.$router.push({ name: "Login" });
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName }).catch(() => {});
    }
  }
};
</script>
