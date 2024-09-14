import axios from "axios";

// Atualize a URL base para o backend local
const API_BASE_URL = "http://localhost:3000";

// Função para login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Função para registro
export const register = async (userData) => {
  try {
    // Certifique-se de que a URL corresponde ao endpoint correto no backend
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

// Função para obter informações sobre pets
export const getPetInfo = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pet-info/${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pet info:", error);
    throw error;
  }
};
