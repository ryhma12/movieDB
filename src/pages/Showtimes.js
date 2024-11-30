import useXmlParse from "../hooks/useXmlParse";
import useFetch from "../hooks/useFetch";
import Showtime from "../components/Showtime";
import Loading from "../components/utility/Loading";
import Dropdown from "../components/Dropdown";
import { useState } from "react";

const Showtimes = () => {
  const [selectedArea, setSelectedArea] = useState([]);
  const [selectedAreaName, setSelectedAreaName] = useState("");

  const handleTheatreArea = (index) => {
    if (theatreAreaFetchData &&
      !theatreAreaFetchError &&
      theatreAreaParseData &&
      !theatreAreaParseError) {
      const currentArea = theatreAreaParseData[index + 1];
      if (currentArea) {
        setSelectedArea(currentArea.ID);
        setSelectedAreaName(currentArea.Name);
      };
    };
  };

  const {
    data: showtimeFetchData,
    isLoading: showtimeIsLoading,
  } = useFetch(
    `https://www.finnkino.fi/xml/Schedule?nrOfDays=31&area=${selectedArea}`,
    "finnkino"
  );

  const {
    data: showtimeParseData,
    isParsing: showtimeIsParsing,
  } = useXmlParse(showtimeFetchData, "Schedule.Shows.Show");

  const {
    data: theatreAreaFetchData,
    error: theatreAreaFetchError,
  } = useFetch(
    `https://www.finnkino.fi/xml/TheatreAreas/`,
    "finnkino"
  );

  const {
    data: theatreAreaParseData = [],
    error: theatreAreaParseError,
  } = useXmlParse(theatreAreaFetchData, "TheatreAreas.TheatreArea");

  return (
    <div className="showtimes">
      <Dropdown
        className="Dropdown"
        options={theatreAreaParseData.slice(1).map((area) => (area.Name))}
        handleSort={handleTheatreArea}
        dropdownName={selectedAreaName ? `${selectedAreaName}` : "Filter by area"}
      />
      <div className="ShowtimesSection">
        {showtimeIsLoading || showtimeIsParsing ? (
          <Loading />
        ) : (
          <ul>
            {showtimeParseData ? (
              showtimeParseData.map((show) => (
                <Showtime
                  key={show.ID}
                  data={{
                    movie: show.OriginalTitle,
                    time: show.dttmShowStart,
                    place: show.Theatre,
                    spokenLang: show.SpokenLanguage?.ISOTwoLetterCode || null,
                    subLang1: show.SubtitleLanguage1?.ISOTwoLetterCode || null,
                    subLang2: show.SubtitleLanguage2?.ISOTwoLetterCode || null,
                  }}
                />
              ))
            ) : (
              <div className="empty">No showtimes found</div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Showtimes;
