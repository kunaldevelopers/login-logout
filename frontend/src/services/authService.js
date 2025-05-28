import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost:3000/api"; // Change this for production

class AuthService {
  constructor() {
    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor to add auth token
    axios.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          await AsyncStorage.removeItem("authToken");
          await AsyncStorage.removeItem("userData");
        }
        return Promise.reject(error);
      }
    );
  }

  async signup(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, userData);

      if (response.data.data.token) {
        await AsyncStorage.setItem("authToken", response.data.data.token);
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify(response.data.data.user)
        );
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(credentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);

      if (response.data.data.token) {
        await AsyncStorage.setItem("authToken", response.data.data.token);
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify(response.data.data.user)
        );
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyToken() {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getUserData() {
    try {
      const userData = await AsyncStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return new Error(
        error.response.data.error?.message || "Server error occurred"
      );
    } else if (error.request) {
      // Request was made but no response received
      return new Error("Network error. Please check your connection.");
    } else {
      // Something else happened
      return new Error("An unexpected error occurred");
    }
  }
}

export const authService = new AuthService();
