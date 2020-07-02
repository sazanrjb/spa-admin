import Vue from "vue";
import Vuex from "vuex";
import userStore from "@/store/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespace: true
});

store.registerModule("auth", userStore);

export default store;
