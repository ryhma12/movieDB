import { useFavourites } from "../hooks/useFavourites";
import { useUser } from "../hooks/useUser";

const ProductCard = ({ item, interActive, setSelectedMovie }) => {
  const { favourites, addUserFavourite, removeUserFavourite } = useFavourites();
  const { user } = useUser();
  const favourited = favourites.some((favourite) => favourite.movieId === item.id);

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
      {user && (
        <button onClick={(e) => favouritePress(e)}>
          {!favourited ? "like" : "unlike"}
        </button>
      )}
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={`${item.original_title} Poster`}
        className="movie--poster"
      />
    </div>
  );
};

export default ProductCard;
