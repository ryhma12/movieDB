import Review from "./Review";
import RoundPhoto from "./RoundPhoto";

import photo from "../assets/headshot.png";
const ReviewSection = () => {
  return (
    <div className="ReviewSection">
      <div className="write--a__review">
        <RoundPhoto />
        <input type="text" placeholder="Write a review" />
      </div>
      <div className="reviews--container">
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  );
};

export default ReviewSection;
