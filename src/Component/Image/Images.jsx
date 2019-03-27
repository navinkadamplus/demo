import React, { memo } from "react";

export default memo(function Images(props) {
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
});
