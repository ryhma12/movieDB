import ProductCard from "./ProductCard";
import star from "../assets/star.svg";

const ProductSlide = ({ item }) => {
  return (
    <div className="ProductSlide">
      <ProductCard item={item} />
      <div className="text--container">
        <h2>{item.original_title}</h2>
        <p>{item.overview}</p>
        <div className="info--container">
          <span>Matti Meikäläinen</span>
          <span>En ees tiiä</span>
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
