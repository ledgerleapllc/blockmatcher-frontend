import React from "react";
import DotLoader from "react-spinners/DotLoader";

import "./global-canvas.scss";

export default function GlobalCanvas() {
  return (
    <div className="global-canvas">
      <DotLoader color="#DD332A" />
    </div>
  );
}
