import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://18.233.111.199:8000",
  baseURL: "http://localhost:8000",
});

export default apiClient;
