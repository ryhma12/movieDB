const Showtime = ({ data: {time, place} }) => {
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
    </li>
  );
};

export default Showtime;
