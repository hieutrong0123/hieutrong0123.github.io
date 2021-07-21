import api from "./api_json";

const getAll = () => api.get(`${api.url.categorylink}`);
const getbyId = id =>api.get(`${api.url.categorylink}/${id}`);
const updatebyId =  data => api.put(`${api.url.categorylink}/update`,data);
const create = data => api.post(`${api.url.categorylink}/create`,data);

export default {
  getAll,
  getbyId,
  updatebyId,
  create
};