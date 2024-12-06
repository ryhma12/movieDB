import { useEffect, useState } from "react";
import useUserFavourites from "../hooks/useUserFavourites";
import { useUser } from "../hooks/useUser";

const ProductCard = ({ item, interActive, setSelectedMovie }) => {
  const [favourites, setFavourites] = useState([]);
  const [favourited, setFavourited] = useState(false);
  const { user } = useUser();
  const {
    data: favouritesData,
    error: favouritesDataError,
    addUserFavourite,
    removeUserFavourite,
  } = useUserFavourites();

  useEffect(() => {
    if (favouritesData && !favouritesDataError) {
      setFavourites(favouritesData);
    }
  }, [favouritesData, favouritesDataError]);

  useEffect(() => {
    if (Array.isArray(favourites)) {
      const isFavourited = favourites.some(
        (favourite) => favourite.movieId === item.id
      );
      setFavourited(isFavourited);
    } else {
      console.warn("Favourites is not an array:", favourites);
      setFavourited(false);
    }
  }, [favourites, item.id]);

  const favouritePress = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!favourited) {
      await addUserFavourite(item.id, item.original_title);
    } else {
      await removeUserFavourite(item.id);
    }
  };

  const handleNav = () => {
    setSelectedMovie(item);
  };

  return (
    <div
      className={interActive ? "ProductCard interactive" : "ProductCard"}
      onClick={interActive ? handleNav : undefined}
    >
      {user && <button onClick={(e) => favouritePress(e)}>liek</button>}
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={`${item.original_title} Poster`}
        className="movie--poster"
      />
      {/* {text && (
        <div className="product--card__text">
          <span>{text}</span>
        </div>
      )} */}
    </div>
  );
};

export default ProductCard;
