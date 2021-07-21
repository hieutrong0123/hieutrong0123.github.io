import api from "./api_json";

const deletebyId = id =>api.delete(`${api.url.productphotolink}/delete/${id}`);

export default {
  deletebyId
};