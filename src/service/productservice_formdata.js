import api from "./api_formdata";

const create = data => api.post(`${api.url.productlink}/create`,data);

export default {
  create,
};