import api from "./api_json";

const logout = () => api.post(`${api.url.authLink}/sign-out`);

export default {
    logout
};