import { useState, useEffect } from "react";
import { useUser } from "./useUser";

const useUserFavourites = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!user || !user.token) {
      setError("No user.token found");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const fetchFavourites = async () => {
      try {
        const res = await fetch("http://localhost:3001/user/favourites", {
          method: "GET",
          headers: {
            Authorization: user.token,
          },
        });
        if (!res.ok) throw new Error(res.status);
        const resData = await res.json();

        if (Array.isArray(resData.favourites)) {
          setData(resData.favourites);
        }
      } catch (error) {
        console.log(error);
        setError("Failed to fetch favourites");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavourites();
  }, [user]);

  return { data, error, isLoading };
};

export default useUserFavourites;
