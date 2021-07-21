import api from "./api_json";

const getAll = () => api.get(`${api.url.productlink}`);
const getbyId = id =>api.get(`${api.url.productlink}/${id}`);
const updatebyId =  data => api.put(`${api.url.productlink}/update`,data);
const enablebyId = id =>api.put(`${api.url.productlink}/enable/${id}`);
const disablebyId = id =>api.put(`${api.url.productlink}/disable/${id}`);
const deletebyId = id =>api.delete(`${api.url.productlink}/delete/${id}`);
export default {
  getAll,
  getbyId,
  updatebyId,
  enablebyId,
  disablebyId,
  deletebyId
};