import { useState, useCallback } from "react";

export const useGetUsers = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = useCallback(async (id) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/user/allusers", {
        method: "GET",
      });
      if (!res.ok) {
        setError("getUsers failed");
      }
      const data = await res.json();
      if (!data || data.error)
        throw new Error(
          data.error || "No groups found, considering creating one!"
        );

      setData(data);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getUsers, isLoading, error, data };
};
