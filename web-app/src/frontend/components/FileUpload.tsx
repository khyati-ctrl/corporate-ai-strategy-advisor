"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, File as FileIcon, X, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploadProps {
  onUploadSuccess: (url: string, metadata: any) => void;
  accept?: string;
}

export function FileUpload({ onUploadSuccess, accept = ".csv,.xlsx" }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // Basic size validation (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setStatus("error");
        setErrorMsg("File exceeds 10MB limit.");
        return;
      }
      setFile(selectedFile);
      setStatus("idle");
      setErrorMsg("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        setStatus("error");
        setErrorMsg("File exceeds 10MB limit.");
        return;
      }
      setFile(selectedFile);
      setStatus("idle");
      setErrorMsg("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate progress since fetch doesn't natively support upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 100);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Upload failed");
      }

      setProgress(100);
      const data = await res.json();
      
      setTimeout(() => {
        setStatus("success");
        onUploadSuccess(data.url, data.metadata);
      }, 500);
      
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "An error occurred during upload.");
    }
  };

  const clearFile = () => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    setErrorMsg("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={accept}
      />

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50 hover:border-primary transition-all group"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
              <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Click or drag file to upload</h4>
            <p className="text-sm text-gray-500 font-medium">Supports CSV and XLSX formats up to 10MB.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <FileIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              
              {status === "idle" && (
                <button onClick={clearFile} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
              {status === "success" && <CheckCircle2 className="w-6 h-6 text-success" />}
              {status === "error" && <AlertCircle className="w-6 h-6 text-danger" />}
            </div>

            {status === "uploading" && (
              <div className="mt-4">
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1.5">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progress}%` }} 
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm font-semibold text-red-600">
                {errorMsg}
                <button onClick={clearFile} className="ml-2 underline hover:text-red-800">Try again</button>
              </div>
            )}

            {status === "idle" && (
              <div className="mt-5 flex justify-end gap-3">
                <button 
                  onClick={clearFile}
                  className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpload}
                  className="px-5 py-2 text-sm font-bold bg-primary text-white rounded hover:bg-primary-hover shadow-sm transition-all"
                >
                  Upload File
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
