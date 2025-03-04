"use client";

import { JSX, useState } from "react";
import { motion, Variants } from "framer-motion";
import axios, { AxiosResponse } from "axios";
import { getAuthHeader } from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import PlanCard from "./PlanCard";
import { Plan, FeatureIcons, RazorpayResponse, OrderResponse, VerifyResponse, JwtPayload } from "../../interface/type";

interface PlansSectionProps {
  plan: Plan; 
  featureIcons: FeatureIcons;
  setUserPlan: (plan: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function PlansSection({ plan, featureIcons, setUserPlan }: PlansSectionProps): JSX.Element {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePayment = async (planId: string): Promise<void> => {
    setLoading(true);
    try {
      if (!plan) throw new Error("Plan not found");

      const token: string | null = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
      const userId: string = decodedToken.sub;

      console.log(decodedToken, "Decoded Data", parseInt(plan.price, 10), new Date().toISOString(), planId, userId);

      const createOrderResponse: AxiosResponse<OrderResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-order`,
        {
          amount: parseInt(plan.price, 10),
          date: new Date().toISOString(),
          plan: planId
        },
        {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      );

      console.log(createOrderResponse,createOrderResponse.data, "Response from create-order API");

      const order = createOrderResponse.data.order;
      console.log(order,"this is order")

      // ✅ Ensure `window` exists before using `Razorpay`
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        const razorpay = new (window as any).Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY as string,
          amount: order.amount,
          currency: "INR",
          order_id: order.id,
          name: "CogeNist",
          description: `Subscribe to ${plan.name}`,
          handler: async (response: RazorpayResponse): Promise<void> => {
            try {
              const verifyResponse: AxiosResponse<VerifyResponse> = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/payments/verify-payment`,
                {  orderCreationId: order.id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                },
                {
                  headers: {
                    ...getAuthHeader(),
                    "Content-Type": "application/json",
                  },
                }
              );
          console.log(verifyResponse.data,"this is my ");
              const result = verifyResponse.data;
              if (result.success) {
                setUserPlan(planId);
                alert(`Payment successful! Plan upgraded to ${plan.name}`);
              } else {
                throw new Error(result.message);
              }
            } catch (error) {
              console.error("Payment verification failed:", error);
              alert("Payment verification failed. Please try again.");
            }
          },
          prefill: {
            name: decodedToken.fullname,
            email: decodedToken.email,
            contact: decodedToken.phonenumber,
          },
          theme: {
            color: "#4F46E5",
          },
        });

        razorpay.open();
      } else {
        throw new Error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <PlanCard
        plan={plan}
        featureIcons={featureIcons}
        isHovered={hoveredPlan === plan.id}
        onHoverStart={() => setHoveredPlan(plan.id)}
        onHoverEnd={() => setHoveredPlan(null)}
        onClick={() => handlePayment(plan.id)}
        loading={loading}
      />
    </motion.div>
  );
}
