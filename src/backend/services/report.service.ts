import { apiClient } from "./apiClient";

export interface ReportRecord {
  id: string;
  title: string;
  summary: string;
  pdfUrl: string | null;
  csvUrl: string | null;
  createdAt: string;
}

export const ReportService = {
  async getAllReports(): Promise<ReportRecord[]> {
    const response = await apiClient.get("/reports");
    return response.data;
  },

  async generateReport(data: { title: string; summary: string; pdfUrl?: string; csvUrl?: string }) {
    const response = await apiClient.post("/reports", data);
    return response.data;
  }
};
