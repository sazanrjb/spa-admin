import { getAuthHeader } from "@/helpers";
import { API_HOST } from "@/configs";
import axios from "axios";
require('promise.prototype.finally').shim();

const httpClient = axios.create({
  baseURL: API_HOST,
  headers: {
    common: getAuthHeader()
  }
});

export default httpClient;
