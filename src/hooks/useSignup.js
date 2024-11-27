import { useState } from "react";
import { useUser } from "./useUser";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useUser();

  const signup = async (name, email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      console.log(name, email, password);

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
      console.log(data);
      if (data.error) throw new Error(data.error);

      dispatch({ type: "LOGIN", payload: data });

      console.log(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
