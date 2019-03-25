import React, { Component } from 'react';

export default class Backward extends Component {
  selectedObjectBackward = e => {
    if (!this.canvas.getActiveObject()) return '';
    this.canvas.sendToBack(this.canvas.getActiveObject());
    this.canvas.renderAll();
  };

  render() {
    return (
      <div>
        <button onClick={this.selectedObjectBackward}>Backward</button>
      </div>
    );
  }
}
