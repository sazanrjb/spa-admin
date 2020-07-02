import { postLogin, postVerifyOtp, getResendOtp } from "@/api/calls";
import { TOKEN_NAME } from "@/configs";

class Auth {
  attempt(credentials) {
    return postLogin(credentials)
      .then(({ data }) => {
        return data.token;
      })
      .catch((error) => {
        localStorage.removeItem(TOKEN_NAME);
        return Promise.reject(error);
      });
  }

  verifyOtp(token, payload = {}) {
    return postVerifyOtp(token, payload)
      .then(({ data }) => {
        localStorage.setItem(TOKEN_NAME, data.access);
        return this.getPayload(data.access);
      })
      .catch((error) => {
        localStorage.removeItem(TOKEN_NAME);
        return Promise.reject(error);
      });
  }

  resendOtp(token) {
    return getResendOtp(token)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
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
