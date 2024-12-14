import useXmlParse from "../hooks/useXmlParse";
import useFetch from "../hooks/useFetch";
import Showtime from "../components/Showtime";
import Loading from "../components/utility/Loading";
import Dropdown from "../components/Dropdown";
import { useState, useRef } from "react";
import chevLeft from "../assets/chevLeft.svg";
import chevRight from "../assets/chevRight.svg";

const Showtimes = ({ setSelectedMovie }) => {
  const [selectedArea, setSelectedArea] = useState([]);
  const [selectedAreaName, setSelectedAreaName] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const showtimesSectionRef = useRef(null);

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
        setPage(1);
      }
    }
  };

  const { data: showtimeFetchData, isLoading: showtimeIsLoading } = useFetch(
    `https://www.finnkino.fi/xml/Schedule?nrOfDays=31&area=${selectedArea}`,
    "finnkino"
  );

  const { data: showtimeParseData, isParsing: showtimeIsParsing } = useXmlParse(
    showtimeFetchData,
    "Schedule.Shows.Show"
  );

  const { data: theatreAreaFetchData, error: theatreAreaFetchError } = useFetch(
    `https://www.finnkino.fi/xml/TheatreAreas/`,
    "finnkino"
  );

  const { data: theatreAreaParseData = [], error: theatreAreaParseError } =
    useXmlParse(theatreAreaFetchData, "TheatreAreas.TheatreArea");

  const paginatedData = showtimeParseData
    ? showtimeParseData.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  const handlePagination = (operation) => {
    if (operation === "-") {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }

    if (showtimesSectionRef.current) {
      showtimesSectionRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="showtimes">
      <div className="filter--container">
        <Dropdown
          className="Dropdown"
          options={theatreAreaParseData.slice(1).map((area) => area.Name)}
          handleSort={handleTheatreArea}
          dropdownName={
            selectedAreaName ? `${selectedAreaName}` : "Filter by area"
          }
        />
      </div>
      <div className="ShowtimesSection" ref={showtimesSectionRef}>
        {showtimeIsLoading || showtimeIsParsing ? (
          <Loading />
        ) : (
          <>
            <ul>
              {paginatedData.length > 0 ? (
                paginatedData.map((show) => (
                  <Showtime
                    key={show.ID}
                    data={{
                      movie: show.OriginalTitle,
                      time: show.dttmShowStart,
                      place: show.Theatre,
                      spokenLang: show.SpokenLanguage?.ISOTwoLetterCode || null,
                      subLang1:
                        show.SubtitleLanguage1?.ISOTwoLetterCode || null,
                      subLang2:
                        show.SubtitleLanguage2?.ISOTwoLetterCode || null,
                    }}
                    setSelectedMovie={setSelectedMovie}
                  />
                ))
              ) : (
                <div className="empty">No showtimes found</div>
              )}
            </ul>
            {showtimeParseData && showtimeParseData.length > itemsPerPage && (
              <div className="pagination">
                <div className="btn">
                  <img
                    src={chevLeft}
                    alt="chevron"
                    onClick={() => handlePagination("-")}
                  />
                </div>
                <span>
                  {page} / {Math.ceil(showtimeParseData.length / itemsPerPage)}
                </span>
                <div className="btn">
                  <img
                    src={chevRight}
                    alt="chevron"
                    onClick={() => handlePagination("+")}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Showtimes;
