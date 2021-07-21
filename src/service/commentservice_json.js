import api from "./api_json";

const getAll = () => api.get(`${api.url.commentlinks}`);
const disablebyId = id =>api.put(`${api.url.commentlinks}/disable-or-enable/${id}`);
const enablebyId = id =>api.put(`${api.url.commentlinks}/disable-or-enable/${id}`);

export default {
  getAll,
  disablebyId,
  enablebyId
};