import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Change this for production

class WhatsAppService {
  async sendLoginMessage() {
    try {
      const response = await axios.post(`${API_BASE_URL}/login-msg`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendLogoutMessage() {
    try {
      const response = await axios.post(`${API_BASE_URL}/logout-msg`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getTodayStatus() {
    try {
      const response = await axios.get(`${API_BASE_URL}/today-status`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
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

export const whatsappService = new WhatsAppService();
