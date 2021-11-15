import React from "react";
import DotLoader from "react-spinners/DotLoader";

import "./global-canvas.scss";

export default function GlobalCanvas() {
  return (
    <div className="global-canvas">
      <DotLoader color="#5775F2" />
    </div>
  );
}
