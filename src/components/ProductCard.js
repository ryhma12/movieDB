import photo from "../assets/headshot.png";

const ProductCard = ({ item }) => {
  return (
    <div className="ProductCard">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={`${item.original_title} Poster`}
        className="movie--poster"
      />
    </div>
  );
};

export default ProductCard;
