// frontend/src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3000"; // Atualize com o URL do seu backend

const api = axios.create({
  baseURL: API_URL,
});

export const createBalance = async (name, initialAmount) => {
  try {
    const response = await api.post("/balance", {
      name,
      initialAmount,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllBalances = async () => {
  try {
    const response = await api.get("/balance");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getBalanceById = async (balanceId) => {
  try {
    const response = await api.get(`/balance/${balanceId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateBalanceById = async (
  balanceId,
  name,
  initialAmount,
  remainingAmount
) => {
  try {
    const response = await api.put(`/balance/${balanceId}`, {
      name,
      initialAmount,
      remainingAmount,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteBalanceById = async (balanceId) => {
  try {
    const response = await api.delete(`/balance/${balanceId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
