import React from "react";

export default function Input(props) {
  let {
    id,
    type,
    value,
    onChange,
    keypress,
    displayText,
    rangeMin,
    rangeMax,
    rangeStep
  } = props;
  if (!(id && type && (onChange || keypress) && displayText)) {
    alert("fill all details--> id, type, value, onChangeFontSize, displayText");
    return (
      <div>
        fill all details--> id, type, value, onChangeFontSize, displayText
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id}>{displayText} : </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onKeyPress={keypress}
        // style={{ width: "40px" }}
        min={rangeMin ? rangeMin : ""}
        max={rangeMax ? rangeMax : ""}
        step={rangeStep ? rangeStep : ""}
      />
    </div>
  );
}
