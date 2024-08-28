import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://52.54.53.206:8000",
  // baseURL: "http://localhost:8000",
});

export default apiClient;
