import { useState } from "react";

import ProductSlide from "../components/ProductSlide";
import SingleViewNav from "../components/SingleViewNav";
import ReviewSection from "../components/ReviewSection";
import CastSection from "../components/CastSection";
import ShowtimesSection from "../components/ShowtimesSection";
import closeIcon from "../assets/close.svg";

const SingleView = ({ setSingleView, singleView }) => {
  const [page, setPage] = useState("Reviews");

  const handleNav = (page) => {
    setPage(page);
  };

  const handleClose = () => {
    setSingleView(false);
  };

  return (
    <div className="SingleView">
      <div className="inner--container">
        <img
          className="close--icon"
          src={closeIcon}
          alt="smth"
          onClick={handleClose}
        />
        <ProductSlide item={singleView} />
        <SingleViewNav handleNav={handleNav} />
        <div className="review--section__container">
          {page === "Reviews" && <ReviewSection item={singleView}/>}
          {page === "Cast" && <CastSection />}
          {page === "Showtimes" && <ShowtimesSection />}
        </div>
      </div>
    </div>
  );
};

export default SingleView;
