import './DragDrop.css';
import { fabric } from 'fabric';

import React, { Component } from 'react';

export default class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = '';
  }
  state = {
    selectedImg: ''
  };
  onDragStart = event => {
    console.log('L16 onDragStart', event.target);
    this.setState({ selectedImg: event.target });
  };
  drawImage = () => {
    // let img = new Image();
    // let fabricCopy = fabric;
    let canvasCopy = this.canvas;
    // img.onload = function() {
    //   var fabricImg = new fabricCopy.Image(img);
    //   canvasCopy.setBackgroundImage(fabricImg);
    //   canvasCopy.renderAll();
    // };
    // img.src = this.state.selectedImg.src;
    fabric.Image.fromURL(this.state.selectedImg.src, function(img) {
      console.log(img);
      img
        .set({
          left: 0,
          top: 0,
          border: '#000',
          stroke: '#F0F0F0',
          strokeWidth: 2
        })
        .scale(0.2);
      // img.scaleToWidth(canvasCopy.width - 5);
      // img.scaleToHeight(canvasCopy.height - 5);
      canvasCopy.add(img).renderAll();
    });
  };

  drawText = () => {
    let text = new fabric.IText('type text', {
      left: 50,
      top: 20,
      fontFamily: 'helvetica neue',
      fill: '#000',
      stroke: '#fff',
      strokeWidth: 0.1,
      fontSize: 15
    });
    this.canvas.add(text);
  };

  downloadImage = e => {
    e.href = this.canvas.toDataURL({
      format: 'png',
      quality: 0.8
    });
    e.download = 'custom.png';
    console.log(e.target.click());
  };

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.canvasRef.current);
    this.canvas.on('drop', this.drawImage);
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="left">
            <div className="content">
              <img
                draggable
                src="/assets/image/1.jpg"
                alt="alt text1"
                onDragStart={this.onDragStart}
              />
            </div>
            <div className="content">
              <img
                draggable
                src="/assets/image/2.jpg"
                alt="alt text2"
                onDragStart={this.onDragStart}
              />
            </div>
            <div className="content">
              <img
                draggable
                src="/assets/image/3.jpg"
                alt="alt text3"
                onDragStart={this.onDragStart}
              />
            </div>
            <div className="content">
              <img
                draggable
                src="/assets/image/4.jpg"
                alt="alt text4"
                onDragStart={this.onDragStart}
              />
            </div>
            <div className="content">
              <img
                draggable
                src="/assets/image/5.png"
                alt="alt text5"
                onDragStart={this.onDragStart}
              />
            </div>
            <div className="content">
              <img
                draggable
                src="/assets/image/6.jpg"
                alt="alt text6"
                onDragStart={this.onDragStart}
              />
            </div>
            <div className="content">
              <img
                draggable
                src="/assets/image/7.jpg"
                alt="alt text7"
                onDragStart={this.onDragStart}
              />
            </div>
            <div className="content">
              <img
                draggable
                src="/assets/image/8.jpg"
                alt="alt text8"
                onDragStart={this.onDragStart}
              />
            </div>
          </div>

          <div className="right">
            <div>
              <canvas ref={this.canvasRef} className="canvas" />
              <div style={{ marginLeft: '135px' }}>
                <button onClick={this.drawText}>Add Text</button>
                <a onClick={this.downloadImage}>download Image</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
