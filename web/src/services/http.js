import axios from "axios";

const getJwt = () => {
  return localStorage.getItem("token");
};
axios.defaults.headers.common["x-auth-token"] = getJwt();

axios.interceptors.response.use(null, (err) => {
  if (err.response && err.response.status >= 403) {
    alert("An unexpected error occurred");
  }
  return Promise.reject(err);
});
const services = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
};
export default services;
