import { useState, useCallback } from "react";

export const useGetGroups = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGroups = useCallback(async (id, allgroups) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3001/group/${
          allgroups ? `/browsegroups?id=${id}` : `getgroups?id=${id}`
        }`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        setError("getGroups failed");
      }
      const data = await res.json();

      if (!data || data.error || data.result.length === 0)
        throw new Error(
          data.error || "No groups found, considering creating one!"
        );
      setData(data.result.map((item) => item.groupName));

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getGroups, isLoading, error, data };
};
