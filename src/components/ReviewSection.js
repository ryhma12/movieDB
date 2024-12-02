import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useReview } from "../hooks/useReview";

import Review from "./Review";
import RoundPhoto from "./RoundPhoto";
import ReviewForm from "./ReviewForm";

const ReviewSection = ({ item }) => {
  const [reviews, setReviews] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleSearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${item.id}/reviews?language=en-US&page=1&api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();

      const dbRes = await fetch(
        `http://localhost:3001/user/review?movieId=${item.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!dbRes.ok) throw new Error("Something went wrong", 500);
      const dbData = await dbRes.json();

      setReviews([...data.results, ...dbData.result]);
      console.log(reviews);
    };
    handleSearch();
  }, [item.id]);

  const handleSmth = () => {
    setFormOpen(true);
  };

  return (
    <div className="ReviewSection">
      {user && (
        <div className="write--a__review">
          <RoundPhoto />
          {!formOpen ? (
            <input
              type="text"
              placeholder="Write a review"
              onClick={handleSmth}
            />
          ) : (
            <ReviewForm setFormOpen={setFormOpen} movieId={item.id} />
          )}
        </div>
      )}
      <div className="reviews--container">
        {reviews.length > 0 &&
          reviews.map((review) => <Review key={review.id} review={review} />)}
      </div>
    </div>
  );
};

export default ReviewSection;
