import React from "react";
import "./error.css";

const multipleShadow = (length) => {
  let value = "2px -1px 0 #000";
  for (let i = 2; i <= length; i++) {
    const ho = i * 2;
    const vo = -(ho / 2);
    const col = `hsl(0deg, 0%, ${i * 2}%)`;
    value += `, ${ho}px ${vo}px 0 ${col}`;
  }
  return value;
};

const PageNotFound = () => {
  return (
    <div className="container">
      <div className="number" style={{ textShadow: multipleShadow(8) }}>
        404
      </div>
      <div className="text">
        <span>Ooops...</span>
        <br />
        page not found
      </div>
    </div>
  );
};

export default PageNotFound;
