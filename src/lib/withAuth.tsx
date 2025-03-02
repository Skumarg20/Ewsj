"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useLoading } from "@/app/loader/context/loadingprovider";
import toast from "react-hot-toast";


interface JwtUser {
  sub: string;           
  username: string;      
  fullname: string;     
  email?: string;         
  phonenumber?: string;   
  studentclass?: string;  
  exam?: string;          
  iat: number;          
  exp: number;          
}


const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return function ProtectedRoute(props: P) {
    const [user, setUser] = useState<JwtUser | null>(null);
    const { setLoading } = useLoading();
    const router = useRouter();

   
   const checkTokenValidity = useCallback((token: string): boolean => {
      try {
        const decodedUser: JwtUser = jwtDecode<JwtUser>(token);
        const isTokenExpired = decodedUser.exp * 1000 < Date.now();

        if (isTokenExpired) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          router.replace("/login");
          return false;
        }

        setUser(decodedUser);
        localStorage.setItem("user", JSON.stringify(decodedUser));
        return true;
      } catch {
        toast.error("Invalid session. Please log in again.");
        localStorage.removeItem("token");
        router.replace("/login");
        return false;
      }
    }, [router]);

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
    }, [router, setLoading, checkTokenValidity]);

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
    }, [router, checkTokenValidity]);

    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;