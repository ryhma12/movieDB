import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import arrowSVG from "../assets/arrfor.svg";

const MovieGenrePreview = ({ genre, genreName, setSelectedMovie }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    try {
      const getMoviesByGenre = async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genre}&sort_by=popularity.desc&language=en-US&page=1`
        );
        const moviesByGenre = await res.json();

        setMovies(moviesByGenre.results.slice(0, 6));
      };
      getMoviesByGenre();
    } catch (err) {
      console.log(err);
    }
  }, [genre]);
  return (
    <div className="MovieGenrePreview">
      <div className="genre--header">
        <h2>{genreName}</h2>
        <span>
          See all {genreName} movies <img src={arrowSVG} alt="arrow icon" />
        </span>
      </div>
      <div className="movies--container">
        {movies &&
          movies.map((movie) => (
            <ProductCard
              item={movie}
              interActive={true}
              setSelectedMovie={setSelectedMovie}
            />
          ))}
      </div>
    </div>
  );
};

export default MovieGenrePreview;
