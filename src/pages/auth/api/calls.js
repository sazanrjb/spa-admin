import { LOGIN, ME, RESET_PASSWORD } from "./index";
import axios from "axios";

export function postLogin(credential) {
  return axios.post(LOGIN, credential);
}

export function postResetPassword(payload = {}) {
  return axios.post(RESET_PASSWORD, payload);
}

// Authorization needed as auth header is empty in the initial load
export function getMe() {
  return axios.get(ME, {
    headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` }
  });
}