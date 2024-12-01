import { useState } from "react";
import { ReactComponent as CloseSVG } from "../assets/close.svg";
import { useReview } from "../hooks/useReview";

const ReviewForm = ({ setFormOpen, movieId }) => {
  const [content, setContent] = useState("");
  const { review } = useReview();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await review(movieId, content, 5);
    setFormOpen(false);
  };

  return (
    <div className="ReviewForm active">
      <div className="form--window__inner">
        <section className="form--window active">
          <div className="contact--form__header">
            <div className="contact--option">
              <span>Write a Review</span>
            </div>
            <CloseSVG onClick={() => setFormOpen(false)} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form--input__container">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="form--footer">
              <button className="send--button">
                <span>Submit</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ReviewForm;
