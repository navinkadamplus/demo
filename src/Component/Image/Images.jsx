import React from "react";

export default function Images(props) {
  let { src, onDragStart } = props;
  return (
    <div className="content">
      <img
        draggable
        src={`/assets/image/${src}`}
        alt={`alt ${src}`}
        onDragStart={onDragStart}
      />
    </div>
  );
}
