const Showtime = ({ data: {time, place, spokenLang = "N/A", subLang1 = "N/A", subLang2 = "N/A"} }) => {
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
        <p >{`Language: ${spokenLang}`}</p>
        <p >{`Sub 1: ${subLang1}`}</p>
        <p >{`Sub 2: ${subLang2}`}</p>
      </div>
    </li>
  );
};

export default Showtime;
