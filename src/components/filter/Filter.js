import { useState } from "react";

import RangeSlider from "./RangeSlider";
import { ReactComponent as CloseSVG } from "../../assets/close.svg";

const Filter = ({ setPage, setFilters }) => {
  const [ratingMin, setRatingMin] = useState(0);
  const [ratingMax, setRatingMax] = useState(10);
  const clearFilters = () => {
    setRatingMin(0);
    setRatingMax(10);
    setPage(1);
    setFilters("");
  };

  const applyFilters = () => {
    setFilters(
      `${ratingMin ? `&vote_average.gte=${ratingMin}` : ""}${
        ratingMax ? `&vote_average.lte=${ratingMax}` : ""
      }`
    );
    setPage(1);
  };

  return (
    <div className="Filter">
      <div className="container">
        <div className="title--container">
          <h2 className="title">Filter</h2>
          <CloseSVG />
        </div>

        {/* <div className="filter--date__container">
        <div className="filter--date__header">
        <h2>Departure Date</h2>
        </div>
        <div className="filter--date__inputs">
        <input
        type="date"
        onChange={(e) =>
          setStartingDate(
            new Date(e.target.value).toISOString().slice(0, 10)
            )
            }
            />
            <input
            type="date"
            value={endingDate}
            onChange={(e) =>
              setEndingDate(new Date(e.target.value).toISOString().slice(0, 10))
              }
              />
              </div>
              </div> */}

        <RangeSlider
          title={"Rating"}
          maxValue={10}
          min={ratingMin}
          max={ratingMax}
          setMin={setRatingMin}
          setMax={setRatingMax}
        />

        <div className="submit--filter__container">
          <button className="submit--filter__btn clear" onClick={clearFilters}>
            Clear
          </button>
          <button className="submit--filter__btn" onClick={applyFilters}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
