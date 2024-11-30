const Favourite = ({ data: {movieName = "", date = ""} }) => {
    /*const date = new Date(time);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);*/
  
    return (
        <div className="Favourite">
            <p className="movie">{movieName}</p>
            <p className="time">{date}</p>
        </div>
    );
  };
  
  export default Favourite;
  