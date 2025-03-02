'use client'
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image"; // Added Next.js Image import

const MotivationalCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="p-8 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg h-auto rounded-2xl hover:shadow-xl transition-all duration-300">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <span className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full inline-block">
              Daily Wisdom
            </span>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            &quot;The Future Belongs To Those Who Believe In The Beauty Of Their Dreams&quot;
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Success is not about the destination, but the transformation that occurs during the journey. Every step forward is a victory in itself.
            </p>
          </div>
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
              <Image
                src="/founder.jpg"
                alt="Founder"
                width={96} // Specify width (24 * 4 for pixel density)
                height={96} // Specify height (24 * 4 for pixel density)
                className="object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-center mt-4 space-y-1">
              <h3 className="font-medium text-gray-900">Sanjeev Kumar</h3>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>
          </div>
          <div className="pt-4">
            <div className="h-1 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MotivationalCard;