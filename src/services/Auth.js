import { postLogin } from "@/api/calls";

class Auth {
  attempt(credentials) {
    return postLogin(credentials)
      .then(({ data }) => {
        localStorage.setItem("auth_token", data.access);
        return this.payload(data.access);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("auth_token");
      });
  }

  payload(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  check() {
    return !!localStorage.getItem("auth_token");
  }
}

export default new Auth();