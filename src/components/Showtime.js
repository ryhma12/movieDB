const Showtime = ({ data: {time, place, spokenLang, subLang1, subLang2} }) => {
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
      <div className="lang">
        <p >{"Language: " + spokenLang}</p>
        <p >{"Sub 1: " + subLang1}</p>
        <p >{"Sub 2: " + subLang2}</p>
      </div>
    </li>
  );
};

export default Showtime;
