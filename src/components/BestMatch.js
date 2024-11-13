const BestMatch = ({ item, maxWidth, handleSingleView }) => {
  return (
    <div
      className={maxWidth ? "BestMatch maxWidth" : "BestMatch"}
      onClick={() => handleSingleView(item)}
    >
      <h2>Best Match:</h2>
      <div className="match--container">
        {item && (
          <div className="match">
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={`${item.original_title} Poster`}
              className="movie--poster"
            />

            <div className="movie--text">
              <h2>{item.original_title}</h2>
              <span>{item.overview}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestMatch;
