import Loading from "../components/utility/Loading";
import Favourite from "../components/Favourite";
import { useFavourites } from "../hooks/useFavourites";
import { useUser } from "../hooks/useUser";

const Favourites = () => {
  const { favourites, isLoading } = useFavourites();
  const { user } = useUser();

  return (
    <div className="favourites-page">
      <h2>Favourites</h2>
      <div className="favourites-container">
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
    </div>
  );
};

export default Favourites;
