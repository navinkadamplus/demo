import React, { Component } from 'react';

export default class Group extends Component {
  onGroup = e => {
    if (
      !this.canvas.getActiveObject() ||
      this.canvas.getActiveObject().type !== 'activeSelection'
    ) {
      return '';
    }
    this.canvas.getActiveObject().toGroup();
    this.canvas.renderAll();
  };

  render() {
    return (
      <div>
        <button onClick={this.onGroup}>Group</button>
      </div>
    );
  }
}
