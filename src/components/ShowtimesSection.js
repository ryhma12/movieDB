import Loading from "./Loading";
import Showtime from "./Showtime";

const ShowtimesSection = ({ showtimes, isLoading, isParsing }) => {
  return (
    <div className="ShowtimesSection">
      {isLoading || isParsing ? (
        <Loading />
      ) : (
        <ul>
          {showtimes.length > 0
            ? (showtimes.map((show) => (
              <Showtime
                key={show.ID}
                data={{
                  time: show.dttmShowStart,
                  place: show.Theatre,
                  spokenLang: show.SpokenLanguage.ISOTwoLetterCode,
                  subLang1: show.SubtitleLanguage1.ISOTwoLetterCode,
                  subLang2: show.SubtitleLanguage2.ISOTwoLetterCode,
                }}
              />
            )))
            : (<li className="empty">No showtimes found</li>
            )}
        </ul>
      )}
    </div>
  );
};

export default ShowtimesSection;
