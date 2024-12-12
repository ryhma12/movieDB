import { useState } from "react";

export const useCreateGroup = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createGroup = async (userName, userEmail, groupName, token) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/group/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          AdminName: userName,
          Email: userEmail,
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

  return { createGroup, isLoading, error, data };
};
