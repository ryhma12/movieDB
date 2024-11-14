import photo from "../assets/headshot.png";

const RoundPhoto = ({ path }) => {
  return (
    <div className="RoundPhoto">
      <img
        src={path ? `https://image.tmdb.org/t/p/w185${path}` : photo}
        alt="woman"
      />
    </div>
  );
};

export default RoundPhoto;
