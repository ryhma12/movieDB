import { useState } from "react";

export const useAcceptUser = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const acceptUser = async (userName, groupName, token) => {
    setError(null);
    setIsLoading(true);

    try {
      console.log(userName, groupName, token);
      const res = await fetch("http://localhost:3001/group/acceptuser", {
        method: "PATCH",
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
      console.log(data);

      if (!data || data.error) throw new Error(data.error);

      setData(data);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { acceptUser, isLoading, error, data };
};
