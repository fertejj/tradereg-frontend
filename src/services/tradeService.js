import apiClient from "../utils/apiClient";

export const tradeService = {
  createTrade: (tradeData) => {
    return apiClient.post("/trades", tradeData);
  },
};
