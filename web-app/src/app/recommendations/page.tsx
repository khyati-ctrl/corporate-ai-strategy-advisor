"use client";

import { useState } from "react";
import Sidebar from "@frontend/components/Sidebar";
import TopBar from "@frontend/components/TopBar";
import { ThemeToggle } from "@frontend/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, Lightbulb, Target, Compass, Briefcase, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function RecommendationsPage() {
  const [industry, setIndustry] = useState("");
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!industry || !goals) {
      toast.error("Please fill in both industry and goals");
      return;
    }
    setLoading(true);
    setRecommendations([]);
    
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, goals })
      });
      
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations || []);
      } else {
        toast.error("Failed to generate recommendations");
      }
    } catch (e) {
      toast.error("Error connecting to recommendation service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <TopBar
          title="AI Recommendations"
          subtitle="Get tailored strategic advice based on your industry and objectives."
          actions={
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          }
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Input Form */}
          <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Compass className="text-primary" /> Define Your Context
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2">Industry Sector</label>
                <div className="relative">
                  <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Finance, Healthcare, Retail"
                    className="w-full bg-background border border-border rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2">Primary Goals</label>
                <div className="relative">
                  <Target size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="e.g. Cost reduction, Automation"
                    className="w-full bg-background border border-border rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <Sparkles size={18} className="text-primary-foreground" />
                    <span className="uppercase tracking-wider text-sm">Generate Insights</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence>
              {recommendations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                    <Lightbulb className="text-yellow-500" /> Strategic Recommendations
                  </h3>
                  <div className="grid gap-6">
                    {recommendations.map((rec, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                        <h4 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">{idx + 1}</span>
                          {rec.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {rec.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  );
}
