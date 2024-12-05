import Loading from "../components/utility/Loading";
import Favourite from "../components/Favourite";
import useUserFavourites from "../hooks/useUserFavourites";
import { useUser } from "../hooks/useUser";
import { useState, useEffect } from "react";

const Favourites = () => {
  const { user } = useUser();
  const {
    data: favouritesData,
    error: favouritesDataError,
    isLoading: favouritesDataIsLoading,
  } = useUserFavourites();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (favouritesData && !favouritesDataError) {
      setFavourites(favouritesData);
    }
  }, [favouritesData]);

  return (
    <div className="favourites-container">
      <h2>Favourites</h2>
      {!user ? (
        <div className="empty">You have to log in to use this function</div>
      ) : favouritesDataIsLoading ? (
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
