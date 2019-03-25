import React, { Component } from 'react';

export default class Ungroup extends Component {
  onUnGroup = e => {
    if (!this.canvas.getActiveObject()) {
      return;
    }
    if (this.canvas.getActiveObject().type !== 'group') {
      return;
    }
    this.canvas.getActiveObject().toActiveSelection();
    this.canvas.renderAll();
  };

  render() {
    return (
      <div>
        <button onClick={this.onUnGroup}>UnGroup</button>
      </div>
    );
  }
}
