import Loading from "./Loading";
import Showtime from "./Showtime";

const ShowtimesSection = ({ showtimeData, movie, isLoading }) => {
  console.log(isLoading);
  return (
    <div className="ShowtimesSection">
      {/* täs esim sit voijaa ottaa se isLoading */}
      {/* ja renderöidä {isLoading ? <div spinner></div> : <ul>} eli loading komponenttii ei tarvi enää muuta ku tuon yhen eikä tarvi propsejakaan */}
      {/* on myös parempi käyttää sitä ku se on aina tosi että onko ladannu riippumatta siitä mikä tulos on */}
      {/* pikasesti vilkasten nii tää nykynen jos ei ookkaa tuloksia ja arrayn length on totuudessa 0 nii spinneri jää vaan pyörimää? */}
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {showtimeData
            .filter((show) => show.Title === movie.original_title)
            .map((show) => (
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
            ))}
        </ul>
      )}
    </div>
  );
};

export default ShowtimesSection;
