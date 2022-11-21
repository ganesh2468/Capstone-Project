import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const login = async (username, password) => {
  const response = await axios
    .post(API_URL + "login", {
      username,
      password,
    });
  console.log(response.data.accessToken);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
  register
};

export default AuthService;
