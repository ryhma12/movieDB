const ProductCard = ({ item, interActive, setSelectedMovie }) => {
  const handleNav = () => {
    setSelectedMovie(item);
  };

  return (
    <div
      className={interActive ? "ProductCard interactive" : "ProductCard"}
      onClick={interActive ? handleNav : ""}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={`${item.original_title} Poster`}
        className="movie--poster"
      />
      {/* {text && (
        <div className="product--card__text">
          <span>{text}</span>
        </div>
      )} */}
    </div>
  );
};

export default ProductCard;
