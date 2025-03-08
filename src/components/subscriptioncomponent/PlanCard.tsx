// src/components/PlanCard.tsx
"use client";

import { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { Plan, FeatureIcons } from "../../interface/type";
import { FaCheckCircle } from "react-icons/fa";

interface PlanCardProps {
  plan: Plan;
  featureIcons: FeatureIcons;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  loading: boolean;
}

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
};

export default function PlanCard({
  plan,
  featureIcons,
  isHovered,
  onHoverStart,
  onHoverEnd,
 onClick,
  loading,
}: PlanCardProps): JSX.Element {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.3 } }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="flex"
    >
      <Card
        className={`w-full border-2 ${
          isHovered ? "border-indigo-500 shadow-xl" : "border-gray-200 dark:border-gray-700"
        } overflow-hidden ${plan.color} transition-all duration-400 rounded-xl`}
      >
        {plan.popular && (
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md"
          >
            Top Pick
          </motion.div>
        )}
        <CardHeader className="pb-4">
          <motion.div
            className="mb-6 bg-white/50 dark:bg-gray-800/50 p-4 rounded-full w-fit mx-auto shadow-md"
            whileHover={{ rotate: [0, 10, -10, 5, 0], scale: 1.1, transition: { duration: 0.6 } }}
          >
            {plan.icon}
          </motion.div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">{plan.name}</CardTitle>
          <div className="flex items-baseline mt-3">
            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">₹{plan.price}</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">/{plan.period}</span>
          </div>
          <CardDescription className="mt-3 text-gray-600 dark:text-gray-300">{plan.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center text-sm text-gray-700 dark:text-gray-200"
              >
                {featureIcons[feature] || <FaCheckCircle className="h-5 w-5 mr-2 text-green-500" />}
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            variant={plan.buttonVariant}
            className={`w-full ${
              plan.popular
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
                : "border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white"
            } font-semibold py-3 rounded-lg group relative overflow-hidden transition-all duration-300`}
            onClick={onClick}
            disabled={true}
           
          >
            {/* <span className="relative z-10">{loading ? "Processing..." : plan.buttonText}</span> */}
            <span className="relative z-10">Coming Soon</span>
            <motion.span
              initial={{ x: "-100%", opacity: 0.4 }}
              whileHover={{ x: "100%", opacity: 0.6 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-indigo-300 dark:bg-indigo-700"
            />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}