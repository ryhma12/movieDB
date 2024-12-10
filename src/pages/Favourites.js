import Loading from "../components/utility/Loading";
import Favourite from "../components/Favourite";
import { useFavourites } from "../hooks/useFavourites";
import { useUser } from "../hooks/useUser";

const Favourites = () => {
  const { favourites, isLoading } = useFavourites();
  const { user } = useUser();

  return (
    <div className="favourites-container">
      <h2>Favourites</h2>
      {!user ? (
        <div className="empty">You have to log in to use this function</div>
      ) : isLoading ? (
        <Loading />
      ) : (
        <ul>
          {favourites.length > 0 ? (
            favourites.map((item) => (
              <Favourite
                key={item.id}
                data={{
                  movieName: item.movieName || null,
                  date: item.date || null,
                }}
              />
            ))
          ) : (
            <div className="empty">You have yet to add any favourites</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
