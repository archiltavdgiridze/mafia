import React, { useState } from "react";
import "./rangeslider.scss";

const RangeSlider = ({ min, max, step }) => {
  const [sliderValue, setSliderValue] = useState(min);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const renderValueLabels = (min, max, step) => {
    const labels = [];
    for (let i = min; i <= max; i += step) {
      labels.push(
        <span key={i} className="slider_label">
          {i}
        </span>
      );
    }
    return labels;
  };

  return (
    <div className="slider_container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleSliderChange}
        className="range_slider"
      />
      <div className="value_labels">{renderValueLabels(min, max, step)}</div>
    </div>
  );
};

export default RangeSlider;
