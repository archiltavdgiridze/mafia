import React, { useState, useEffect } from "react";
import "./rangeslider.scss";

const RangeSlider = ({ min, max, step, name }) => {
  const [sliderValue, setSliderValue] = useState(min);

  // Store the default value when the component initializes
  useEffect(() => {
    sessionStorage.setItem(name, min);
  }, [min, name]);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);

    // Store the value in sessionStorage with a unique name
    sessionStorage.setItem(name, newValue);
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
