import api from "./api_json";

const getbyId = id =>api.get(`${api.url.orderdetaillink}/orderId=${id}`);
const emp_create = data => api.post(`${api.url.orderlink}/emp-create`,data);
export default {
  getbyId,
  emp_create,
};