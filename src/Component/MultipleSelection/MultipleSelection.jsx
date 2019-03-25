import React, { Component } from 'react';

export default class MultipleSelection extends Component {
  onMultipleSelection = e => {
    this.canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(this.canvas.getObjects(), {
      canvas: this.canvas
    });
    this.canvas.setActiveObject(sel);
    this.canvas.renderAll();
  };

  render() {
    return (
      <div>
        <button onClick={this.onMultipleSelection}>Multiple Selection</button>
      </div>
    );
  }
}
