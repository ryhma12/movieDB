const Showtime = ({ data: {movie = "", time, place, spokenLang = "", subLang1 = "", subLang2 = ""} }) => {
  const date = new Date(time);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  return (
    <li className="Showtime">
      <p className="time">{formattedDate}</p>
      <p className="place">{place}</p>
      <p className="movie">{movie}</p>
      <div className="lang">
        <p >{spokenLang ? `Language: ${spokenLang}` : null}</p>
        <p >{subLang1 ? `Sub 1: ${subLang1}` : null}</p>
        <p >{subLang2 ? `Sub 2: ${subLang2}` : null}</p>
      </div>
    </li>
  );
};

export default Showtime;
