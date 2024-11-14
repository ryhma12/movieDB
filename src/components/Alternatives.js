import React from "react";

const Alternatives = ({ data, handleSingleView }) => {
  return (
    <div className="Alternatives">
      <h2>Other similar titles</h2>
      <div className="match--container">
        {data &&
          data.map((el) => (
            <div
              key={el.id}
              className="alternative"
              onClick={() => handleSingleView(el)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                alt={`${el.original_title} Poster`}
                className="movie--poster"
              />
              <div className="movie--text">
                <h2>{el.original_title}</h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Alternatives;
