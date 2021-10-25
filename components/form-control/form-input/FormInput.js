import React from "react";
import "./form-input.scss";

export default function FormInput({
  type,
  required,
  value,
  placeholder,
  onChange,
  onInput,
  align,
  name,
  height,
}) {
  const onChangeHandler = onChange || (() => { });
  const onInputHandler = onInput || (() => { });
  let className =
    align && align == "center"
      ? "custom-form-control text-center"
      : "custom-form-control";

  const heightValue = height || "2rem";

  if (name) {
    return (
      <input
        type={type || "text"}
        required={required || false}
        value={value || ""}
        name={name}
        className={className}
        placeholder={placeholder || ""}
        autoComplete="off"
        autoSave="off"
        onChange={onChangeHandler}
        onInput={onInputHandler}
        style={{ height: heightValue }}
      />
    );
  }

  return (
    <input
      type={type || "text"}
      required={required || false}
      value={value || ""}
      className={className}
      placeholder={placeholder || ""}
      autoComplete="off"
      autoSave="off"
      onChange={onChangeHandler}
      style={{ height: heightValue }}
    />
  );
}
