import RoundPhoto from "./RoundPhoto";
import star from "../assets/star.svg";

const Review = ({ review }) => {
  const date = new Date(review.created_at);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
  return (
    <div className="Review">
      <div className="rating">
        {review.author_details.rating ? (
          <>
            <span>{review.author_details.rating} / 10</span>
            <img src={star} alt="star" />
          </>
        ) : (
          "Unrated"
        )}
      </div>
      <div className="review--content__container">
        <div className="review--heading">
          <div className="person--container">
            <RoundPhoto path={review.author_details.avatar_path} />
            <span className="name">{review.author}</span>
          </div>
          <div className="created--at__container">
            <span>{formattedDate}</span>
          </div>
        </div>
        <div className="review--text">
          <span>{review.content}</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
