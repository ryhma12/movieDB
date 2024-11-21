import ShowtimesSection from "../components/ShowtimesSection";
import useXmlParse from "../hooks/useXmlParse";
import useFetch from "../hooks/useFetch";
import Showtime from "../components/Showtime";
import Loading from "../components/Loading"

const Showtimes = () => {

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

  return (
    <div className="ShowtimesSection">
      {showtimeIsLoading || showtimeIsParsing ? (
        <Loading />
      ) : (
        <ul>
          {showtimeParseData
            ? (showtimeParseData.map((show) => (
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
            )))
            : <div className="empty">No showtimes found</div>}
        </ul>
      )}
    </div>
  );
};

export default Showtimes;
