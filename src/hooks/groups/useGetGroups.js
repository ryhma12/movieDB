import { useState } from "react";

export const useGetGroups = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGroups = async (id) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3001/group/getgroups?id=" + id,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        setError("getGroups failed");
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setData(data);
      console.log(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { getGroups, isLoading, error, data };
};
