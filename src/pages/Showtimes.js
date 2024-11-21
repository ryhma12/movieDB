import ShowtimesSection from "../components/ShowtimesSection";
import useXmlParse from "../hooks/useXmlParse";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import Showtime from "../components/Showtime";

const Showtimes = () => {
  const [shows, setShows] = useState([]);
  const {
    data: showtimeFetchData,
    error: showtimeFetchError,
    isLoading: showtimeIsLoading,
  } = useFetch(
    `https://www.finnkino.fi/xml/Schedule?nrOfDays=31&Theatre=`,
    "finnkino"
  );

  const {
    data: showtimeParseData = [],
    error: showtimeParseError,
    isParsing: showtimeIsParsing,
  } = useXmlParse(showtimeFetchData, "Schedule.Shows.Show");

  useEffect(() => {
    setShows(showtimeParseData);
  }, [showtimeParseData])

  return (
    <div className="shows">
      {(shows.map((show) => (
        <Showtime
          key={show.ID}
          data={{
            time: show.dttmShowStart,
            place: show.Theatre,
            spokenLang: show.SpokenLanguage?.ISOTwoLetterCode || null,
            subLang1: show.SubtitleLanguage1?.ISOTwoLetterCode || null,
            subLang2: show.SubtitleLanguage2?.ISOTwoLetterCode || null,
          }}
        />
      )))}
    </div>
  );
};

export default Showtimes;
