import { useState } from "react";

export const useRequestToJoinGroup = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const requestToJoinGroup = async (userName, groupName, token) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/group/asktojoin", {
        method: "POST",
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

  return { requestToJoinGroup, isLoading, error, data };
};
