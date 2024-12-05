import { useEffect, useState } from "react";
import useUserFavourites from "../hooks/useUserFavourites";
import ProductCard from "./ProductCard";
import star from "../assets/star.svg";
import { useUser } from "../hooks/useUser";

const ProductSlide = ({ item, directors }) => {
  const [visibleDirectors, setVisibleDirectors] = useState([]);
  const [overflowingDirectors, setOverflowingDirectors] = useState(false);
  const { user } = useUser();
  const { addUserFavourite } = useUserFavourites();

  useEffect(() => {
    if (directors.length > 4) {
      setVisibleDirectors(directors.slice(0, 5));
      setOverflowingDirectors(directors.slice(5).length);
    } else {
      setVisibleDirectors(directors);
      setOverflowingDirectors(false);
    }
    return () => {};
  }, [directors]);

  const favouritePress = (e) => {
    e.preventDefault();
    addUserFavourite(item.id, item.original_title);
  };

  return (
    <div className="ProductSlide">
      <ProductCard item={item} interActive={false} />
      <div className="text--container">
        <div>
          <h2>{item.original_title}</h2>
          {user && <button
            onClick={(e) => favouritePress(e)}
          >
            liek
          </button>}
        </div>
        <p>{item.overview}</p>
        <div className="info--container">
          {visibleDirectors.length > 0
            ? visibleDirectors.map((director) => (
                <span key={director.id}>{director.name}</span>
              ))
            : ""}
          {overflowingDirectors && (
            <span>And {overflowingDirectors} more...</span>
          )}
        </div>
        <div className="average--rating__container">
          <span>Rating: {item.vote_average.toFixed(1)} / 10</span>
          <img src={star} alt="star" />
        </div>
      </div>
    </div>
  );
};

export default ProductSlide;
