import { useState } from "react";

export const useRefuseOrCancel = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const refuseOrCancel = async (userName, groupName, token) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/group/refuseuser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: userName,
          groupName: groupName,
        }),
      });
      if (!res.ok) {
        setError("createGroup failed");
      }
      const data = await res.json();

      if (!data || data.error) throw new Error(data.error);

      setData(data);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { refuseOrCancel, isLoading, error, data };
};
