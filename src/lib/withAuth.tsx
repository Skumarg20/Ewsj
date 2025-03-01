"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useLoading } from "@/app/loader/context/loadingprovider";
import toast from "react-hot-toast"; // or your preferred toast library

const withAuth = (WrappedComponent: React.ComponentType) => {
  return function ProtectedRoute(props: any) {
    const [user, setUser] = useState<any>(null);
    localStorage.setItem('user',JSON.stringify(user));
    const { setLoading } = useLoading();
    const router = useRouter();

    const checkTokenValidity = (token: string) => {
      try {
        const decodedUser: any = jwtDecode(token);
        const isTokenExpired = decodedUser.exp * 1000 < Date.now();

        if (isTokenExpired) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          router.replace("/login");
          return false;
        }

        setUser(decodedUser);
        return true;
      } catch (error) {
        toast.error("Invalid session. Please log in again.");
        localStorage.removeItem("token");
        router.replace("/login");
        return false;
      }
    };

    useEffect(() => {
      const token = localStorage.getItem("token");
      setLoading(true);

      if (!token) {
        toast.error("Please login to continue");
        router.replace("/login");
        setLoading(false);
        return;
      }

      const isValid = checkTokenValidity(token);
      setLoading(!isValid);
    }, [router, setLoading]);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const interval = setInterval(() => {
        const isValid = checkTokenValidity(token);
        if (!isValid) {
          clearInterval(interval);
          router.replace("/login");
        }
      }, 60000);

      return () => clearInterval(interval);
    }, [router]);

    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;