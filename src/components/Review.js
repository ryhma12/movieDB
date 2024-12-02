import { useState } from "react";

import RoundPhoto from "./RoundPhoto";
import star from "../assets/star.svg";

const Review = ({ review }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const rating = review.author_details?.rating || review.stars || "Unrated";
  const author = review.author || review.userId;
  const imgPath = review.author_details?.avatar_path || "";

  const date = new Date(review.created_at || review.date);
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
        {rating !== "Unrated" ? (
          <>
            <span>{rating} / 10</span>
            <img src={star} alt="star" />
          </>
        ) : (
          "Unrated"
        )}
      </div>
      <div className="review--content__container">
        <div className="review--heading">
          <div className="person--container">
            <RoundPhoto path={imgPath} />
            <span className="name">{author}</span>
          </div>
          <div className="created--at__container">
            <span>{formattedDate}</span>
          </div>
        </div>
        <div className="review--text">
          {review.content.length > 300 && isCollapsed ? (
            <span>
              {review.content.slice(0, 300)}
              <b onClick={() => setIsCollapsed(!isCollapsed)}>Read more...</b>
            </span>
          ) : (
            <span>
              {review.content}{" "}
              {review.content.length > 300 && (
                <b onClick={() => setIsCollapsed(!isCollapsed)}>See less...</b>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
