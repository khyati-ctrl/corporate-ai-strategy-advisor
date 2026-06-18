"use client";

import React, { useState } from "react";
import Sidebar from "@frontend/components/Sidebar";
import TopBar from "@frontend/components/TopBar";
import { ThemeToggle } from "@frontend/components/ThemeToggle";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Filter } from "lucide-react";

// Mock Data
const roiData = [
  { name: "Healthcare", min: 120, avg: 145, max: 210 },
  { name: "Finance", min: 140, avg: 175, max: 240 },
  { name: "Retail", min: 90, avg: 115, max: 150 },
  { name: "Tech", min: 160, avg: 200, max: 300 },
  { name: "Manufacturing", min: 110, avg: 135, max: 180 },
];

const industryRadarData = [
  { subject: "Data Readiness", A: 120, B: 110, fullMark: 150 },
  { subject: "Budget", A: 98, B: 130, fullMark: 150 },
  { subject: "Leadership", A: 86, B: 130, fullMark: 150 },
  { subject: "Tech Stack", A: 99, B: 100, fullMark: 150 },
  { subject: "Talent", A: 85, B: 90, fullMark: 150 },
  { subject: "Process", A: 65, B: 85, fullMark: 150 },
];

const useCaseData = [
  { name: "Chatbots", value: 400 },
  { name: "Predictive Analytics", value: 300 },
  { name: "Process Automation", value: 300 },
  { name: "Fraud Detection", value: 200 },
  { name: "Computer Vision", value: 100 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8b5cf6"];

const readinessTrendData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 70 },
  { month: "Apr", score: 75 },
  { month: "May", score: 79 },
  { month: "Jun", score: 82 },
];

export default function AnalyticsPage() {
  const [industryFilter, setIndustryFilter] = useState("All");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <TopBar
          title="Analytics"
          subtitle="Deep dive into AI strategy metrics and industry benchmarks."
          actions={
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          }
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Filters */}
          <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter size={18} className="text-muted-foreground" />
              <span className="font-semibold text-sm">Industry Filter:</span>
              <select 
                value={industryFilter} 
                onChange={e => setIndustryFilter(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-1.5 text-sm font-medium"
              >
                <option value="All">All Industries</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Retail">Retail</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* ROI Predictions (BarChart) */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="text-lg font-bold mb-4">ROI Predictions by Industry</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer>
                  <BarChart data={roiData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px" }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="min" fill="#94a3b8" name="Min ROI %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="avg" fill="#3b82f6" name="Avg ROI %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="max" fill="#10b981" name="Max ROI %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Readiness Trend (LineChart) */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="text-lg font-bold mb-4">AI Readiness Trend (H1 2026)</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer>
                  <LineChart data={readinessTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px" }} />
                    <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} activeDot={{ r: 8 }} name="Readiness Score" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Industry Comparison (RadarChart) */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="text-lg font-bold mb-4">Industry Comparison</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={industryRadarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--foreground)", fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar name="Healthcare" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                    <Radar name="Finance" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Use Case Distribution (PieChart) */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="text-lg font-bold mb-4">Top AI Use Cases</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={useCaseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {useCaseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
