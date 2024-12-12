import useFetch from "../hooks/useFetch";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import star from "../assets/star.svg";

const Carousel = ({ name, setSelectedMovie }) => {
  const [carPos, setCarPos] = useState(0);
  const { data, error, isLoading } = useFetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&adult=false`
  );

  const getCardsToShow = () => {
    if (window.innerWidth < 720) {
      return 2;
    } else if (window.innerWidth < 900) {
      return 4;
    } else {
      return 6;
    }
  };

  const moveCarousel = (num) => {
    setCarPos((prev) => {
      if (prev + num < 0 || prev + num > 20) {
        return prev;
      } else {
        return prev + num;
      }
    });
  };

  return (
    <div className="carousel">
      <div className="name">{name}</div>
      <div className="card-container">
        {data?.results?.slice(carPos, carPos + getCardsToShow()).map((movie) => (
          <div className="card">
            <ProductCard
              key={movie.id}
              item={movie}
              interActive={true}
              setSelectedMovie={setSelectedMovie}
            />
            <div className="rating-container">
              <span>Rating: {movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-move">
        <button
          className="back"
          onClick={() => moveCarousel(-1)}
          disabled={carPos <= 0}
        >
          Back
        </button>
        <button
          className="forward"
          onClick={() => moveCarousel(1)}
          disabled={carPos >= Math.max(0, (data?.results?.length || 0) - 6)}
        >
          Forward
        </button>
      </div>
    </div>
  );
};

export default Carousel;
