                                                                                                                                                           import api from "./api";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Login User
export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);

    // Save JWT Token
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Get Token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check Login Status
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};