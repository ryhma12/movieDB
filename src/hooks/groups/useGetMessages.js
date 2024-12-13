import { useState, useCallback } from "react";

export const useGetMessages = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMessages = useCallback(async (groupName, token) => {
    setError(null);
    setIsLoading(true);

    try {
      if (!groupName) return;

      const res = await fetch(
        "http://localhost:3001/group/getmessages?groupName=" + groupName,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (!res.ok) {
        setError("getmessages failed");
      }
      const data = await res.json();
      console.log(data);
      if (!data || data.error) throw new Error(data.error);

      setData(data);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getMessages, isLoading, error, data };
};
