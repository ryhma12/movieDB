const Favourite = ({ data: {movieName = "", date = ""} }) => {
    const time = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(time);
  
    return (
        <div className="Favourite">
            <p className="movie">{movieName}</p>
            <p className="time">{formattedDate}</p>
        </div>
    );
  };
  
  export default Favourite;
  