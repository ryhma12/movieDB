import Loading from "../components/utility/Loading";
import Favourite from "../components/Favourite";
import { useState, useEffect } from "react";

const Favourites = () => {
  const urlParam = new URLSearchParams(window.location.search);
  const publicUser = urlParam.get("user");
  const [publicFavourites, setPublicFavourites] = useState([]);
  const [publicIsLoading, setPublicIsLoading] = useState(false);

  //CURRENT USAGE "http://localhost:3000/favourites/public?user=test"

  useEffect(() => {
    const fetchPublicFavourites = async () => {
      if (!publicUser) {
        return console.log("Invalid publicUser parameters");
      }
      setPublicIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/user/publicFavourites/get?publicUser=${encodeURIComponent(
            publicUser
          )}`
        );
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();

        setPublicFavourites(data.favourites || []);
      } catch (error) {
        console.error(error);
      } finally {
        setPublicIsLoading(false);
      }
    };

    fetchPublicFavourites();
  }, [publicUser]);

  return (
    <div className="favourites-container">
      <h2>{publicUser}'s favourites</h2>
      {publicIsLoading ? (
        <Loading />
      ) : (
        <ul>
          {publicUser ? (
            publicFavourites.map((item) => (
              <Favourite
                key={item.id}
                data={{
                  movieName: item.movieName || null,
                  date: item.date || null,
                }}
              />
            ))
          ) : (
            <div>404</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
