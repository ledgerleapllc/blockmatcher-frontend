import React from "react";

export default function FormCheck({ id, checked, text, onChange, required }) {
  const onChangeHandler = onChange || (() => {});
  return (
    <div className="custom-form-control custom-form-control-checkbox">
      <input
        type="checkbox"
        id={id || ""}
        checked={checked || false}
        onChange={onChangeHandler}
        required={required || false}
      />
      <label htmlFor={id || ""}>{text}</label>
    </div>
  );
}
