"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Lock, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatBot() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const isAuth = status === "authenticated";
  const headerBadge = isAuth ? "Enterprise AI Consultant" : "Product Guide";

  const welcomeMessage: Message = {
    id: "welcome",
    role: "assistant",
    content: isAuth
      ? "Welcome back. Advanced AI consulting features are now unlocked. How may I assist with your enterprise AI strategy today?"
      : "Welcome to the **Corporate AI Strategy Advisor** platform. I am your virtual Product Guide.\n\nHow can I help you learn about our platform?",
  };

  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);

  // Reset welcome message on auth change
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: isAuth
          ? "Welcome back. Advanced AI consulting features are now unlocked. How may I assist with your enterprise AI strategy today?"
          : "Welcome to the **Corporate AI Strategy Advisor** platform. I am your virtual Product Guide.\n\nHow can I help you learn about our platform?",
      },
    ]);
  }, [isAuth]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: localInput.trim(),
    };

    const history = [...messages, userMessage];
    setMessages(history);
    setLocalInput("");
    setIsLoading(true);

    // Add placeholder assistant message to stream into
    const assistantId = (Date.now() + 1).toString();
    setMessages([...history, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("0:")) {
            try {
              // Protocol: 0:"token"
              const token = JSON.parse(line.slice(2));
              accumulated += token;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: accumulated } : m
                )
              );
            } catch {
              // skip malformed line
            }
          }
          // d: is the finish signal — ignore, we're done when reader is done
        }
      }

      // If no content was accumulated (error or empty), show error message
      if (!accumulated) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: "I'm sorry, I encountered an issue. Please try again." }
              : m
          )
        );
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Connection error. Please check your network and try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [localInput, isLoading, messages]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-5 w-[360px] sm:w-[420px] overflow-hidden rounded-xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-200 dark:bg-slate-900 dark:border-slate-800 flex flex-col"
            style={{ height: "min(700px, 85vh)" }}
          >
            {/* Header */}
            <div className="bg-slate-900 dark:bg-black p-4 flex justify-between items-center text-white border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md border border-white/10 ${isAuth ? "bg-indigo-600/20" : "bg-white/10"}`}>
                  {isAuth ? <Sparkles size={18} className="text-indigo-400" /> : <Bot size={18} className="text-slate-100" />}
                </div>
                <div>
                  <h3 className="font-medium text-sm tracking-wide text-slate-50">Corporate AI Assistant</h3>
                  <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 uppercase tracking-wider mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isAuth ? "bg-indigo-400" : "bg-emerald-500"}`} />
                    {headerBadge}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded transition-colors"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50 dark:bg-slate-900/50 min-h-0">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                const isRestricted = msg.content.trim() === "RESTRICTED_ACCESS_REQUIRED";

                if (isRestricted) {
                  return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className="flex justify-start">
                      <div className="flex flex-col gap-3 max-w-[90%] border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold text-[13px]">
                          <Lock size={16} />
                          Premium Feature Required
                        </div>
                        <p className="text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed">
                          Advanced ROI analysis, industry comparisons, and forecasting are available for registered users.
                        </p>
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => { setIsOpen(false); router.push("/login"); }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                          >
                            Sign In
                          </button>
                          <button
                            onClick={() => { setIsOpen(false); router.push("/register"); }}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-[12px] px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Get Started
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-3 max-w-[90%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-1 ${isUser ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300" : "bg-slate-900 text-white dark:bg-slate-800"}`}>
                        {isUser ? <User size={15} /> : isAuth ? <Sparkles size={15} /> : <Bot size={15} />}
                      </div>
                      <div className={`px-4 py-3 text-[13.5px] leading-relaxed shadow-sm break-words ${
                        isUser
                          ? "bg-slate-900 text-white rounded-2xl rounded-tr-sm dark:bg-slate-800"
                          : "bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 prose prose-sm prose-slate dark:prose-invert max-w-none"
                      }`}>
                        {isUser ? (
                          msg.content
                        ) : msg.content === "" && isLoading ? (
                          <div className="flex items-center gap-1 py-1">
                            <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                            <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                            <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                          </div>
                        ) : (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <form onSubmit={handleSend} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={localInput}
                  onChange={(e) => setLocalInput(e.target.value)}
                  placeholder="Type your inquiry..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 rounded-lg pl-4 pr-12 py-3 text-[13px] outline-none transition-all dark:text-slate-200 shadow-sm disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!localInput.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-40 p-1.5 rounded-md transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-14 h-14 text-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] transition-colors focus:outline-none ${
          isAuth ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-900 hover:bg-slate-800"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              {isAuth ? <Sparkles size={22} /> : <MessageSquare size={22} />}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
