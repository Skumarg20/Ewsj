"use client";
import React, { useState, useEffect } from "react";

type Props<T> = {
  url: string;
  id?: string;
  token: string;
  bodyData: any;
  setLoading: (state: boolean) => void; 
};

export default function useCreateHook<T>({
  url,
  id,
  token,
  bodyData,
  setLoading,
}: Props<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bodyData) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result: T = await res.json();
        setData(result);
        console.log(result,"this is react hoook");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, id, token, bodyData, setLoading]);

  return { data, error };
}
