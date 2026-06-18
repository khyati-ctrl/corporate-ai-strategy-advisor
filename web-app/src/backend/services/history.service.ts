import { apiClient } from "./apiClient";

export const HistoryService = {
  async getAllHistory(): Promise<any[]> {
    const response = await apiClient.get("/history");
    return response.data;
  }
};
