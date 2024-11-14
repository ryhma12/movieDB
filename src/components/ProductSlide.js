import ProductCard from "./ProductCard";
import star from "../assets/star.svg";

const ProductSlide = ({ item, directors }) => {
  console.log(directors);
  return (
    <div className="ProductSlide">
      <ProductCard item={item} />
      <div className="text--container">
        <h2>{item.original_title}</h2>
        <p>{item.overview}</p>
        <div className="info--container">
          {directors.length > 0
            ? directors.map((director) => <span>{director.name}</span>)
            : ""}
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
