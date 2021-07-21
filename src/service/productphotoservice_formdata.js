import api from "./api_formdata";

const create = data => api.post(`${api.url.photoproductlink}/create`,data);

export default {
  create,
};