import { useState } from "react";
import { useLogin } from "./useLogin";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useLogin();

  const signup = async (name, email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Password: password,
          Email: email,
        }),
      });
      if (!res) throw new Error("Could not complete signup");

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      login(email, password);

      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
