'use client'

import { useState, useEffect } from 'react';

interface CrudState<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

interface UseCrudApi<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  fetchAll: () => Promise<void>;
  fetchById: (id: string) => Promise<T | null>;
  create: (item: Omit<T, 'id'>) => Promise<T>;
  update: (id: string, item: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<boolean>;
}

interface AuthConfig {
  getToken: () => string | null;
  onUnauthorized: () => void;
}

const useCrudApi = <T extends { id: string }>(
  baseUrl: string,
  authConfig: AuthConfig
): UseCrudApi<T> => {
  const [state, setState] = useState<CrudState<T>>({
    data: [],
    loading: false,
    error: null,
  });

  // Check for authentication token
  const getAuthHeaders = (): HeadersInit => {
    const token = authConfig.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const handleRequest = async <R>(
    request: () => Promise<R>,
    loadingMessage = 'Loading...'
  ): Promise<R> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
     
      const token = authConfig.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      const result = await request();
      return result;
    } catch (error) {
      
      if (error instanceof Response && error.status === 401) {
        authConfig.onUnauthorized();
      }
      setState(prev => ({ ...prev, error: error as Error }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const fetchAll = async (): Promise<void> => {
    const response = await handleRequest(async () => {
      const res = await fetch(baseUrl, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        if (res.status === 401) {
          authConfig.onUnauthorized();
        }
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      setState(prev => ({ ...prev, data }));
    });
    return response;
  };

  const fetchById = async (id: string): Promise<T | null> => {
    return handleRequest(async () => {
      const res = await fetch(`${baseUrl}/${id}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        if (res.status === 401) {
          authConfig.onUnauthorized();
          throw new Error('Unauthorized');
        }
        if (res.status === 404) return null;
        throw new Error('Failed to fetch item');
      }
      return res.json();
    });
  };

  const create = async (item: Omit<T, 'id'>): Promise<T> => {
    return handleRequest(async () => {
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      });
      if (!res.ok) {
        if (res.status === 401) {
          authConfig.onUnauthorized();
        }
        throw new Error('Failed to create item');
      }
      const newItem = await res.json();
      setState(prev => ({
        ...prev,
        data: [...prev.data, newItem],
      }));
      return newItem;
    });
  };

  const update = async (id: string, item: Partial<T>): Promise<T> => {
    return handleRequest(async () => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      });
      if (!res.ok) {
        if (res.status === 401) {
          authConfig.onUnauthorized();
        }
        throw new Error('Failed to update item');
      }
      const updatedItem = await res.json();
      setState(prev => ({
        ...prev,
        data: prev.data.map(i => (i.id === id ? updatedItem : i)),
      }));
      return updatedItem;
    });
  };

  const remove = async (id: string): Promise<boolean> => {
    return handleRequest(async () => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        if (res.status === 401) {
          authConfig.onUnauthorized();
        }
        throw new Error('Failed to delete item');
      }
      setState(prev => ({
        ...prev,
        data: prev.data.filter(item => item.id !== id),
      }));
      return true;
    });
  };

  return {
    ...state,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
};

export default useCrudApi;