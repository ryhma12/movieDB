import useFetch from "../hooks/useFetch";
import Loading from "./utility/Loading";
import { ReactComponent as Star } from "../assets/star.svg";
import fallBackPic from "../assets/fallback.png";

const Showtime = ({
  data: {
    movie = "",
    time,
    place,
    spokenLang = "",
    subLang1 = "",
    subLang2 = "",
  },
  setSelectedMovie,
}) => {
  const date = new Date(time);

  // Format the date (e.g., "December 14")
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);

  // Format the time in 24-hour format (e.g., "18:30")
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  const { data, error, isLoading } = useFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.REACT_APP_API_KEY
    }&query=${movie.replace(" ", "+")}`
  );

  return (
    <li className="Showtime">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {data.results && data.results.length > 0 && (
            <img
              src={
                data.results[0].poster_path
                  ? `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
                  : fallBackPic
              }
              alt={`${data.results[0].original_title || "Movie"} Poster`}
              className="movie--poster"
              onClick={() => setSelectedMovie(data.results[0])}
            />
          )}
          <div className="movie--texts">
            <div className="header">
              <div className="title--container">
                <p className="place">{place}</p>
                <p className="movie">{movie}</p>
              </div>
              <div className="lang">
                <p>{spokenLang && `Language: ${spokenLang}`}</p>
                <p>{subLang1 && `Sub 1: ${subLang1}`}</p>
                <p>{subLang2 && `Sub 2: ${subLang2}`}</p>
              </div>
            </div>
            <div className="movie--details__container">
              {data.results && data.results.length > 0 && (
                <>
                  <span className="overview">
                    {data.results[0].overview || "No overview available."}
                  </span>
                  <div className="rating">
                    {data.results[0].vote_average ? (
                      <>
                        <span>
                          Rating: {data.results[0].vote_average.toFixed(1)}
                        </span>
                        {data.results[0].vote_average && <Star />}
                      </>
                    ) : (
                      <span>Unrated</span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="time--container">
            <p className="time">{formattedTime}</p>
            <p className="date">{formattedDate}</p>
          </div>
        </>
      )}
    </li>
  );
};

export default Showtime;
