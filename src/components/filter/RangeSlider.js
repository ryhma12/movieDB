import { useEffect } from "react";

const RangeSlider = ({ title, maxValue, min, max, setMin, setMax }) => {
  useEffect(() => {
    const progress = document.querySelectorAll(".progress");
    if (title === "Rating") {
      progress[0].style.left = (min / maxValue) * 100 + "%";
      progress[0].style.right = 100 - (max / maxValue) * 100 + "%";
    }
  }, [min, max, maxValue, title]);

  const handleSlider = (e) => {
    const target = e.target.closest(".RangeSlider");
    const fields = target.querySelectorAll(".field--input");

    const sliderGap = 0.1;
    let value = parseInt(e.target.value);

    if (max - value > sliderGap && e.target.classList.contains("range--min")) {
      setMin(value);
      fields[0].value = value;
    }
    if (value - min > sliderGap && e.target.classList.contains("range--max")) {
      setMax(value);
      fields[1].value = value;
    }
  };

  const handleFieldInput = (e) => {
    if (!e.target.value) return;
    const inputMax = e.target.classList.contains("input--max");
    const inputMin = e.target.classList.contains("input--min");

    const target = e.target.closest(".RangeSlider");
    const fields = target.querySelectorAll(".field--input");
    let value = parseInt(e.target.value);

    if (inputMin && value < max) {
      setMin(value);
    }
    if (inputMin && value > max) {
      setMin(max);
      fields[0].value = max;
    }

    if (inputMax && value > min) {
      setMax(value);
    }

    if (inputMax && value > maxValue) {
      setMax(maxValue);
      fields[1].value = maxValue;
    }
  };

  return (
    <div className="RangeSlider">
      <h2>{title}</h2>
      <div className="fields--container">
        <input
          className="input--min field--input"
          type="number"
          onInput={(e) => handleFieldInput(e)}
          value={min}
        />
        <span className="separator"></span>
        <input
          className="input--max field--input"
          type="number"
          onInput={(e) => handleFieldInput(e)}
          value={max}
        />
      </div>
      <div className="slider--container">
        <div className="slider">
          <div className="progress"></div>
        </div>

        <input
          type="range"
          className="range--min"
          min={0}
          max={maxValue}
          value={min}
          step={1}
          onInput={handleSlider}
        />
        <input
          type="range"
          className="range--max"
          min={0}
          max={maxValue}
          value={max}
          step={1}
          onInput={handleSlider}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
