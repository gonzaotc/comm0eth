import React, { useEffect, useState } from "react";

const SpecialSlider = ({ sliderValue, setSliderValue, className }) => {
  useEffect(() => {
  }, [sliderValue]);

  const handleSliderChange = e => {
    setSliderValue(e.target.value);
  };

  return (
    <input
      className={className}
      type="range"
      value={sliderValue}
      onChange={handleSliderChange}
      min="-50"
      max="50"
    />
  );
};

export default SpecialSlider;
