import React, { Component } from 'react';
import { fabric } from 'fabric';

export default class DrawText extends Component {
  drawText = () => {
    let text = new fabric.Textbox('type text', {
      left: 50,
      top: 20,
      width: 200,
      height: 200,
      fontFamily: 'helvetica neue',
      fill: '#000',
      stroke: '#fff',
      fontSize: 30,
      strokeWidth: 0.1
    });
    this.canvas.add(text);

    // this.customsControl();
  };

  render() {
    return (
      <div>
        <button onClick={this.drawText}>Add Text</button>
      </div>
    );
  }
}
