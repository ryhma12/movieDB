import { useState, useEffect } from "react";

import ProductSlide from "../components/ProductSlide";
import SingleViewNav from "../components/SingleViewNav";
import ReviewSection from "../components/ReviewSection";
import CastSection from "../components/CastSection";
import ShowtimesSection from "../components/ShowtimesSection";
import closeIcon from "../assets/close.svg";

const SingleView = ({ setSelectedMovie, selectedMovie }) => {
  const [page, setPage] = useState("Reviews");
  const [directors, setDirectors] = useState([]);
  const [cast, setCast] = useState([]);
  const [showtime, setShowtime] = useState([]);

  const handleNav = (page) => {
    setPage(page);
  };

  const handleClose = () => {
    setSelectedMovie(false);
  };

  useEffect(() => {
    const handleSearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();

      const filterDirectors = data.crew.filter(
        (item) => item.known_for_department.toLowerCase() === "directing"
      );
      const uniqueById = [
        ...new Map(filterDirectors.map((item) => [item.id, item])).values(),
      ];

      setCast(data.cast);
      setDirectors(uniqueById);
    };
    const handleSearchShowtimes = async () => {
      const res = await fetch(
          `https://www.finnkino.fi/xml/Schedule?Title=${selectedMovie.original_title}&nrOfDays=31`
        );
      setShowtime(res);
    };
    handleSearchShowtimes();
    handleSearch();
  }, []);

  return (
    <div className="SingleView">
      <div className="inner--container">
        <img
          className="close--icon"
          src={closeIcon}
          alt="smth"
          onClick={handleClose}
        />
        <ProductSlide item={selectedMovie} directors={directors} />
        <SingleViewNav handleNav={handleNav} />
        <div className="review--section__container">
          {page === "Reviews" && <ReviewSection item={selectedMovie} />}
          {page === "Cast" && <CastSection cast={cast} />}
          {page === "Showtimes" && <ShowtimesSection showtime={showtime} item={selectedMovie}/>}
        </div>
      </div>
    </div>
  );
};

export default SingleView;
