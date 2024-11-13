import RoundPhoto from "./RoundPhoto";
import star from "../assets/star.svg";

const Review = () => {
  return (
    <div className="Review">
      <div className="rating">
        <img src={star} alt="star" />
        <img src={star} alt="star" />
        <img src={star} alt="star" />
        <img src={star} alt="star" />
        <img src={star} alt="star" />
      </div>
      <div className="review--content__container">
        <div className="review--text">
          <h2>Title</h2>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam culpa
            magnam, nulla maxime sapiente, obcaecati iusto exercitationem nemo
            laudantium hic possimus natus excepturi illo corrupti sit non quae
            esse expedita?
          </span>
        </div>
        <div className="person--container">
          <RoundPhoto />
          <span className="name">Joku</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
