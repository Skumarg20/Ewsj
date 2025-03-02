import { useState, useEffect } from "react";

// Props without generic T
type Props = {
  url: string;
  token: string;
  setLoading: (state: boolean) => void;
};

// Generic T moved to function
function useFetchData<T>({ url, token, setLoading }: Props) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token, setLoading]);

  return { data, error };
}

export default useFetchData;