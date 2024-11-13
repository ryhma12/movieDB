const Showtime = ({ data: {time, place} }) => {
  return (
    <li className="Showtime">
      <p className="time">{time}</p>
      <p className="place">{place}</p>
    </li>
  );
};

export default Showtime;
