import React from "react";

export default function FormSelect({
  required,
  value,
  placeholder,
  onChange,
  options,
  height,
}) {
  const heightValue = height || "2rem";
  const onChangeHandler = onChange || (() => {});
  const selectOptions = [];
  if (options) {
    let index = 0;
    for (let i in options) {
      selectOptions.push(
        <option value={i} key={"option_" + index++}>
          {options[i]}
        </option>
      );
    }
  }

  return (
    <select
      className="custom-form-control"
      onChange={onChangeHandler}
      required={required || false}
      value={value || ""}
      style={{ height: heightValue }}
    >
      <option value="">{placeholder}</option>
      {selectOptions}
    </select>
  );
}
