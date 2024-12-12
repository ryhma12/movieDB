import { createContext, useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const { user } = useUser();
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.token) {
      setError("No user.token found");
      return;
    }
    const fetchFavourites = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:3001/user/favourites/get", {
          headers: { Authorization: user.token },
        });
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        setFavourites(data.favourites || []);
      } catch (error) {
        setError(error.message);
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
        body: JSON.stringify({ movieId, movieName }),
      });
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      setFavourites((prev) => [...prev, data.favourite]);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeUserFavourite = async (movieId) => {
    if (!user || !user.token) {
      setError("No user.token found");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/user/favourites/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify({ movieId }),
      });
      if (!res.ok) throw new Error(res.status);
      setFavourites((prev) => prev.filter((fav) => fav.movieId !== movieId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        isLoading,
        error,
        addUserFavourite,
        removeUserFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
