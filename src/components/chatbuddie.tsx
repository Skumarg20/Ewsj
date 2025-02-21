'use client';
import { Send, Sparkles, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLoading } from "@/app/loader/context/loadingprovider";
import { getAuthHeader } from "@/lib/api";
import axios from "axios";
type Props = {
  onClose: () => void;
};

type ChatMessage = {
  role: "user" | "ai";
  text: string;
};

export default function ChatBuddie({ onClose }: Props) {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const { setLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage(""); // Clear input field

    // Add user message to chat history
    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/study-plan/doubt",
        { doubt: userMessage },
        {
          headers: { ...getAuthHeader(), "Content-Type": "application/json" },
        }
      );
      
      const data = response.data;
    console.log(data,"this is data comming form api")
      
      setChatHistory((prev) => [...prev, { role: "ai", text: data.text }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prev) => [...prev, { role: "ai", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[65vh] flex flex-col bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 custom-scrollbar relative">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-indigo-100 rounded-b-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between p-2">
            <button
              onClick={onClose}
              className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              Your Study Buddy is Here! 📚💬
            </h1>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-2 overflow-y-auto max-w-6xl mx-auto space-y-4">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-2xl p-2 rounded-2xl shadow-sm border ${
                chat.role === "user"
                  ? "bg-indigo-500 text-white rounded-tr-none"
                  : "bg-white border-indigo-100 text-gray-700 rounded-tl-none"
              }`}
            >
              {chat.text}
            </div>
          </div>
        ))}

      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-md border-t border-indigo-100 rounded-xl sticky bottom-0 w-full p-2">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80 shadow-sm p-2"
              
            />
            <button
              type="submit"
              className="bg-gradient-to-r w-10 h-10 flex items-center justify-center from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
      
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
