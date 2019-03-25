import React, { Component } from 'react';

export default class Forward extends Component {
  selectedObjectForward = e => {
    if (!this.canvas.getActiveObject()) return '';
    this.canvas.bringForward(this.canvas.getActiveObject());
    this.canvas.renderAll();
  };
  render() {
    return (
      <div>
        <button onClick={this.selectedObjectForward}>forward</button>
      </div>
    );
  }
}
