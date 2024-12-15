import { useState } from "react";

export const useSendMessage = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userName, groupName, message, token) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/group/sendusermessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: userName,
          groupName: groupName,
          message: message,
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

  return { sendMessage, isLoading, error, data };
};
