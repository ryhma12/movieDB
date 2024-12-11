import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
