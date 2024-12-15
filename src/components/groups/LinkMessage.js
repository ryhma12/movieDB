import useFetch from "../../hooks/useFetch";

const LinkMessage = ({ link, setSelectedMovie }) => {
  const { data, error, isLoading } = useFetch(link);

  console.log(data.results);

  return (
    <div className="LinkMessage">
      {data && data.results && data.results.length > 0 && !error && (
        <div
          className="container"
          onClick={() => setSelectedMovie(data.results[0])}
        >
          <img
            src={
              `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}` ||
              ""
            }
            className="poster"
            alt="poster"
          />
          <div className="text">
            <span>{data.results[0].original_title}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkMessage;
