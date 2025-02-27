'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Calendar,
  Phone,
  Target,
  Clock,
  Award,
  BookOpen,
  GraduationCap,
  Brain,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Timer,
  Users,
  Star,
  User,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import Script from 'next/script';
import axios from 'axios';

type FormData = {
  name: string;
  email: string;
  phone: string;
  exam: 'JEE' | 'NEET' | string;
  date: string;
  message: string;
};

const BookACall = () => {
  
  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState<FormData | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      exam: 'JEE',
      date: '',
      message: '',
    },
  });

  const createOrderId = async (data: FormData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-order`, {
        amount: parseFloat('0.99') * 100, 
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        exam: data.exam,
        date: data.date,
        message: data.message,
      });
      console.log('Order created:', response.data);
      console.log(response.data.order.id,"this is order id");
      return response.data.order.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const orderId = await createOrderId(data);
   console.log(orderId,"this is order id");
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Ensure this is set in .env.local
        amount: parseFloat('0.99') * 100, // Amount in paise
        currency: 'INR',
        name: 'Mentorship Booking',
        description: 'One-on-One Call Booking',
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const { data: verificationData } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/payments/verify-payment`, {
              orderCreationId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
             console.log(verificationData.isOk,"thisis payment done",data);
            if (data) {
              
              toast.success("Payment succeeded! Call scheduled successfully!");
              reset();
             
            } else {
              toast.error(verificationData.message);
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: '#4F46E5', // Indigo-600
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        toast.error(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: <Target className="w-8 h-8 text-indigo-500" />, title: "Personalized Strategy", description: "Get a study plan tailored just for you" },
    { icon: <BookOpen className="w-8 h-8 text-indigo-500" />, title: "Doubt Solving", description: "Clear all your conceptual doubts in real-time" },
    { icon: <Clock className="w-8 h-8 text-indigo-500" />, title: "Time Management", description: "Learn how to study smart, not just hard" },
    { icon: <Award className="w-8 h-8 text-indigo-500" />, title: "Expert Guidance", description: "Stay focused with professional mentorship" },
  ];

  const features = [
    { icon: <GraduationCap className="w-6 h-6 text-purple-600" />, text: "Top Mentors to Guide You to Exam Success!" },
    { icon: <Brain className="w-6 h-6 text-purple-600" />, text: "Personalized Learning Path" },
    { icon: <Timer className="w-6 h-6 text-purple-600" />, text: "Flexible Scheduling" },
    { icon: <Users className="w-6 h-6 text-purple-600" />, text: "1:1 Attention" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <Star className="absolute top-20 left-20 w-12 h-12 text-yellow-300 opacity-30 animate-spin-slow" />
          <Star className="absolute bottom-20 right-20 w-12 h-12 text-yellow-300 opacity-30 animate-spin-slow" />
          <Rocket className="absolute top-40 right-40 w-16 h-16 text-indigo-400 opacity-20 animate-float" />
        </div>
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500"
          >
            Struggling with Your Exam Preparation?
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">Book a One-on-One Call with Your Mentor & Get Closer to Your Dream Score!</p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                {feature.icon}
                <span className="text-gray-800">{feature.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2 mx-auto"
          >
            <Phone className="w-5 h-5" />
            Book Your Call Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section className="py-16 bg-white/60 px-5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Why Choose Our Mentorship?
            <span className="block mt-2">
              <CheckCircle2 className="inline-block w-8 h-8 text-green-500 animate-pulse" />
            </span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="mb-4 text-indigo-500"
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="py-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/90 p-8 rounded-2xl shadow-2xl backdrop-blur-md"
          >
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3 text-gray-800">
              <Calendar className="w-8 h-8 text-indigo-500 animate-bounce" />
              Book Your Call (₹99)
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${errors.name ? 'border-red-400' : 'border-indigo-200'} bg-indigo-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition-all duration-300 placeholder-gray-400`}
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                    <input
                      {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${errors.email ? 'border-red-400' : 'border-indigo-200'} bg-indigo-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition-all duration-300 placeholder-gray-400`}
                      placeholder="Your email"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                    <input
                      {...register('phone', { required: 'Phone number is required' })}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${errors.phone ? 'border-red-400' : 'border-indigo-200'} bg-indigo-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition-all duration-300 placeholder-gray-400`}
                      placeholder="Your phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Exam</label>
                  <div className="relative">
                    <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                    <select
                      {...register('exam')}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-indigo-200 bg-indigo-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition-all duration-300 appearance-none"
                    >
                      <option value="JEE">JEE</option>
                      <option value="NEET">NEET</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                  <input
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${errors.date ? 'border-red-400' : 'border-indigo-200'} bg-indigo-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition-all duration-300`}
                  />
                </div>
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">Message (Optional)</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-5 w-5 h-5 text-indigo-400" />
                  <textarea
                    {...register('message')}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-indigo-200 bg-indigo-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition-all duration-300 placeholder-gray-400"
                    rows={4}
                    placeholder="Tell us about your preparation and concerns..."
                  />
                </div>
              </div>
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className={`bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg flex items-center gap-2 mx-auto hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <Calendar className="w-5 h-5" />
                  )}
                  {loading ? 'Processing...' : 'Schedule Call (₹99)'}
                  {!loading && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookACall;