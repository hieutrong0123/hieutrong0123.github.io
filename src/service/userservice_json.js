import api from "./api_json";

const getAll = () => api.get(`${api.url.userlink}/get-all`);
const getbyId = id =>api.get(`${api.url.userlink}/${id}`);
const create = data => api.post(`${api.url.userlink}/create`,data);
const deletebyId = id =>api.delete(`${api.url.userlink}/delete/${id}`);
const enablebyId = id =>api.put(`${api.url.userlink}/enable/${id}`);
const disablebyId = id =>api.put(`${api.url.userlink}/disable/${id}`);
const updatebyId =  data => api.put(`${api.url.userlink}/update`,data);
// const getloginhistory = (month, year) =>api.get(`${api.url.userlink}/get-login-history/m=${month}/y=${year}`);
const getloginhistory = (month, year) =>api.get(`${api.url.userlink}/get-login-history`, {params: {month: month, year: year}});

export default {
  getAll,
  getbyId,
  create,
  updatebyId,
  enablebyId,
  deletebyId,
  disablebyId,
  getloginhistory
};