import apiClient from "../utils/apiClient";

export const accountService = {
  createAccount: async (accountData) => {
    try {
      // Aseguramos que initialBalance sea un número
      const data = {
        ...accountData,
        initialBalance: Number(accountData.initialBalance)
      };
      
      console.log("Datos enviados al servidor:", data);
      const response = await apiClient.post('/trading-accounts', data);
      return response.data;
    } catch (error) {
      console.error("Error creating account:", error.response?.data || error);
      throw error;
    }
  },
    
  getAccountsByUserId: async (userId) => {
    try {
      const response = await apiClient.get(`/trading-accounts/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching accounts for user ${userId}:`, error);
      throw error;
    }
  },
  
  updateAccount: async (id, accountData) => {
    try {
      const response = await apiClient.put(`/trading-accounts/${id}`, accountData);
      return response.data;
    } catch (error) {
      console.error(`Error updating account ${id}:`, error);
      throw error;
    }
  },
  
  deleteAccount: async (id) => {
    try {
      const response = await apiClient.delete(`/trading-accounts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting account ${id}:`, error);
      throw error;
    }
  }
};