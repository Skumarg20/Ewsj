import { useState, useEffect } from "react";

type Props<T> = {
    url: string;
    token: string;
    type:T
    setLoading: (state: boolean) => void; 
  };
function useFetchData<T>({url,setLoading}:Props<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": "Bearer YOUR_TOKEN_HERE",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); 

  return { data, error };
}

export default useFetchData;
