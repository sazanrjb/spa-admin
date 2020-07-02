<template>
  <router-view></router-view>
</template>

<script>
import Vue from 'vue';
import Auth from "@/services/Auth";
import { mapActions } from "vuex";

export default {
  name: 'App',
  created() {
    if (Auth.check()) {
      this.fetchMe();
    }
    this.initializePrototypes();
  },
  methods: {
    ...mapActions(["fetchMe"]),
    initializePrototypes() {
      Vue.prototype.$notify = (message, type) =>
        this.showMessage(message, type);
    },
    showMessage(message, type) {
      if (type === "error") {
        this.$toasted.show(message, {
          type: "error",
          position: "top-center",
          duration: 5000
        });
      } else {
        this.$toasted.show(message, {
          type: "success",
          position: "top-center",
          duration: 5000
        });
      }
    }
  }
};
</script>
