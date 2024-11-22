import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import Loading from "./Loading";
import ProductCard from "./ProductCard";
import arrowSVG from "../assets/arrfor.svg";

const MovieGenrePreview = ({
  genre,
  genreName,
  setSelectedMovie,
  setSelectedGenre,
}) => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc&language=en-US&page=1`
  );

  const handleNav = () => {
    navigate(`/${genreName.toLowerCase()}`);
    setSelectedGenre(genre);
  };

  return (
    <div className="MovieGenrePreview">
      <div className="genre--header">
        <h2>{genreName}</h2>
        <span onClick={handleNav}>
          See all {genreName} movies <img src={arrowSVG} alt="arrow icon" />
        </span>
      </div>
      <div className="movies--container">
        {isLoading && <Loading />}
        {data.results &&
          !isLoading &&
          data.results
            .slice(0, 6)
            .map((movie, index) => (
              <ProductCard
                key={index}
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
