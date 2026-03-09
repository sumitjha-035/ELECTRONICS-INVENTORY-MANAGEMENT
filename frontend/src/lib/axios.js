import axios from "axios";
const api = axios.create({
  baseURL: 'https://electronics-inventory-management.onrender.com'
});
export default api;
