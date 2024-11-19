import { useState, useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";

import ProductSlide from "../components/ProductSlide";
import SingleViewNav from "../components/SingleViewNav";
import ReviewSection from "../components/ReviewSection";
import CastSection from "../components/CastSection";
import ShowtimesSection from "../components/ShowtimesSection";
import closeIcon from "../assets/close.svg";
import { XMLParser } from "fast-xml-parser";

const SingleView = ({ setSelectedMovie, selectedMovie }) => {
  const [page, setPage] = useState("Reviews");
  const [directors, setDirectors] = useState([]);
  const [cast, setCast] = useState([]);
  const [showtimeData, setShowtimeData] = useState([]);
  const singleViewRef = useRef(null);
  const { data: creditsData, error: creditsError } = useFetch(
    `https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
  );
  const {
    data: showtimesData,
    error: showtimesError,
    isLoading: showtimesIsLoading,
  } = useFetch(
    `https://www.finnkino.fi/xml/Schedule?OriginalTitle=${selectedMovie.original_title}&nrOfDays=31`,
    "finnkino"
  );

  const handleNav = (page) => {
    setPage(page);
  };

  const handleClose = (e, btnClick) => {
    if (btnClick) setSelectedMovie(false);
    if (singleViewRef.current && !singleViewRef.current.contains(e.target)) {
      setSelectedMovie(false);
    }
  };

  useEffect(() => {
    if (creditsData && !creditsError && creditsData.length !== 0) {
      const filterDirectors = creditsData.crew.filter(
        (item) => item.known_for_department.toLowerCase() === "directing"
      );
      const uniqueById = [
        ...new Map(filterDirectors.map((item) => [item.id, item])).values(),
      ];

      setCast(creditsData.cast);
      setDirectors(uniqueById);
    }
    if (showtimesData && !showtimesError && showtimesData.length !== 0) {
      try {
        const parser = new XMLParser();
        const jObj = parser.parse(showtimesData);
        const shows = jObj.Schedule?.Shows?.Show || [];

        setShowtimeData(shows);
      } catch (error) {
        throw error;
      }
    }

    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [creditsData, creditsError, showtimesData, showtimesError]);

  return (
    <div className="SingleView" ref={singleViewRef}>
      <div className="inner--container">
        <img
          className="close--icon"
          src={closeIcon}
          alt="close--icon"
          onClick={(e) => handleClose(e, true)}
        />
        <ProductSlide item={selectedMovie} directors={directors} />
        <SingleViewNav handleNav={handleNav} />
        <div className="review--section__container">
          {page === "Reviews" && <ReviewSection item={selectedMovie} />}
          {page === "Cast" && <CastSection cast={cast} />}
          {page === "Showtimes" && (
            <ShowtimesSection
              showtimeData={showtimeData}
              movie={selectedMovie}
              isLoading={showtimesIsLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleView;
