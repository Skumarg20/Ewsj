import { useState, useEffect } from "react";
import axios from "axios";

const useCRUD = (baseUrl: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [baseUrl]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (newItem:any) => {
    setLoading(true);
    try {
      const response = await axios.post(baseUrl, newItem);
      setData([...data, response.data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, updatedItem) => {
    setLoading(true);
    try {
      const response = await axios.put(`${baseUrl}/${id}`, updatedItem);
      setData(data.map(item => (item.id === id ? response.data : item)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData, createItem, updateItem, deleteItem };
};

export default useCRUD;
