import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-backend-322cf.firebaseio.com"
});

export default instance;
