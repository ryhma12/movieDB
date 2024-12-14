import Carousel from "../components/Carousel";
import useFetch from "../hooks/useFetch";
import Loading from "../components/utility/Loading";

const HomePage = ({ setSelectedMovie }) => {
  const {
    data: popularData,
    isLoading: popularIsLoading,
    error: popularError,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&adult=false`
  );

  const {
    data: upcomingData,
    isLoading: upcomingIsLoading,
    error: upcomingError,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&adult=false`
  );

  const {
    data: topRatedData,
    isLoading: topRatedIsLoading,
    error: topRatedError,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&adult=false`
  );

  const loaded = () => {
    return !popularIsLoading && !upcomingIsLoading && !topRatedIsLoading;
  };

  return (
    <div className="homepage">
      {loaded() ? (
        <div className="homepage-content">
          {!popularError && (
            <Carousel
              name="Popular movies"
              setSelectedMovie={setSelectedMovie}
              data={popularData}
            />
          )}
          {!upcomingError && (
            <Carousel
              name="Upcoming movies"
              setSelectedMovie={setSelectedMovie}
              data={upcomingData}
            />
          )}
          {!topRatedError && (
            <Carousel
              name="Top Rated movies"
              setSelectedMovie={setSelectedMovie}
              data={topRatedData}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default HomePage;
