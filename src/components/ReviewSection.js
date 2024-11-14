import { useEffect, useState } from "react";

import Review from "./Review";
import RoundPhoto from "./RoundPhoto";

const ReviewSection = ({ item }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${item.id}/reviews?language=en-US&page=1&api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();

      setReviews(data.results);
    };
    handleSearch();
  }, []);

  return (
    <div className="ReviewSection">
      <div className="write--a__review">
        <RoundPhoto />
        <input type="text" placeholder="Write a review" />
      </div>
      <div className="reviews--container">
        {reviews.length > 0 &&
          reviews.map((review) => <Review key={review.id} review={review} />)}
      </div>
    </div>
  );
};

export default ReviewSection;
