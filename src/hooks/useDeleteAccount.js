import { useState } from "react";
import { useUser } from "./useUser";

export const useDeleteAccount = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, dispatch } = useUser();

  const deleteAccount = async (email, password, id) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify({
          Password: password,
          Email: email,
          id: id,
        }),
      });
      if (!res) throw new Error("Could not complete deletion");

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      sessionStorage.removeItem("user");
      dispatch({ type: "LOGOUT", payload: data });
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAccount, error, isLoading };
};
