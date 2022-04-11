import React, { useEffect, useState } from "react";
import "./SpecialSlider.scss";

const SpecialSlider = ({ sliderValue, setSliderValue }) => {
  useEffect(() => {
  }, [sliderValue]);

  const handleSliderChange = e => {
    setSliderValue(e.target.value);
  };

  return (
    <input
      className="specialSlider"
      type="range"
      value={sliderValue}
      onChange={handleSliderChange}
      min="-50"
      max="50"
    />
  );
};

export default SpecialSlider;
