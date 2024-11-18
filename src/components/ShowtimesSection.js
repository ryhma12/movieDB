import Loading from "./Loading";
import Showtime from "./Showtime";

const ShowtimesSection = ({ showtimeData, movie }) => {
  return (
    <div className="ShowtimesSection">
      <Loading item = {showtimeData}>
        <ul>
          {showtimeData.filter((show) => show.Title === movie.original_title)
            .map((show) => (
              <Showtime key={show.ID} data={{
                time: show.dttmShowStart,
                place: show.Theatre,
                spokenLang: show.SpokenLanguage.ISOTwoLetterCode,
                subLang1: show.SubtitleLanguage1.ISOTwoLetterCode,
                subLang2: show.SubtitleLanguage2.ISOTwoLetterCode
              }} />
            ))}
        </ul>
      </Loading>
    </div>
  );
};

export default ShowtimesSection;