import React from "react";
import "./hidden-field.scss";

export default function HiddenField({ type, name }) {
  if (name)
    return <input type={type || "text"} className="hiddenField" name={name} />;
  return <input type={type || "text"} className="hiddenField" />;
}
