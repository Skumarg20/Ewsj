import { JSX } from "react";

export interface Plan {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    icon: JSX.Element;
    popular: boolean;
    color: string;
    buttonVariant: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
    buttonText: string;
  }
  
  export interface FeatureIcons {
    [key: string]: JSX.Element;
  }
  
  export interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
  
  export interface OrderResponse {
    success: boolean;
    order: {
      id: string;
      amount: number;
      currency: string;
    };
  }
  
  export interface VerifyResponse {
    success: boolean;
    message: string;
    user?: {
      id: string;
      plan: string;
    };
  }
  
  export interface JwtPayload {
    sub: string;
    username: string;
    fullname: string;
    email: string;
    phonenumber: string;
    studentclass: string;
    exam: string;
    plan: string;
    subscriptionStart: string;
    subscriptionDuration: number;
    subscriptionEnd: string;
    iat: number;
    exp: number;
  }
  
  export interface SuccessStory {
    icon: JSX.Element;
    title: string;
    desc: string;
  }