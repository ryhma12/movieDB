import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import MovieGenrePreview from "../components/MovieGenrePreview";

const BrowseMovies = ({ setSelectedMovie, setSelectedGenre }) => {
  const { data, error, isLoading } = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

  return (
    <div className="BrowseMovies">
      {isLoading && <Loading />}
      {data.genres && (
        <div className="container">
          {data.genres.map((genre) => (
            <MovieGenrePreview
              key={genre.id}
              genre={genre}
              genreName={genre.name}
              setSelectedMovie={setSelectedMovie}
              setSelectedGenre={setSelectedGenre}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseMovies;
