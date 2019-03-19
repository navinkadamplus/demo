import React from "react";

export default function TextAlign(props) {
  let { selectedTextAlign, onChangeTextAlign, aligns } = props;
  if (!(onChangeTextAlign && aligns)) {
    alert("fill all details--> onChangeTextAlign,aligns ");

    return <div>fill all details--> onChangeTextAlign,aligns </div>;
  }
  return (
    <div>
      <label htmlFor="textAlign">Text Align : </label>
      <select
        id="textAlign"
        name="Text-Align"
        value={selectedTextAlign}
        onChange={onChangeTextAlign}
      >
        {aligns.map((fontName, ind) => (
          <option key={`${ind}`} value={`${fontName}`}>{`${fontName}`}</option>
        ))}
      </select>
    </div>
  );
}
