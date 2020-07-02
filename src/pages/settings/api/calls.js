import httpClient from "@/plugins/axios";
import * as API from "./index";

export function postChangePassword(payload = {}) {
  return httpClient.post(API.CHANGE_PASSWORD, payload);
}
