import React from "react";

export default function Input(props) {
  let { id, type, value, onChangeFontSize, displayText } = props;
  if (!(id && type && onChangeFontSize && displayText)) {
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
      <input id={id} type={type} value={value} onChange={onChangeFontSize} />
    </div>
  );
}
