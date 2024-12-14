import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

const Carousel = ({ name, setSelectedMovie, data=null }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(() => {
    if (window.innerWidth < 720) return 2;
    if (window.innerWidth < 900) return 4;
    return 6;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) return setCardsToShow(2);
      if (window.innerWidth < 900) return setCardsToShow(4);
      setCardsToShow(6);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const moveCarousel = (num) => {
    setCardIndex((prev) => {
      if (prev + num < 0) return 0;
      if (prev + num > data?.results?.length - cardsToShow) return prev;
      return prev + num;
    });
  };

  return (
    <div className="carousel">
      <div className="name">{name}</div>
      <div
        className="card-container"
        style={{
          transition: "transform 0.2s ease-in-out",
          transform: `translateX(${-(100 / cardsToShow) * cardIndex}%)`,
        }}
      >
        {data?.results?.length > 0 ? (
          data?.results?.map((movie) => {
            return (
              <div
                key={movie.id}
                className="card"
                style={{
                  flex: `0 0 ${100 / cardsToShow}%`,
                }}
              >
                <ProductCard
                  item={movie}
                  interActive={true}
                  setSelectedMovie={setSelectedMovie}
                />
                <div className="rating-container">
                  <span>Rating: {movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div>cursed?</div>
        )};
      </div>
      <div className="carousel-move">
        <button
          className="back"
          onClick={() => moveCarousel(-2)}
          disabled={cardIndex <= 0}
        />
        <button
          className="forward"
          onClick={() => moveCarousel(2)}
          disabled={cardIndex >= data?.results?.length - cardsToShow}
        />
      </div>
    </div>
  );
};

export default Carousel;
