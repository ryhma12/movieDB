import { useState, useEffect } from "react";
import { useUser } from "./useUser";

const useUserFavourites = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user || !user.token) {
        setError("No user.token found");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
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

  const addUserFavourite = async (movieId, movieName) => {
    if (!user || !user.token) {
      setError("No user.token found");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/user/favourites/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify({
          movieId: movieId,
          movieName: movieName,
        }),
      });

      if (!res.ok) throw new Error(res.status);
      const resData = await res.json();
      // adds it to the data
      setData((prevData) => [...prevData, resData.favourite]);
    } catch (error) {
      console.log(error);
      setError("Failed to add favourite");
    }
  };

  return { data, error, isLoading, addUserFavourite };
};

export default useUserFavourites;
