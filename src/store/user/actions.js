import { getMe } from "@/pages/auth/api/calls";

export default {
  fetchMe({ commit }, credentials) {
    return getMe(credentials).then(({ data }) => {
      commit("SET_USER_DATA", data);
    });
  }
};
