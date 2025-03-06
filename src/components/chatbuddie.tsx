'use client';
import { Send, Sparkles, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";

type Props = {
  onClose: () => void;
  onRateLimitExceeded: (message: string) => void; // Callback for rate limit error
};

type ChatMessage = {
  role: "user" | "ai";
  text: string;
};

export default function ChatBuddie({ onClose, onRateLimitExceeded }: Props) {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {

      const response = await axiosInstance.post("/study-plan/doubt", { doubt: userMessage });
      setChatHistory((prev) => [...prev, { role: "ai", text: response.data.text }]);
    } catch (error) {
      let errorMessage = "Oops! Something went wrong. Please try again later.";

      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message || error.response.statusText;

        if (status === 429) {
          onRateLimitExceeded(`Too Many Requests: ${serverMessage}`);
          return; 
        }

        switch (status) {
          case 400:
            errorMessage = `Bad Request: ${serverMessage}`;
            break;
          case 401:
            errorMessage = `Unauthorized: ${serverMessage}`;
            break;
          case 403:
            errorMessage = `Forbidden: ${serverMessage}`;
            break;
          case 404:
            errorMessage = `Not Found: ${serverMessage}`;
            break;
          case 500:
            errorMessage = `Server Error: ${serverMessage}`;
            break;
          case 503:
            errorMessage = `Service Unavailable: ${serverMessage}`;
            break;
          default:
            errorMessage = `Server error: ${serverMessage} (Status: ${status})`;
            break;
        }
      }

      setChatHistory((prev) => [...prev, { role: "ai", text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[65vh] w-full flex flex-col bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative z-0">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-indigo-100 rounded-b-xl">
        <div className="max-w-6xl mx-auto p-2 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center text-indigo-600 hover:text-indigo-700 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            Your Study Buddy is Here! 📚💬
          </h1>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-1 p-2 overflow-y-auto space-y-4 custom-scrollbar">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-full p-2 rounded-2xl shadow-sm border ${
                chat.role === "user"
                  ? "bg-indigo-500 text-white rounded-tr-none"
                  : "bg-white border-indigo-100 text-gray-700 rounded-tl-none"
              }`}
            >
              {chat.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-2xl p-2 rounded-2xl shadow-sm border bg-white border-indigo-100 text-gray-700 flex items-center">
              <span className="inline-flex space-x-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-md border-t border-indigo-100 rounded-xl p-2 sticky bottom-0">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 bg-white/80 shadow-sm p-2"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-gradient-to-r w-10 h-10 flex items-center justify-center from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50"
              disabled={isLoading}
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
