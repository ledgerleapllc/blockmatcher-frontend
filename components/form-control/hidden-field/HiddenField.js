import React from "react";

export default function HiddenField({ type, name }) {
  if (name)
    return <input type={type || "text"} className="hiddenField" name={name} />;
  return <input type={type || "text"} className="hiddenField" />;
}
