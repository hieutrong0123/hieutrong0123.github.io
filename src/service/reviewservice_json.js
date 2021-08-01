import api from "./api_json";

const getAll = () => api.get(`${api.url.reviewlink}`);

export default {
  getAll
};