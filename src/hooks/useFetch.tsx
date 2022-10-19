import { useState, useCallback } from "react";

type Response = {
  data: object;
};

export const useFetch = () => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async (service: Promise<Response>) => {
    setLoading(true);
    try {
      const { data } = await service;

      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetch,
    data,
    loading,
    error,
  };
};
