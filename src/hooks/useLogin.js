import { useState } from "react";
import { useUser } from "./useUser";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useUser();

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });
      if (!res.ok) {
        setError("Login failed");
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      dispatch({ type: "LOGIN", payload: data });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
