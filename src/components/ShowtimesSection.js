import Showtime from "./Showtime";

const ShowtimesSection = () => {
  // xml + parsing here.
  const showData = [
    { id: 1, time: "kello 1", place: "Finnkino oulu" },
    { id: 2, time: "kello 2", place: "Finnkino helsinki" },
  ];

  return (
    <div className="ShowtimesSection">
      <ul>
        {showData.map((show) => (
          <Showtime key={show.id} data={show} />
        ))}
      </ul>
    </div>
  );
};

export default ShowtimesSection;