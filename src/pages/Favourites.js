import Loading from "../components/utility/Loading";
import useFetch from "../hooks/useFetch";
import Favourite from "../components/Favourite";

const Favourites = () => {
  /*const {
    data: favouritesFetchData,
    isLoading: favouritesIsLoading,
  } = useFetch(
    
  );*/

  const favouritesFetchData = [
    {
      id: 1,
      movieName: "name1",
      date: "102121421"
    },
    {
      id: 2,
      movieName: "name2",
      date: "12412412412",
    }
  ];

  const favouritesIsLoading = "";

  return (
    <div className="favourites-container">
      <h2>Favourites</h2>
      {favouritesIsLoading ? (
        <Loading />
      ) : (
        <ul>
          {
            favouritesFetchData ? (
              favouritesFetchData.map(item => (
                <Favourite
                  key={item.id}
                  data={{
                    movieName: item.movieName || null,
                    date: item.date || null,
                  }}
                />
              ))
            ) : (
              <div className="empty">No favourites found</div>
            )
          }
        </ul>
      )}
    </div>
  )
}

export default Favourites