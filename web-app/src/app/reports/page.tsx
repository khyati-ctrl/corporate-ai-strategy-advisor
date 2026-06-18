"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Sidebar from "@frontend/components/Sidebar";
import TopBar from "@frontend/components/TopBar";
import { ReportService, ReportRecord } from "@backend/services/report.service";
import { FileText, Download, FileSpreadsheet, AlertCircle } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await ReportService.getAllReports();
        setReports(data);
      } catch (error) {
        console.error("Failed to load reports:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const handleDownload = (url: string | null, e: React.MouseEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // In a real app, this would trigger a file download from S3 or similar.
    // For now we mock it with an alert since the endpoints are mock.
    alert(`Downloading file from: ${url}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar
          title="Generated Reports"
          subtitle="Access and export all your finalized AI strategy documentation"
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {loading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 border border-gray-200 rounded-xl animate-pulse">
                  <div className="h-5 bg-gray-200 w-1/3 mb-4 rounded" />
                  <div className="h-4 bg-gray-200 w-2/3 mb-4 rounded" />
                  <div className="flex gap-4 mt-6">
                    <div className="h-10 bg-gray-200 w-32 rounded-lg" />
                    <div className="h-10 bg-gray-200 w-32 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <FileText className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Reports Found</h3>
              <p className="text-sm">You haven't generated any exportable reports yet.</p>
              <p className="text-sm mt-1">Run an analysis first to generate your executive summaries.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {reports.map((report) => (
                <div key={report.id} className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row justify-between gap-6 lg:items-start">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                          <FileText size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-gray-900">{report.title}</h3>
                          <p className="text-xs font-bold text-gray-500 tracking-wider uppercase">
                            Generated on {format(new Date(report.createdAt), "MMMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                        {report.summary}
                      </p>
                    </div>

                    <div className="flex gap-3 lg:flex-col sm:flex-row flex-col shrink-0">
                      <button 
                        onClick={(e) => handleDownload(report.pdfUrl, e)}
                        className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                          report.pdfUrl 
                            ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 cursor-pointer" 
                            : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                        }`}
                        disabled={!report.pdfUrl}
                      >
                        <FileText size={16} />
                        Export PDF
                      </button>
                      
                      <button 
                        onClick={(e) => handleDownload(report.csvUrl, e)}
                        className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                          report.csvUrl 
                            ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 cursor-pointer" 
                            : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                        }`}
                        disabled={!report.csvUrl}
                      >
                        <FileSpreadsheet size={16} />
                        Export CSV
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
