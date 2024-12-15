import { useState, useEffect, useRef, useCallback } from "react";
import useFetch from "../hooks/useFetch";
import useXmlParse from "../hooks/useXmlParse";
import ProductSlide from "../components/ProductSlide";
import SingleViewNav from "../components/navigation/SingleViewNav";
import ReviewSection from "../components/ReviewSection";
import CastSection from "../components/CastSection";
import ShowtimesSection from "../components/ShowtimesSection";
import closeIcon from "../assets/close.svg";
import Dropdown from "../components/Dropdown";
import ShareInGroup from "../components/groups/ShareInGroup";

const SingleView = ({ setSelectedMovie, selectedMovie }) => {
  const [page, setPage] = useState("Reviews");
  const [directors, setDirectors] = useState([]);
  const [cast, setCast] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const singleViewRef = useRef(null);
  const [selectedArea, setSelectedArea] = useState([]);
  const [selectedAreaName, setSelectedAreaName] = useState("");

  const handleTheatreArea = (index) => {
    if (
      theatreAreaFetchData &&
      !theatreAreaFetchError &&
      theatreAreaParseData &&
      !theatreAreaParseError
    ) {
      const currentArea = theatreAreaParseData[index + 1];
      if (currentArea) {
        setSelectedArea(currentArea.ID);
        setSelectedAreaName(currentArea.Name);
      }
    }
  };

  const { data: creditsData, error: creditsError } = useFetch(
    `https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
  );

  const {
    data: showtimeFetchData,
    error: showtimeFetchError,
    isLoading: showtimeIsLoading,
  } = useFetch(
    `https://www.finnkino.fi/xml/Schedule?OriginalTitle=${selectedMovie.original_title}&nrOfDays=31&area=${selectedArea}`,
    "finnkino"
  );

  const {
    data: showtimeParseData = [],
    error: showtimeParseError,
    isParsing: showtimeIsParsing,
  } = useXmlParse(showtimeFetchData, "Schedule.Shows.Show");

  const { data: theatreAreaFetchData, error: theatreAreaFetchError } = useFetch(
    `https://www.finnkino.fi/xml/TheatreAreas/`,
    "finnkino"
  );

  const { data: theatreAreaParseData = [], error: theatreAreaParseError } =
    useXmlParse(theatreAreaFetchData, "TheatreAreas.TheatreArea");

  const handleNav = (page) => {
    setPage(page);
  };

  const handleClose = useCallback(
    (e, btnClick) => {
      if (btnClick) setSelectedMovie(false);
      if (singleViewRef.current && !singleViewRef.current.contains(e.target)) {
        setSelectedMovie(false);
      }
    },
    [setSelectedMovie]
  );

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

    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [creditsData, creditsError, handleClose]);

  useEffect(() => {
    if (
      showtimeFetchData &&
      !showtimeFetchError &&
      showtimeParseData &&
      !showtimeParseError
    ) {
      const filter = showtimeParseData.filter(
        (show) => show.OriginalTitle === selectedMovie.original_title
      );
      setShowtimes(filter);
    }
  }, [
    showtimeFetchData,
    showtimeFetchError,
    showtimeParseData,
    showtimeParseError,
    selectedMovie.original_title,
  ]);

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
            <div className="Showtimes">
              <Dropdown
                className="Dropdown"
                options={theatreAreaParseData.slice(1).map((area) => area.Name)}
                handleSort={handleTheatreArea}
                dropdownName={
                  selectedAreaName ? `${selectedAreaName}` : "Filter by area"
                }
              />
              <ShowtimesSection
                showtimes={showtimes}
                isLoading={showtimeIsLoading}
                isParsing={showtimeIsParsing}
              />
            </div>
          )}
          {page === "Share" && <ShareInGroup selectedMovie={selectedMovie} />}
        </div>
      </div>
    </div>
  );
};

export default SingleView;
