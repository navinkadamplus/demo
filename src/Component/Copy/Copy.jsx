import React, { Component } from 'react';

export default class Copy extends Component {
  onCopy = e => {
    if (this.canvas.getActiveObject() === undefined) {
      return '';
    }
    this.canvas.getActiveObject().clone(cloned => {
      this.setState({ cloneObject: cloned });
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.onCopy}>Copy</button>
      </div>
    );
  }
}
