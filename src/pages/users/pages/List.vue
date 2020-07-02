<template>
  <div>
    <page-heading>
      User
      <template slot="actions">
        <div class="text-end">
          <v-btn icon outlined color="primary" @click="addUser">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
    </page-heading>
    <v-skeleton-loader
      v-if="loading"
      ref="skeleton"
      :boilerplate="false"
      type="table-thead, table-tbody"
      class="mx-auto"
    ></v-skeleton-loader>
    <v-simple-table v-else>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Role</th>
            <th class="text-left">Company</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody v-if="users.length">
          <tr v-for="item in users" :key="item.id">
            <td>{{item.name}}</td>
            <td>{{item.email}}</td>
            <td>{{item.role}}</td>
            <td>{{item.company && item.company.name}}</td>
            <td>
              <v-btn icon color="primary" @click="editUser(item.id)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
        <tfoot v-else>
          <v-container class="caption">No records found</v-container>
        </tfoot>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import PageHeading from "@/components/PageHeading.vue";
// import { getUsers } from "../api/calls";
export default {
  name: "UserList",
  components: {
    PageHeading
  },
  data() {
    return {
      users: [],
      loading: false,
      selectedUser: null,
      params: {}
    };
  },
  //   watch: {
  //     params() {
  //       this.fetchUsers();
  //     }
  //   },
  created() {
    // this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.loading = true;
      //   getUsers()
      //     .then(({ data }) => {
      //       this.users = data;
      //       this.loading = false;
      //     })
      //     .catch(() => {
      //       this.$notify("Unable to fetch users", "error");
      //       this.loading = false;
      //     });
    },
    addUser() {
      this.$router.push({ name: "UserForm" });
    },
    editUser(id) {
      this.$router.push({ name: "UserForm", params: { id } });
    }
  }
};
</script>