import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import useFetch from "../hooks/useFetch";
import useXmlParse from "../hooks/useXmlParse";
import ProductSlide from "../components/ProductSlide";
import SingleViewNav from "../components/navigation/SingleViewNav";
import ReviewSection from "../components/ReviewSection";
import CastSection from "../components/CastSection";
import ShowtimesSection from "../components/ShowtimesSection";
import closeIcon from "../assets/close.svg";
import Dropdown from "../components/Dropdown";

const SingleView = ({ setSelectedMovie, selectedMovie }) => {
  const [page, setPage] = useState("Reviews");
  const [directors, setDirectors] = useState([]);
  const [cast, setCast] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const singleViewRef = useRef(null);
  const [theatreArea, setTheatreArea] = useState(1046);

  const handleTheatreArea = (index) => {
    switch (index) {
      case 0:
        setTheatreArea(1022);
        break;
      case 1:
        setTheatreArea(1047);
        break;
      case 2:
        setTheatreArea(1035);
        break;
      case 3:
        setTheatreArea(1034);
        break;
      case 4:
        setTheatreArea(1021);
        break;
      case 5:
        setTheatreArea(1019);
        break;
      default:
        setTheatreArea(1046);
        break;
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
    `https://www.finnkino.fi/xml/Schedule?OriginalTitle=${selectedMovie.original_title}&nrOfDays=31&area=${theatreArea}`,
    "finnkino"
  );

  const {
    data: showtimeParseData = [],
    error: showtimeParseError,
    isParsing: showtimeIsParsing,
  } = useXmlParse(showtimeFetchData, "Schedule.Shows.Show");

  const {
    data: theatreAreaFetchData,
    error: theatreAreaFetchError,
    isLoading: theatreAreaIsLoading,
  } = useFetch(
    `https://www.finnkino.fi/xml/TheatreAreas/`,
    "finnkino"
  );

  const {
    data: theatreAreaParseData = [],
    error: theatreAreaParseError,
    isParsing: theatreAreaIsParsing,
  } = useXmlParse(theatreAreaFetchData, "TheatreAreas.TheatreArea");

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

  // const areaFilter = useMemo(() => theatreAreaParseData.filter(
  //   (area) => area. === 
  // ), [theatreAreaParseData]);

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
                options={""}
                handleSort={handleTheatreArea}
                dropdownName={"Filter by area"}
              />
              <ShowtimesSection
                showtimes={showtimes}
                isLoading={showtimeIsLoading}
                isParsing={showtimeIsParsing}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleView;
