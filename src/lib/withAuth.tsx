"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useLoading } from "@/app/loader/context/loadingprovider";

const withAuth = (WrappedComponent: any) => {
  return function ProtectedRoute(props: any) {
    const [user, setUser] = useState<any>(null);
    const {setLoading}=useLoading();
    const router = useRouter();

    
    const checkTokenValidity = (token: string) => {
      try {
        const decodedUser: any = jwtDecode(token);
        const isTokenExpired = decodedUser.exp * 1000 < Date.now();

        if (isTokenExpired) {
          localStorage.removeItem("token");
          router.replace("/login");
          return false;
        }

        setUser(decodedUser);
        return true;
      } catch (error) {
        localStorage.removeItem("token");
        router.replace("/login");
        return false;
      }
    };

    
    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      const isValid = checkTokenValidity(token);
      if (isValid) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, [router]);

    // Periodically check token expiration
    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const interval = setInterval(() => {
        const isValid = checkTokenValidity(token);
        if (!isValid) {
          clearInterval(interval); 
        }
      }, 60000); 

      return () => clearInterval(interval); 
    }, [router]);


    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;