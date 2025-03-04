"use client";
import { useState } from "react";
import { FaSave, FaEdit, FaRegSmileBeam, FaTimes, FaMagic, FaRocket, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { RichTextEditorDemo } from "../tiptap/rich-text-editor";
import { JSONContent } from "@tiptap/core";

const CustomForm = () => {
  const [customStudyPlan, setCustomStudyPlan] = useState<JSONContent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleOnContentChange = (content: JSONContent) => {
    setCustomStudyPlan(content);
  };

  const handleSave = async () => {
    if (!customStudyPlan || !customStudyPlan.content || customStudyPlan.content.length === 0) {
      toast({
        title: "Oops!",
        description: "Please enter some content before saving.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customStudyPlan: JSON.stringify(customStudyPlan),
      };

    const response= await axiosInstance.post(`/study-plan/custom-plan`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
    if(response){
       toast({
        title: "Success!",
        description: "Plan saved successfully! 🎉",
        variant: "default",
      });

      setCustomStudyPlan(null);
    }
     

    } catch (error) {
      console.error("Failed to save plan:", error);
      toast({
        title: "Error",
        description: "Failed to save plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-48 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-10 hover:shadow-purple-500/30 transition-all"
      >
        <FaMagic className="text-lg animate-pulse" />
        <span className="font-bold">✨ Create Master Plan</span>
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black px-2 rounded-full text-xs font-bold animate-bounce">
          NEW!
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full border-2 border-purple-100 custom-scrollbar overflow-y-auto relative max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-purple-500 hover:text-purple-700 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </motion.button>

              <div className="text-center mb-8 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl"
                  >
                    🌈
                  </motion.div>
                </div>
                <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl mb-4 shadow-lg">
                  <FaEdit className="text-4xl text-white animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Ultimate Study Architect
                </h3>
                <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
                  <FaRegSmileBeam className="text-yellow-400 animate-bounce" />
                  <span className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
                    "Craft your path to success!"
                  </span>
                </p>
              </div>

              <div className="space-y-6">
                <motion.div whileHover={{ scale: 1.01 }}>
                  <div className="relative group">
                    <FaEdit className="absolute top-4 left-3 text-purple-500 group-hover:text-purple-600 transition-colors" />
                    <RichTextEditorDemo
                      className="w-full max-h-full"
                      initialContent={customStudyPlan ? JSON.stringify(customStudyPlan) : undefined}
                      onContentChange={handleOnContentChange}
                    />
                    <div className="absolute right-3 top-3 text-purple-300">
                      💡
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  {loading ? (
                    <>
                      <FaSave className="animate-spin text-xl" />
                      <span>Preserving Your Genius...</span>
                    </>
                  ) : (
                    <>
                      <FaRocket className="text-xl animate-bounce" />
                      <span className="text-shadow">Launch Creativity</span>
                      <div className="absolute right-4 text-xl">🚀</div>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomForm;