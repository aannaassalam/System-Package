import React, { useState } from "react";
import "./slider.css";

export default function Slider({ items, width, height }) {
  const [current_index, setCurrent_index] = useState(0);

  const next_slide = () => {
    if (current_index < items.length - 1) {
      setCurrent_index((index) => index + 1);
    }
  };

  const prev_slide = () => {
    if (current_index > 0) {
      setCurrent_index((index) => index - 1);
    }
  };

  return (
    <div
      className="slider-container"
      style={{
        width: width + 60,
        height: height,
      }}
    >
      <div className="slider">
        <div
          className="slides-mini"
          style={{
            width: (width + 20) * items.length,
            transform: `translateX(-${(100 / items.length) * current_index}%)`,
          }}
        >
          {items.map((item, idx) => (
            <div className="slides" key={idx}>
              <img src={item} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className="left-button">
        <button className="prev btn" onClick={prev_slide}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>
      <div className="right-button">
        <button className="next btn" onClick={next_slide}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div className="dots">
        {items.map((_, idx) => (
          <div
            className={idx === current_index ? "dot active" : "dot"}
            key={idx}
          ></div>
        ))}
      </div>
    </div>
  );
}
