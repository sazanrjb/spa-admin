import { postLogin } from "@/api/calls";
import { TOKEN_NAME } from "@/configs";

class Auth {
  attempt(credentials) {
    return postLogin(credentials)
      .then(({ data }) => {
        localStorage.setItem(TOKEN_NAME, data.access);
        return this.getPayload(data.access);
      })
      .catch(error => {
        console.error(error);
        localStorage.removeItem(TOKEN_NAME);
      });
  }

  getPayload(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  check() {
    const payload = this.getPayload(localStorage.getItem(TOKEN_NAME));

    return !!(payload && payload.email);
  }

  logout() {
    return localStorage.removeItem(TOKEN_NAME);
  }
}

export default new Auth();
